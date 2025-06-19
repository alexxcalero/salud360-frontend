import { useState } from "react";

function useLocalForm(){
    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [direccion, setDireccion] = useState("");
    const [tipo, setTipo] = useState("");
    const [servicios, setServicios] = useState<number | null>(null);
    const [aforo, setAforo] = useState<number>(0);
    
    const setLocalAPI = (local: any) => {
        setNombre(local.nombre || "");
        setTelefono(local.telefono || "");
        setDescripcion(local.descripcion || "");
        setDireccion(local.direccion || "");
        setTipo(local.tipoServicio || "");
        //setServicios((local.servicio || []).map((s: any) => s.idServicio));
        setServicios(local.servicio?.idServicio || null);
        setAforo(local.aforo || 0);
    }

    return{
        nombre, setNombre,
        telefono, setTelefono,
        descripcion, setDescripcion,
        direccion, setDireccion,
        tipo, setTipo,
        servicios, setServicios,
        aforo, setAforo,
        setLocalAPI
  };
}

export default useLocalForm;