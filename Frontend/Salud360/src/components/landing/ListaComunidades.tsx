import  { useState} from "react";
import axios from "axios";

function ListaComunidades(){
    
    const [comunidades, setComunidades] = useState([]);

    const fetchComunidadess = () => {
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

    return (
        <div>{comunidades}</div>
    );
}

export default ListaComunidades;