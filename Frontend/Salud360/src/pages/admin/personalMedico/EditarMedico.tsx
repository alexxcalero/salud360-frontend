import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import usePersonalMedicoForm from "@/hooks/usePersonalMedicoForm";
import PersonalMedicoForms from "@/components/admin/personalMedico/PersonalMedicoForms";

function EditarMedico() {
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
    return <p>Cargando médico...</p>; // o un spinner
  }

  const handleEditarMedico = async () => {
    try {
      const sexo = genero;

      const response = await axios.patch(
        `http://localhost:8080/api/medicos/${id}`,
        {
          nombres,
          apellidos,
          numeroDocumento: DNI,
          correo,
          telefono,
          sexo,
          fechaNacimiento,
          tipoDocumento: {
            idTipoDocumento: tipoDoc,
          },
          especialidad,
          descripcion,
        },
        {
          auth: {
            username: "admin",
            password: "admin123",
          },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Médico editado:", response.data);
      alert("Médico editado exitosamente");
    } catch (err) {
      console.error("Error al crear usuario:", err);
      alert("Hubo un error al crear el usuario");
    }
  };

  return (
    <PersonalMedicoForms
      title="Editar médico"
      nombres={nombres}
      setNombres={setNombres}
      apellidos={apellidos}
      setApellidos={setApellidos}
      tipoDoc={tipoDoc}
      setTipoDoc={setTipoDoc}
      DNI={DNI}
      setDNI={setDNI}
      telefono={telefono}
      setTelefono={setTelefono}
      correo={correo}
      setCorreo={setCorreo}
      especialidad={especialidad}
      setEspecialidad={setEspecialidad}
      genero={genero}
      setGenero={setGenero}
      fechaNacimiento={fechaNacimiento}
      setFechaNacimiento={setFechaNacimiento}
      contrasenha={contrasenha}
      setContrasenha={setContrasenha}
      descripcion={descripcion}
      setDescripcion={setDescripcion}
      onSubmit={handleEditarMedico}
      buttonText="Guardar"
      readOnly={false}
    />
  );
}

export default EditarMedico;
