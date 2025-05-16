import PersonalMedicoForms from "@/components/admin/personalMedico/PersonalMedicoForms";
import usePersonalMedicoForm from "@/hooks/usePersonalMedicoForm";
import UnderConstruction from "@/pages/UnderConstruction";
import axios from "axios";
import { useNavigate } from "react-router";

function CrearMedico() {
  const navigate = useNavigate();

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
  } = usePersonalMedicoForm();

  const handleCrearMedico = async () => {
    try {
      const sexo = genero;

      const response = await axios.post(
        "http://localhost:8080/api/medicos",
        {
          nombres,
          apellidos,
          numeroDocumento: DNI,
          correo,
          telefono,
          sexo,
          contrasenha,
          fechaNacimiento,
          notiCorreo: true,
          notiSMS: true,
          notiWhatsApp: true,
          tipoDocumento: {
            idTipoDocumento: tipoDoc,
          },
          rol: {
            idTipoRol: 2, //El rol del médico es 2
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

      console.log("Medico creado:", response.data);
      alert("Medio creado exitosamente");
      navigate("/admin/personalMedico");
    } catch (err) {
      console.error("Error al crear medio:", err);
      alert("Hubo un error al crear el medico");
    }
  };

  return (
    <div>
      <PersonalMedicoForms
        title="Registrar Medico"
        subtitle="Rellene los siguientes campos para completar el registro del medico."
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
        onSubmit={handleCrearMedico}
        buttonText="Crear Medico"
        readOnly={false}
      />
    </div>
  );
}

export default CrearMedico;
