import LocalesForms from "@/components/admin/locales/LocalesForms";
import useLocalForm from "@/hooks/useLocalForm";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

function EditarLocal(){
    const [loading, setLoading] = useState(true);
    const {id} = useParams();
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
    
    //const [serviciosSeleccionados, setServiciosSeleccionados] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/locales/${id}`, {
          auth: {
            username: "admin",
            password: "admin123"
          }
        })
          .then(res => {
            console.log("Datos cargados en detalleLocal:", res.data); // VER ESTO EN LA CONSOLA
            setLocalAPI(res.data)
            console.log("Servicio:", res.data);
            console.log("idServicio:", res.data.servicio.idServicio);
            setLoading(false);
            //setServiciosSeleccionados([res.data.servicio.idServicio]);
          })
          .catch(err => {
            console.error("Error cargando el servicio", err);
            setLoading(false);
          });
          
      }, []);

    if (loading) {
      return <p>Cargando local...</p>; // o un spinner
    }

    const handleEditarLocal = async() => {
        console.log("El contenido de los servicios a enviar es:", servicios)
        try{
            const response = await axios.put(`http://localhost:8080/api/locales/${id}`, 
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
            navigate("/admin/locales/successEditar", {
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
                title= "Editar Local"
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
                onSubmit={handleEditarLocal}
                buttonText="Guardar"
            />
        </div>
    );
}

export default EditarLocal;