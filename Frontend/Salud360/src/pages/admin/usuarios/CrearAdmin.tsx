import UsuariosForms from "@/components/admin/usuarios/UsuariosForms";
import useUsuarioForm from "@/hooks/useUsuarioForm";
import ModalValidacion from "@/components/ModalValidacion";
import { useState } from "react";
import { useNavigate } from "react-router";
import AdminForms from "@/components/admin/usuarios/AdminForms";
import { baseAPI } from "@/services/baseAPI";

function CrearAdmin() {
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
    telefono,
    setTelefono,
    correo,
    setCorreo,
    genero,
    setGenero,
    contrasenha,
    setContrasenha,
  } = useUsuarioForm();

  //VALIDACIONES DE CAMPOS
  const validarCampos = (): boolean => {
    const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    const soloNumeros = /^[0-9]+$/;
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nombres || !soloLetras.test(nombres)) {
      setMensajeValidacion(
        "Los nombres deben contener solo letras y no estar vacíos."
      );
      return false;
    }

    if (!apellidos || !soloLetras.test(apellidos)) {
      setMensajeValidacion(
        "Los apellidos deben contener solo letras y no estar vacíos."
      );
      return false;
    }

    if (!DNI || !soloNumeros.test(DNI) || DNI.length !== 8) {
      setMensajeValidacion(
        "El DNI debe tener exactamente 8 dígitos numéricos."
      );
      return false;
    }

    if (!telefono || !soloNumeros.test(telefono) || telefono.length !== 9) {
      setMensajeValidacion(
        "El teléfono debe tener exactamente 9 dígitos numéricos."
      );
      return false;
    }

    if (!correo.trim() || !regexCorreo.test(correo)) {
      setMensajeValidacion("El correo electrónico ingresado no es válido.");
      setShowModalValidacion(true);
      return false;
    }

    if (!contrasenha || contrasenha.trim() === "") {
      setMensajeValidacion("La contraseña no puede estar vacía.");
      return false;
    }

    if (!tipoDoc || tipoDoc === "") {
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

  const handleCrearAdmin = async () => {
    if (!validarCampos()) {
      setShowModalValidacion(true);
      return;
    }
    try {
      const numeroDocumento = DNI;
      const sexo = genero;

      //console.log("Rol: ", rol, "Genero: ", genero, "TipoDoc:", tipoDoc)

      /*console.log(
        "Nombres:",
        nombres,
        " Apellidos:",
        apellidos,
        " numeroDocumento:",
        numeroDocumento,
        " Telefono:",
        telefono,
        " correo:",
        correo,
        " sexo:",
        sexo,
        " contraseña:",
        contrasenha
      );*/

      const response = await baseAPI.post(
        "/admin",
        {
          nombres,
          apellidos,
          numeroDocumento: DNI,
          correo,
          contrasenha,
          sexo,
          telefono,
          tipoDocumento: {
            idTipoDocumento: tipoDoc,
          },
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

      //console.log("Admin creado:", response.data);
      //alert("Usuario creado exitosamente");
      //console.log("A punto de navegar a successCrear");
      navigate("/admin/usuarios/successCrearAdmin", {
        state: { created: true },
      });

      //console.log("DESDE USUARIO SUCCESS, EL VALOR DE state.created ES:", state.created)
    } catch (err) {
      console.error("Error al crear usuario:", err);
      alert("Hubo un error al crear el usuario");
    }
  };

  return (
    <>
      <AdminForms
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
        genero={genero}
        setGenero={setGenero}
        contrasenha={contrasenha}
        setContrasenha={setContrasenha}
        onSubmit={handleCrearAdmin}
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

export default CrearAdmin;
