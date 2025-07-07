import UsuariosForms from "@/components/admin/usuarios/UsuariosForms";
import useUsuarioForm from "@/hooks/useUsuarioForm";
import ModalValidacion from "@/components/ModalValidacion";
import { useState } from "react";
import { useNavigate } from "react-router";
import { baseAPI } from "@/services/baseAPI";

function CrearUsuario() {
  const navigate = useNavigate();

  const [showModalValidacion, setShowModalValidacion] = useState(false);
  const [mensajeValidacion, setMensajeValidacion] = useState("");

  //Para la imagen
  const [imagenFile, setImagenFile] = useState<File | null>(null);

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
    direccion,
    setDireccion,
    correo,
    setCorreo,
    genero,
    setGenero,
    fechaNacimiento,
    setFechaNacimiento,
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

    if (!direccion || direccion.trim() === "") {
      setMensajeValidacion("La dirección no puede estar vacía.");
      return false;
    }

    if (!contrasenha || contrasenha.trim() === "") {
      setMensajeValidacion("La contraseña no puede estar vacía.");
      return false;
    }

    //console.log(tipoDoc);
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

    const fechaIngresada = new Date(fechaNacimiento);
    const hoy = new Date();
    if (isNaN(fechaIngresada.getTime()) || fechaIngresada >= hoy) {
      setMensajeValidacion(
        "La fecha de nacimiento debe ser válida y anterior a hoy."
      );
      return false;
    }
    return true;
  };

  const handleCrearUsuario = async () => {
    if (!validarCampos()) {
      setShowModalValidacion(true);
      return;
    }

    let nombreArchivo = null;

    if (imagenFile) {
      const formData = new FormData();
      formData.append("archivo", imagenFile);

      try {
        const res = await baseAPI.post(
          "/archivo",
          formData,
          {
            auth: {
              username: "admin",
              password: "admin123",
            },
          }
        );
        nombreArchivo = res.data.nombreArchivo;
      } catch (error) {
        console.error("Error al subir imagen:", error);
        alert("No se pudo subir la imagen.");
        return;
      }
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
        contrasenha,
        " fechaNacimiento:",
        fechaNacimiento
      );*/

      const response = await baseAPI.post(
        "/admin/clientes",
        {
          nombres,
          apellidos,
          numeroDocumento: DNI,
          correo,
          contrasenha,
          sexo,
          telefono,
          fechaNacimiento,
          direccion,
          fotoPerfil: nombreArchivo ?? null,
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

      //console.log("Usuario creado:", response.data);
      //alert("Usuario creado exitosamente");
      //console.log("A punto de navegar a successCrear");
      navigate("/admin/usuarios/successCrear", {
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
      <UsuariosForms
        title="Registrar Usuario"
        subtitle="Rellene los siguientes campos para completar el registro del usuario."
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
        direccion={direccion}
        setDireccion={setDireccion}
        genero={genero}
        setGenero={setGenero}
        fechaNacimiento={fechaNacimiento}
        setFechaNacimiento={setFechaNacimiento}
        contrasenha={contrasenha}
        setContrasenha={setContrasenha}
        onSubmit={handleCrearUsuario}
        buttonText="Crear Usuario"
        readOnly={false}
        onImagenSeleccionada={(file) => setImagenFile(file)}
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

export default CrearUsuario;

/*<FormContainer>
                <h1>Registrar Usuario</h1>
                <h2>Rellene los siguientes campos para completar el registro del usuario.</h2>
                <InputLabel type="email" placeholder="Ingrese los nombres" htmlFor="email" label="Nombres" value={nombres} onChange={(e) => setNombres(e.target.value)}/>
                <InputLabel type="email" placeholder="Ingrese los apellidos" htmlFor="email" label="Apellidos" value={apellidos} onChange={(e) => setApellidos(e.target.value)}/>
                <InputLabel type="email" placeholder="Ingrese el número de documento de identidad" htmlFor="email" label="DNI" value={DNI} onChange={(e) => setDNI(e.target.value)}/>
                <InputIconLabel icon={<Phone className="w-5 h-5" />} placeholder="Teléfono" type="tel" htmlFor="tel" label="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} ></InputIconLabel>
                <SelectLabel options={optionsSelect} placeholder="Seleccione el rol" htmlFor="email" label="Rol" value={rol} onChange={(value) => setRol(value)}/>
                <InputIconLabel icon={<Mail className="w-5 h-5" />} placeholder="Mail" type="email" htmlFor="email" label="Email" value={correo} onChange={(e) => setCorreo(e.target.value)}></InputIconLabel>
                <SelectLabel options={optionsSelect} placeholder="Seleccione su genero" htmlFor="email" label="Género" value={genero} onChange={(value) => setGenero(value)}/>
                <InputLabel type="date" placeholder="Ingrese la fecha de nacimiento" htmlFor="date" label="Fecha de nacimiento" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)}/>
                <InputLabel type="password" placeholder="" htmlFor="password" label="Contraseña" value={contrasenha} onChange={(e) => setContrasenha(e.target.value)}/>
                <Button variant="primary"size="md" className="my-4" onClick={handleCrearUsuario}>Crear Usuario</Button>
            </FormContainer> */

/*
<div>
                <p className="mt-2 text-sm text-gray-600">Valor actual: {nombres}</p>
                <p className="mt-2 text-sm text-gray-600">Valor actual: {apellidos}</p>
                <p className="mt-2 text-sm text-gray-600">Valor actual: {DNI}</p>
                <p className="mt-2 text-sm text-gray-600">Valor actual: {telefono}</p>
                <p className="mt-2 text-sm text-gray-600">Valor actual: {rol}</p>
                <p className="mt-2 text-sm text-gray-600">Valor actual: {correo}</p>
                <p className="mt-2 text-sm text-gray-600">Valor actual: {genero}</p>
                <p className="mt-2 text-sm text-gray-600">Valor actual: {fechaNacimiento}</p>
                <p className="mt-2 text-sm text-gray-600">Valor actual: {contrasenha}</p>
            </div>

*/

//Esto es lo que envuelve a lo que está arriba
//<div className="max-w-3xl w-full mx-auto p-8 my-10"></div>
