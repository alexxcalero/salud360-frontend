import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import usePersonalMedicoForm from "@/hooks/usePersonalMedicoForm";
import PersonalMedicoForms from "@/components/admin/personalMedico/PersonalMedicoForms";

function DetalleMedico() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const {
    nombres,
    setNombres,
    apellidos,
    setApellidos,
    tipoDoc,
    setTipoDoc,
    DNI,
    setDNI,
    telefono,
    setTelefono,
    especialidad,
    setEspecialidad,
    correo,
    setCorreo,
    genero,
    setGenero,
    fechaNacimiento,
    setFechaNacimiento,
    contrasenha,
    setContrasenha,
    descripcion,
    setDescripcion,
    setMedicoAPI,
  } = usePersonalMedicoForm();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/medicos/${id}`, {
        auth: {
          username: "admin",
          password: "admin123",
        },
      })
      .then((res) => {
        console.log("Datos cargados:", res.data); // VER ESTO EN LA CONSOLA
        setMedicoAPI(res.data);
        console.log("Medico:", res.data);
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
      telefono={telefono}
      correo={correo}
      especialidad={especialidad}
      genero={genero}
      fechaNacimiento={fechaNacimiento}
      contrasenha={contrasenha}
      descripcion={descripcion}
      buttonText="Crear Usuario"
      readOnly={true}
    />
  );
}

export default DetalleMedico;

//Ver CrearUsuario
