import Button from "@/components/Button";
import Input from "@/components/input/Input";
import PasswordInput from "@/components/input/PasswordInput";
import { AuthContext } from "@/hooks/AuthContext";
import { useUsuario } from "@/hooks/useUsuario";
import {
  Calendar,
  ChevronDown,
  Mail,
  MapPin,
  Pen,
  Phone,
  User,
} from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom"; // Asegúrate de tener esto bien configurado
import axios from "axios";
import { useEffect, useState } from "react";
import SelectLabel from "@/components/SelectLabel";
import useUsuarioForm from "@/hooks/useUsuarioForm";

function InicioPerfi() {
  const { usuario, logout, loading } = useContext(AuthContext);
  const [showModalLogout, setShowModalLogout] = useState(false);
  const [waiting, setWaiting] = useState(true);
  const navigate = useNavigate();
  
  const [tipoDocumentos, setTipoDocumentos] = useState([]);

  if (loading || !usuario) return null;

  /*const {
    nombres,
    apellidos,
    correo,
    telefono,
    fechaNacimiento,
    sexo,
    direccion,
    fotoPerfil,
    numeroDocumento,
    fechaCreacion: rawFechaCreacion, //Lo renombro así para formatearlo
  } = usuario;*/

  const {
    fotoPerfil,
    fechaCreacion: rawFechaCreacion
  } = usuario;

  const {
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
        setUsuarioAPI
  } = useUsuarioForm();

  useEffect(() => {
    console.log("El usuario en use effect es:", usuario)
    console.log("El nombre de un usuario en en use effect es:", usuario.nombres)
    setUsuarioAPI(usuario);
    console.log("Nombres:", nombres, " Apellidos:", apellidos, " numeroDocumento:", DNI, " Telefono:", telefono,
                 " correo:", correo, " sexo:", genero, " contraseña:", contrasenha, " fechaNacimiento:", fechaNacimiento);
    setWaiting(false);
  }, [])

  if (waiting) {
      return <p>Cargando usuario...</p>; // o un spinner
  }

  const fechaCreacion = new Date(rawFechaCreacion).toLocaleDateString(
    "es-PE",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }
  );


  
  
  /*
  const [tipoDocSeleccionado, setTipoDocSeleccionado] = useState("");
  const [sexoSeleccionado, setSexoSeleccionado] = useState(sexo || "");
  const [sexoOpciones, setSexoOpciones] = useState([
    { value: "Masculino", content: "Masculino" },
    { value: "Femenino", content: "Femenino" },
  ]);
  const [nombresInput, setNombresInput] = useState(nombres ?? "");
  const [apellidosInput, setApellidosInput] = useState(apellidos ?? "");
  const [correoInput, setCorreoInput] = useState(correo ?? "");
  const [telefonoInput, setTelefonoInput] = useState(telefono ?? "");
  const [direccionInput, setDireccionInput] = useState(direccion ?? "");
  const [fechaNacimientoInput, setFechaNacimientoInput] = useState(fechaNacimiento ?? "");
  const [numeroDocumentoInput, setNumeroDocumentoInput] = useState(numeroDocumento ?? "");*/


  
 

  const sexo = [
    { value: "Masculino", content: "Masculino" },
    { value: "Femenino", content: "Femenino" }
  ]

  /*useEffect(() => {
    if (usuario?.tipoDocumento?.idTipoDocumento) {
      setTipoDocSeleccionado(usuario.tipoDocumento.idTipoDocumento.toString());
    }
  }, [usuario]);*/

  const handleAplicarCambios = async (e: React.FormEvent) => {
    e.preventDefault(); // Previene el comportamiento por defecto del submit
    try {
      
      await axios.put(
        `http://localhost:8080/api/usuarios/${usuario.idUsuario}`,
        {
          nombres,
          apellidos,
          numeroDocumento: DNI,
          correo,
          telefono,
          sexo,
          fechaNacimiento,
          //notificacionPorCorreo: true,
          //notificacionPorSMS: true,
          //notificacionPorWhatsApp: true,
          direccion,
          tipoDocumento: {
              idTipoDocumento: tipoDoc
          },


          /*telefono: telefonoInput,
          direccion: direccionInput,
          sexo: sexoSeleccionado,
          fechaNacimiento: fechaNacimientoInput,
          numeroDocumento: numeroDocumentoInput,
          idTipoDocumento: Number(tipoDocSeleccionado),*/
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

      navigate("/usuario"); // ✅ Redirige después del éxito
    } catch (error) {
      console.error("❌ Error al actualizar perfil:", error);
      alert("Hubo un error al aplicar los cambios.");
    }
  };

  

  return (
    <div className="p-8">
      <form onSubmit={handleAplicarCambios}>
        <section className="flex gap-4 mb-8">
          <figure className="relative group">
            {fotoPerfil ? (
              <img
                src={fotoPerfil}
                alt="Foto de perfil"
                className="h-[72px] aspect-1/1 rounded-full"
              />
            ) : (
              <User
                color="black"
                className="h-[72px] aspect-1/1 border-[#2A86FF] rounded-full"
              />
            )}
            <div className="opacity-0 group-hover:opacity-100 absolute top-0 left-0 w-full h-full bg-black/40 rounded-full backdrop-blur-xs flex justify-center items-center transition-all ease-out duration-100">
              <Pen color="white" />
            </div>
            <input
              type="file"
              name=""
              id=""
              className="absolute top-0 left-0 w-full h-full opacity-0"
            />
          </figure>
          <div>
            <h1 className="text-left">
              {nombres} {apellidos}
            </h1>
            <span className="block text-left">
              Miembro desde:{" "}
              <time dateTime={fechaCreacion}>{fechaCreacion}</time>
            </span>
          </div>
        </section>
        <section className="grid grid-cols-2 justify-start place-items-stretch gap-4 mb-8">
          <Input
            name="nombres"
            label="Nombres"
            required={true}
            value={nombres}
            onChange={(e) => setNombres(e.target.value)}
          />
          <Input
            name="apellidos"
            label="Apellidos"
            required={true}
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
          />
          <div className="col-span-full">
            <Input
              name="correo-electronico"
              label="Correo electrónico"
              type="email"
              leftIcon={<Mail />}
              required={true}
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>
          <Input
            name="telefono"
            label="Teléfono"
            leftIcon={<Phone />}
            required={true}
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
          <SelectLabel
            htmlFor="sexo"
            label="Sexo"
            options={sexo}
            value={genero}
            onChange={(value) => setGenero(value)}
            placeholder="Seleccione su género"
          />
          <Input
            name="ubicacion"
            label="Ubicación"
            leftIcon={<MapPin />}
            required={true}
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          />
          <Input
            name="fecha-nacimiento"
            label="Fecha de nacimiento"
            type="date"
            leftIcon={<Calendar />}
            required={true}
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
          />
          <SelectLabel
            htmlFor="tipo-documento"
            label="Tipo de documento de identidad"
            options={tipoDocumentos}
            placeholder="Seleccione el tipo de documento"
            value={tipoDoc}
            onChange={(value) => setTipoDoc(value)}
          />
          <Input
            name="numero-documento"
            label="Número de documento de identidad"
            required={true}
            value={DNI}
            onChange={(e) => setDNI(e.target.value)}
            placeholder="Ingrese su número de documento"
          />
        </section>

        <hr />
        <section className="mt-8 flex flex-col gap-4">
          <PasswordInput
            name="contrasenha-actual"
            label="Contraseña actual"
            placeholder="Ingrese la contraseña actual"
            required={false}
          />
          <PasswordInput
            name="contrasenha"
            label="Contraseña nueva"
            placeholder="Ingrese la nueva contraseña"
            required={false}
          />
          <PasswordInput
            name="confirmar-contrasenha"
            label="Confirmar contraseña nueva"
            placeholder="Confirme la nueva contraseña"
            required={false}
          />
        </section>
        <section className="flex gap-4 mt-8 justify-end">
          <Button onClick={() => navigate(-1)} variant="outline">
            Volver
          </Button>
          <Button type="submit">Aplicar cambios</Button>
        </section>
      </form>

      {/* Botón cerrar sesión */}
      <button
        className="mt-8 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded w-max self-end"
        onClick={() => setShowModalLogout(true)}
      >
        Cerrar sesión
      </button>

      {/* Modal de confirmación */}
      {showModalLogout && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40" />
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-md max-w-md w-full text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-yellow-300 rounded-full w-16 h-16 flex items-center justify-center">
                  <span className="text-white text-3xl font-bold">!</span>
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-2">
                ¿Deseas cerrar sesión?
              </h2>
              <p className="mb-6">Serás redirigido a la pantalla de inicio</p>
              <div className="flex justify-center gap-4">
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
                  onClick={() => setShowModalLogout(false)}
                >
                  Cancelar
                </button>
                <Button
                  variant="danger"
                  onClick={() => {
                    setShowModalLogout(false);
                    navigate("/"); // Reemplaza "/" con la ruta que corresponda a tu login o inicio
                  }}
                >
                  Confirmar
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default InicioPerfi;
