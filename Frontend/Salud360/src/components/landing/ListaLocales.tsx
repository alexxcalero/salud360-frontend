import  { useState} from "react";
import axios from "axios";

function ListaLocales(){
    
    const [locales, setLocales] = useState([]);

    const fetchLocales = () => {
    axios.get("http://localhost:8080/api/locales", {
      auth: {
        username: "admin",
        password: "admin123"
      }
    })
      .then(res => {
        console.log("Datos cargados:", res.data); // VER ESTO EN LA CONSOLA
        setLocales(res.data);
        console.log("Locales:", res.data);
      })
      .catch(err => console.error("Error cargando locales", err));
    }

    return (
        <div>{locales}</div>
    );
}

export default ListaLocales;