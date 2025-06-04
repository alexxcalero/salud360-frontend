import Button from "@/components/Button";
import Input from "@/components/input/Input";
import PasswordInput from "@/components/input/PasswordInput";
import { AuthContext } from "@/hooks/AuthContext";
import { useUsuario } from "@/hooks/useUsuario";
import { Calendar, ChevronDown, Mail, MapPin, Pen, Phone, User } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom"; // Asegúrate de tener esto bien configurado
import axios from "axios";
import { useEffect, useState } from "react";
import SelectLabel from "@/components/SelectLabel";

function InicioPerfi() {
  
  const {usuario, logout, loading} = useContext(AuthContext)
    
  if (loading || !usuario) return null;

  const {
    nombres,
    apellidos,
    correo,
    telefono,
    fechaNacimiento,
    sexo,
    direccion,
    fotoPerfil,
    numeroDocumento,
    fechaCreacion: rawFechaCreacion //Lo renombro así para formatearlo
  } = usuario;

  const fechaCreacion = new Date(usuario.fechaCreacion).toLocaleDateString("es-PE", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });

  const [showModalLogout, setShowModalLogout] = useState(false);
  const navigate = useNavigate();

  const [tipoDocSeleccionado, setTipoDocSeleccionado] = useState("");
  const [sexoSeleccionado, setSexoSeleccionado] = useState(sexo || "");
  const [tipoDocumentos, setTipoDocumentos] = useState([]);
  const [sexoOpciones, setSexoOpciones] = useState([
    { value: "Masculino", content: "Masculino" },
    { value: "Femenino", content: "Femenino" },
  ]);
  const [telefonoInput, setTelefonoInput] = useState(telefono ?? "");

  const fetchTipoDocumentos = () => {
    axios.get("http://localhost:8080/api/admin/tiposDocumentos", {
      auth: {
        username: "admin",
        password: "admin123"
      }
    })
      .then(res => {
        console.log("Datos cargados:", res.data); // VER ESTO EN LA CONSOLA
        
        const opciones = res.data.map((tipoDocX: any) => ({
            value: tipoDocX.idTipoDocumento.toString(),
            content: tipoDocX.nombre
        }))

        setTipoDocumentos(opciones)
        console.log("Tipo Documentos:", opciones);
      })
      .catch(err => console.error("Error cargando tipo documentos", err));
  }

  useEffect(() => {
      fetchTipoDocumentos();
  }, []);

  useEffect(() => {
    if (usuario?.tipoDocumento?.idTipoDocumento) {
      setTipoDocSeleccionado(usuario.tipoDocumento.idTipoDocumento.toString());
    }
  }, [usuario]);

  const handleAplicarCambios = async (e: React.FormEvent) => {
    e.preventDefault(); // Previene el comportamiento por defecto del submit

    try {
      await axios.put(
        `http://localhost:8080/api/usuarios/${usuario.idUsuario}`,
        {
          telefono,
          direccion,
          sexo: sexoSeleccionado,
          tipoDocumento: {
            idTipoDocumento: Number(tipoDocSeleccionado),
          },
          numeroDocumento,
          fechaNacimiento,
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
                ):
                <User color="black" className="h-[72px] aspect-1/1 border-[#2A86FF] rounded-full"/>
                }
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
            idName="nombres"
            label="Nombres"
            required={true}
            defaultValue={nombres}
          />
          <Input
            idName="apellidos"
            label="Apellidos"
            required={true}
            defaultValue={apellidos}
          />
          <div className="col-span-full">
            <Input
              idName="correo-electronico"
              label="Correo electrónico"
              type="email"
              leftIcon={<Mail />}
              required={true}
              defaultValue={correo}
            />
          </div>
          <Input
            idName="telefono"
            label="Teléfono"
            leftIcon={<Phone />}
            required
            value={telefonoInput}
            onChange={(e) => setTelefonoInput(e.target.value)}
          />
          <SelectLabel
            htmlFor="sexo"
            label="Sexo"
            options={sexoOpciones}
            value={sexoSeleccionado}
            onChange={(value) => setSexoSeleccionado(value)}
            placeholder="Seleccione su género"
          />
          <Input
            idName="ubicacion"
            label="Ubicación"
            leftIcon={<MapPin />}
            required={true}
            defaultValue={direccion}
          />
          <Input
            idName="fecha-nacimiento"
            label="Fecha de nacimiento"
            type="date"
            leftIcon={<Calendar />}
            required={true}
            defaultValue={fechaNacimiento}
          />
          <SelectLabel
            htmlFor="tipo-documento"
            label="Tipo de documento de identidad"
            options={tipoDocumentos}
            value={tipoDocSeleccionado}
            onChange={(value) => setTipoDocSeleccionado(value)}
            placeholder="Seleccione una opción"
          />
          <Input
            idName="numero-documento"
            label="Número de documento de identidad"
            required={true}
            defaultValue={numeroDocumento}
            placeholder="Ingrese su número de documento"
          />

        </section>
        <hr />
        <section className="mt-8 flex flex-col gap-4">
          <PasswordInput
            idName="contrasenha-actual"
            label="Contraseña actual"
            placeholder="Ingrese la contraseña actual"
            required={false}
          />
          <PasswordInput
            idName="contrasenha"
            label="Contraseña nueva"
            placeholder="Ingrese la nueva contraseña"
            required={false}
          />
          <PasswordInput
            idName="confirmar-contrasenha"
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
