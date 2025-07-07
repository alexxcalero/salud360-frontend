import { useState } from "react";

function useUsuarioForm(){
    const [nombres, setNombres] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [tipoDoc, setTipoDoc] = useState("");
    const [DNI, setDNI] = useState("");
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");
    const [correo, setCorreo] = useState("");
    const [genero, setGenero] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState("");
    const [contrasenha, setContrasenha] = useState("");
    //Para el flujo de usuario:
    const [fechaCreacion, setFechaCreacion] = useState("");
    const [fotoPerfil, setFotoPerfil] = useState("");
    const [nombreTipoDoc, setNombreTipoDoc] = useState("");
    const [comunidades, setComunidades] = useState([]);
    const [notiPorCorreo, setNotiPorCorreo] = useState(false);
    const [notiPorSMS, setNotiPorSMS] = useState(false);
    const [notiPorWhatsApp, setNotiPorWhatsApp] = useState(false);
    const [afiliaciones, setAfiliaciones] = useState([]);
    
    const setUsuarioAPI = (usuario: any) => {

        setNombres(usuario.nombres || "");
        setApellidos(usuario.apellidos || "");
        setTipoDoc(usuario.tipoDocumento.idTipoDocumento || "");
        setDNI(usuario.numeroDocumento || "");
        setTelefono(usuario.telefono || "");
        setDireccion(usuario.direccion || "");
        setCorreo(usuario.correo || "");
        setGenero(usuario.sexo || "");
        setFechaNacimiento(usuario.fechaNacimiento || "");
        //console.log("LA CONTRASEñA ES:", usuario.contrasenha)
        setContrasenha("xxxxxxxx");
        setFechaCreacion(usuario.fechaCreacion || "");
        setFotoPerfil(usuario.fotoPerfil || "");
        setNombreTipoDoc(usuario.tipoDocumento.nombre || "");
        setComunidades(usuario.comunidades || []);
        setNotiPorCorreo(usuario.notificacionPorCorreo || false);
        setNotiPorWhatsApp(usuario.notificacionPorWhatsApp || false);
        setNotiPorSMS(usuario.notificacionPorSMS || false);
        setAfiliaciones(usuario.afiliaciones || [])
        
    }

    return{
        nombres, setNombres,
        apellidos, setApellidos,
        tipoDoc, setTipoDoc,
        DNI, setDNI,
        telefono, setTelefono,
        direccion, setDireccion,
        correo, setCorreo,
        genero, setGenero,
        fechaNacimiento, setFechaNacimiento,
        contrasenha, setContrasenha,
        fechaCreacion, setFechaCreacion,
        fotoPerfil, setFotoPerfil,
        nombreTipoDoc, setNombreTipoDoc,
        comunidades, setComunidades,
        notiPorCorreo, setNotiPorCorreo,
        notiPorSMS, setNotiPorSMS,
        notiPorWhatsApp, setNotiPorWhatsApp,
        afiliaciones, setAfiliaciones,
        setUsuarioAPI
  };
}

export default useUsuarioForm;