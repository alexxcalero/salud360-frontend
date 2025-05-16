import { useState } from "react";

function useUsuarioForm(){
    const [nombres, setNombres] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [tipoDoc, setTipoDoc] = useState("");
    const [DNI, setDNI] = useState("");
    const [telefono, setTelefono] = useState("");
    const [rol, setRol] = useState("");
    const [correo, setCorreo] = useState("");
    const [genero, setGenero] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState("");
    const [contrasenha, setContrasenha] = useState("");
    
    const setUsuarioAPI = (usuario: any) => {
        setNombres(usuario.nombres || "");
        setApellidos(usuario.apellidos || "");
        setTipoDoc(usuario.tipoDocumento?.idTipoDocumento || "");
        setDNI(usuario.numeroDocumento || "");
        setTelefono(usuario.telefono || "");
        setRol(usuario.rol?.idRol || "");
        setCorreo(usuario.correo || "");
        setGenero(usuario.sexo || "");
        setFechaNacimiento(usuario.fechaNacimiento || "");
        setContrasenha(usuario.contrasenha || "");
    }

    return{
        nombres, setNombres,
        apellidos, setApellidos,
        tipoDoc, setTipoDoc,
        DNI, setDNI,
        telefono, setTelefono,
        rol, setRol,
        correo, setCorreo,
        genero, setGenero,
        fechaNacimiento, setFechaNacimiento,
        contrasenha, setContrasenha,
        setUsuarioAPI
  };
}

export default useUsuarioForm;