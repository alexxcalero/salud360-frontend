import ServiciosForm from "@/components/admin/servicios/ServiciosForm";
import useServicioForms from "@/hooks/useServicioForms";
import { baseAPI } from "@/services/baseAPI";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

function DetalleServicio(){

    const [loading, setLoading] = useState(true);
    const {id} = useParams();

    const {
        nombre, //setNombre,
        descripcion, //setDescripcion,
        tipo, //setTipo,
        //locales, setLocales,
        setServicioAPI
    } = useServicioForms();

    const [localesSeleccionados, setLocalesSeleccionados] = useState([]);

    useEffect(() => {
        baseAPI.get(`/servicios/${id}`, {
          auth: {
            username: "admin",
            password: "admin123"
          }
        })
          .then(res => {
            //console.log("Datos cargados:", res.data); // VER ESTO EN LA CONSOLA
            setServicioAPI(res.data)
            //console.log("Servicio:", res.data);
            setLoading(false);
            setLocalesSeleccionados(res.data.locales.map((l: any) => l.idLocal));
          })
          .catch(err => {
            console.error("Error cargando el servicio", err);
            setLoading(false);
          });
          
      }, []);

    if (loading) {
      return <p>Cargando servicio...</p>; // o un spinner
    }

    return(
        <div className="w-full px-10 py-8 text-left">
            <ServiciosForm
                title= "Detalles del servicio"
                nombre={nombre}
                descripcion={descripcion}
                tipo={tipo}
                locales={localesSeleccionados}
                readOnly={true}
                buttonText="Crear Servicio"
            />
        </div>
    )

}

export default DetalleServicio;