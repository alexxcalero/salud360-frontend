import LocalesForms from "@/components/admin/locales/LocalesForms";
import useLocalForm from "@/hooks/useLocalForm";
import { baseAPI } from "@/services/baseAPI";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

function DetalleLocal(){
    
    const [loading, setLoading] = useState(true);
    const {id} = useParams();

    const {
        nombre,// setNombre,
        telefono, //setTelefono,
        descripcion, //setDescripcion,
        direccion, //setDireccion,
        tipo, //setTipo,
        servicios, //setServicios,
        aforo, //setAforo,
        setLocalAPI
    } = useLocalForm();
    
    //const [serviciosSeleccionados, setServiciosSeleccionados] = useState([]);

    useEffect(() => {
        baseAPI.get(`/locales/${id}`, {
          auth: {
            username: "admin",
            password: "admin123"
          }
        })
          .then(res => {
            //console.log("Datos cargados en detalleLocal:", res.data); // VER ESTO EN LA CONSOLA
            setLocalAPI(res.data)
            //console.log("Servicio:", res.data);
            //console.log("idServicio:", res.data.servicio.idServicio);
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

    return(
        <div className="w-full px-10 py-8 text-left">
            <LocalesForms
                title= "Detalle Local"
                nombre={nombre}
                telefono={telefono}
                descripcion={descripcion}
                direccion={direccion}
                tipo={tipo}
                servicios={servicios}
                aforo={aforo}
                readOnly={true}
                buttonText="Crear Servicio"
            />
        </div>
    );
}

export default DetalleLocal;