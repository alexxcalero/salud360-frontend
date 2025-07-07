import { useEffect, useState } from "react";
import { useParams } from "react-router";
import usePersonalMedicoForm from "@/hooks/usePersonalMedicoForm";
import PersonalMedicoForms from "@/components/admin/personalMedico/PersonalMedicoForms";
import { baseAPI } from "@/services/baseAPI";

function DetalleMedico() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const {
    nombres,
    //setNombres,
    apellidos,
    //setApellidos,
    tipoDoc,
    //setTipoDoc,
    DNI,
    //setDNI,
    //telefono,
    //setTelefono,
    especialidad,
    //setEspecialidad,
    //correo,
    //setCorreo,
    genero,
    //setGenero,
    //fechaNacimiento,
    //setFechaNacimiento,
    //contrasenha,
    //setContrasenha,
    descripcion,
    //setDescripcion,
    setMedicoAPI,
  } = usePersonalMedicoForm();

  useEffect(() => {
    baseAPI
      .get(`/admin/medicos/${id}`, {
        auth: {
          username: "admin",
          password: "admin123",
        },
      })
      .then((res) => {
        //console.log("Datos cargados:", res.data); // VER ESTO EN LA CONSOLA
        setMedicoAPI(res.data);
        //console.log("Medico:", res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando el medico", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Cargando usuario...</p>; // o un spinner
  }

  return (
    <PersonalMedicoForms
      title="Detalles del usuario"
      nombres={nombres}
      apellidos={apellidos}
      tipoDoc={tipoDoc}
      DNI={DNI}
      especialidad={especialidad}
      genero={genero}
      descripcion={descripcion}
      buttonText="Crear Usuario"
      readOnly={true}
    />
  );
}

export default DetalleMedico;

//Ver CrearUsuario
