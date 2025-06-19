import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import usePersonalMedicoForm from "@/hooks/usePersonalMedicoForm";
import PersonalMedicoForms from "@/components/admin/personalMedico/PersonalMedicoForms";
import { useNavigate } from "react-router";
import ModalValidacion from "@/components/ModalValidacion";


function EditarMedico() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const [showModalValidacion, setShowModalValidacion] = useState(false);
  const [mensajeValidacion, setMensajeValidacion] = useState("");


  const {
    nombres,
    setNombres,
    apellidos,
    setApellidos,
    tipoDoc,
    setTipoDoc,
    DNI,
    setDNI,
    //telefono,
    //setTelefono,
    especialidad,
    setEspecialidad,
    //correo,
    //setCorreo,
    genero,
    setGenero,
    //fechaNacimiento,
    //setFechaNacimiento,
    //contrasenha,
    //setContrasenha,
    descripcion,
    setDescripcion,
    setMedicoAPI,
  } = usePersonalMedicoForm();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/admin/medicos/${id}`, {
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


  //VALIDACIONES DE CAMPOS 
    const validarCampos = (): boolean => {
    const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    const soloNumeros = /^[0-9]+$/;

    if (!nombres || !soloLetras.test(nombres)) {
      setMensajeValidacion("Los nombres deben contener solo letras y no estar vacíos.");
      setShowModalValidacion(true);
      return false;
    }

    if (!apellidos || !soloLetras.test(apellidos)) {
      setMensajeValidacion("Los apellidos deben contener solo letras y no estar vacíos.");
      setShowModalValidacion(true);
      return false;
    }

    if (!DNI || !soloNumeros.test(DNI) || DNI.length !== 8) {
      setMensajeValidacion("El DNI debe tener exactamente 8 dígitos numéricos.");
      setShowModalValidacion(true);
      return false;
    }


    if (!especialidad || especialidad.trim() === "") {
      setMensajeValidacion("La especialidad no puede estar vacía.");
      setShowModalValidacion(true);
      return false;
    }

    if (!descripcion || descripcion.trim() === "") {
      setMensajeValidacion("La descripción no puede estar vacía.");
      setShowModalValidacion(true);
      return false;
    }
    //mod b t
    if (!tipoDoc || tipoDoc.trim() === "") {
      setMensajeValidacion("Debe seleccionar un tipo de documento.");
      setShowModalValidacion(true);
      return false;
    }

    if (!genero || genero.trim() === "") {
      setMensajeValidacion("Debe seleccionar un género.");
      setShowModalValidacion(true);
      return false;
    }

    return true;
  };


  const handleEditarMedico = async () => {

    if (!validarCampos()) {
            setShowModalValidacion(true);
            return;
    }

    try {
      const sexo = genero;
      //mb response
      await axios.put(
        `http://localhost:8080/api/admin/medicos/${id}`,
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

      navigate("/admin/personalMedico/", {
        state: { updated: true }
      });

    } catch (err) {
      console.error("Error al editar el medico:", err);
      alert("Hubo un error al editar el medico");
    }
  };

  return (
    <>
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
      especialidad={especialidad}
      setEspecialidad={setEspecialidad}
      genero={genero}
      setGenero={setGenero}
      descripcion={descripcion}
      setDescripcion={setDescripcion}
      onSubmit={handleEditarMedico}
      buttonText="Guardar"
      readOnly={false}
    />
    {showModalValidacion && (
                <div className="fixed inset-0 bg-black/60 z-40">
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <ModalValidacion
                    titulo="Error en los campos"
                    mensaje={mensajeValidacion}
                    onClose={() => setShowModalValidacion(false)}
                    />
                </div>
                </div>
            )}
            </>
  );
}

export default EditarMedico;
