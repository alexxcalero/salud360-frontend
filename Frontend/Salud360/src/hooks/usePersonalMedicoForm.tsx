import { useState } from "react";

function usePersonalMedicoForm(){
    const [nombres, setNombres] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [tipoDoc, setTipoDoc] = useState("");
    const [DNI, setDNI] = useState("");
    const [telefono, setTelefono] = useState("");
    const [especialidad, setEspecialidad] = useState("");
    const [correo, setCorreo] = useState("");
    const [genero, setGenero] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState("");
    const [contrasenha, setContrasenha] = useState("");
    const [descripcion, setDescripcion] = useState("");
    
    const setMedicoAPI = (medico: any) => {

        setNombres(medico.nombres || "");
        setApellidos(medico.apellidos || "");
        setTipoDoc(medico.tipoDocumento.idTipoDocumento || "");
        setDNI(medico.numeroDocumento || "");
        setTelefono(medico.telefono || "");
        setEspecialidad(medico.especialidad || "");
        setCorreo(medico.correo || "");
        setGenero(medico.sexo || "");
        setFechaNacimiento(medico.fechaNacimiento || "");
        setDescripcion(medico.descripcion || "");
        setContrasenha("xxxxxxxx");
    }

    return{
        nombres, setNombres,
        apellidos, setApellidos,
        tipoDoc, setTipoDoc,
        DNI, setDNI,
        telefono, setTelefono,
        especialidad, setEspecialidad,
        correo, setCorreo,
        genero, setGenero,
        fechaNacimiento, setFechaNacimiento,
        contrasenha, setContrasenha,
        descripcion, setDescripcion,
        setMedicoAPI
  };
}

export default usePersonalMedicoForm;