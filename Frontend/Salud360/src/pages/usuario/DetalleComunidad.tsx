import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

function DetalleComunidad(){
    
    const [comunidad, setComunidad] = useState<any>({});
    const {id} = useParams();
    

    const fetchComunidad = () => {
    axios.get(`http://localhost:8080/api/comunidades/${id}`, {
      auth: {
        username: "admin",
        password: "admin123"
      }
    })
      .then(res => {
        console.log("Datos cargados:", res.data); // VER ESTO EN LA CONSOLA
        setComunidad(res.data);
      })
      .catch(err => console.error("Error cargando comunidad", err));
    }

    useEffect(() => {
        fetchComunidad();
    }, []);
    
    return(
        <div>
            a
        </div>
    )
}

export default DetalleComunidad;