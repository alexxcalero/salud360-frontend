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
        "http://localhost:8080/api/admin/medicos",
        {
          nombres,
          apellidos,
          numeroDocumento: DNI,
          sexo,
          especialidad,
          descripcion,
          tipoDocumento: {
            idTipoDocumento: tipoDoc,
          }
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
      //alert("Medico creado exitosamente");
      console.log("A punto de navegar a successCrear")
      navigate("/admin/personalMedico/successCrear", {
          state: { created: true }
      });
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
        especialidad={especialidad}
        setEspecialidad={setEspecialidad}
        genero={genero}
        setGenero={setGenero}
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
