import  { useEffect, useState} from "react";
import axios from "axios";
import CardLanding from "./CardLanding";

function ListaComunidades(){
    
    const [comunidades, setComunidades] = useState([]);

    const fetchComunidades = () => {
    axios.get("http://localhost:8080/api/comunidades", {
      auth: {
        username: "admin",
        password: "admin123"
      }
    })
      .then(res => {
        console.log("Datos cargados:", res.data); // VER ESTO EN LA CONSOLA
        setComunidades(res.data);
        console.log("Comunidades:", res.data);
      })
      .catch(err => console.error("Error cargando comunidades", err));
    }

    useEffect(() => {
        fetchComunidades();
    }, []);

    //xd

    return (

        
    
        <div className="flex flex-row gap-8">
            {comunidades.map((comunidad: any, i) => (
                <CardLanding key={i} 
                image="https://png.pngtree.com/png-clipart/20201224/ourmid/pngtree-panda-bamboo-bamboo-shoots-simple-strokes-cartoon-with-pictures-small-fresh-png-image_2625172.jpg" 
                title={comunidad.nombre} subtitle={comunidad.descripcion} />
            ))}
        </div>

    );
}

export default ListaComunidades;