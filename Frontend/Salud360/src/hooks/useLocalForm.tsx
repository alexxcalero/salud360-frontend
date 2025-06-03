import { useState } from "react";

function useLocalForm(){
    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [direccion, setDireccion] = useState("");
    const [tipo, setTipo] = useState("");
    const [servicios, setServicios] = useState<number | null>(null);
    
    const setLocalAPI = (local: any) => {
        setNombre(local.nombre || "");
        setTelefono(local.telefono || "");
        setDescripcion(local.descripcion || "");
        setDireccion(local.direccion || "");
        setTipo(local.tipoServicio || "");
        //setServicios((local.servicio || []).map((s: any) => s.idServicio));
        setServicios(local.servicio?.idServicio || null);
    }

    return{
        nombre, setNombre,
        telefono, setTelefono,
        descripcion, setDescripcion,
        direccion, setDireccion,
        tipo, setTipo,
        servicios, setServicios,
        setLocalAPI
  };
}

export default useLocalForm;