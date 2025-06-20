import { useState } from "react";

function useServicioForms(){
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [tipo, setTipo] = useState("");
    const [locales, setLocales] = useState<number[] | null>(null);
    
    const setServicioAPI = (servicio: any) => {
        setNombre(servicio.nombre || "");
        setDescripcion(servicio.descripcion || "");
        setTipo(servicio.tipo || "");
        setLocales(servicio.locales?.idLocal || null);
    }

    return{
        nombre, setNombre,
        descripcion, setDescripcion,
        tipo, setTipo,
        locales, setLocales,
        setServicioAPI
  };
}

export default useServicioForms;