import ServiciosForm from "@/components/admin/servicios/ServiciosForm";
import useServicioForms from "@/hooks/useServicioForms";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

function EditarServicio(){

    const [loading, setLoading] = useState(true);
    const {id} = useParams();
    const navigate = useNavigate();

    const {
        nombre, setNombre,
        descripcion, setDescripcion,
        tipo, setTipo,
        locales, setLocales,
        setServicioAPI
    } = useServicioForms();

    useEffect(() => {
        axios.get(`http://localhost:8080/api/servicios/${id}`, {
          auth: {
            username: "admin",
            password: "admin123"
          }
        })
          .then(res => {
            console.log("Datos cargados en editarServicio:", res.data); // VER ESTO EN LA CONSOLA
            setServicioAPI(res.data)
            setLoading(false);
          })
          .catch(err => {
            console.error("Error cargando el servicio", err);
            setLoading(false);
          });
          
      }, []);

    if (loading) {
      return <p>Cargando local...</p>; // o un spinner
    }

    const handleCrearServicio = async() => {
        console.log("El contenido de los locales a enviar es:", locales)
        try{
            const response = await axios.put(`http://localhost:8080/api/servicios/${id}`, 
                {
                    nombre,
                    descripcion,
                    tipo,
                    locales: {idLocal: locales},
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
            console.error("Error al editar servicio:", err);
            alert("Hubo un error al editar el servicio");
        }
    }

    return(
        <div className="w-full px-10 py-8 text-left">
            <ServiciosForm
                title= "Editar servicio"
                nombre={nombre}
                setNombre={setNombre}
                descripcion={descripcion}
                setDescripcion={setDescripcion}
                tipo={tipo}
                setTipo={setTipo}
                readOnly={false}
                onSubmit={handleCrearServicio}
                buttonText="Guardar"
            />
        </div>
    )


}

export default EditarServicio