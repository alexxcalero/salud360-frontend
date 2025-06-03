import LocalesForms from "@/components/admin/locales/LocalesForms";
import useLocalForm from "@/hooks/useLocalForm";
import axios from "axios";
import { useNavigate } from "react-router";

function CrearLocal(){
    const navigate = useNavigate();

    const {
        nombre, setNombre,
        telefono, setTelefono,
        descripcion, setDescripcion,
        direccion, setDireccion,
        tipo, setTipo,
        servicios, setServicios,
        setLocalAPI
    } = useLocalForm();

    const handleCrearLocal = async() => {
        console.log("El contenido de los servicios a enviar es:", servicios)
        try{
            const response = await axios.post("http://localhost:8080/api/locales", 
                {
                    nombre,
                    descripcion,
                    direccion,
                    telefono,
                    tipoServicio: tipo,
                    //servicio: servicios.map(id => ({idServicio: id})),
                    servicio: { idServicio: servicios },
                },
                {  
                    auth: {
                        username: "admin",
                        password: "admin123"
                    },
                    headers: {
                        "Content-Type": "application/json",
                      },
                }
            );

            console.log("A punto de navegar a successCrear")
            navigate("/admin/locales/successCrear", {
                state: { created: true }
            });
        }
        catch(err){
            console.error("Error al crear local:", err);
            alert("Hubo un error al crear el local");
        }
    }

    return(
        <div className="w-full px-10 py-8 text-left">
            <LocalesForms
                title= "Registrar Local"
                subtitle="Rellene los siguientes campos para completar el registro del local."
                nombre={nombre}
                setNombre={setNombre}
                telefono={telefono}
                setTelefono={setTelefono}
                descripcion={descripcion}
                setDescripcion={setDescripcion}
                direccion={direccion}
                setDireccion={setDireccion}
                tipo={tipo}
                setTipo={setTipo}
                servicios={servicios}
                setServicios={setServicios}
                readOnly={false}
                onSubmit={handleCrearLocal}
                buttonText="Crear Local"
            />
        </div>
    )

}

export default CrearLocal;