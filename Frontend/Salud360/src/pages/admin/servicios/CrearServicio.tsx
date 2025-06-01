import ServiciosForm from "@/components/admin/servicios/ServiciosForm";
import useServicioForms from "@/hooks/useServicioForms";
import axios from "axios";
import { useNavigate } from "react-router";

function CrearServicio(){

    const navigate = useNavigate();

    const {
        nombre, setNombre,
        descripcion, setDescripcion,
        tipo, setTipo,
        locales, setLocales,
        setServicioAPI
    } = useServicioForms();

    const handleCrearServicio = async() => {
        console.log("El contenido de los locales a enviar es:", locales)
        try{
            const response = await axios.post("http://localhost:8080/api/servicios", 
                {
                    nombre,
                    descripcion,
                    tipo,
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
            navigate("/admin/servicios/successCrear", {
                state: { created: true }
            });
        }
        catch(err){
            console.error("Error al crear usuario:", err);
            alert("Hubo un error al crear el servicio");
        }
    }

    return(
        <div className="w-full px-10 py-8 text-left">
            <ServiciosForm
                title= "Registrar Servicio"
                subtitle="Rellene los siguientes campos para completar el registro del servicio."
                nombre={nombre}
                setNombre={setNombre}
                descripcion={descripcion}
                setDescripcion={setDescripcion}
                tipo={tipo}
                setTipo={setTipo}
                locales={locales}
                setLocales={setLocales}
                readOnly={false}
                onSubmit={handleCrearServicio}
                buttonText="Crear Servicio"
            />
        </div>
    )

    
        

}

export default CrearServicio;