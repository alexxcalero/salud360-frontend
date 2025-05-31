import { useState } from "react";

function useServicioForms(){
    const [nombres, setNombres] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [tipo, setTipo] = useState("");
    const [locales, setLocales] = useState("");
    
    const setServicioAPI = (servicio: any) => {

        setNombres(servicio.nombre || "");
        setDescripcion(servicio.descripcion || "");
        setTipo(servicio.tipo || "");
    }

    return{
        nombres, setNombres,
        descripcion, setDescripcion,
        tipo, setTipo,
        setServicioAPI
  };
}

export default useServicioForms;