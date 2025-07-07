import Button from "@/components/Button";
import { AuthContext } from "@/hooks/AuthContext";
import {
  Pen, User
} from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom"; // Asegúrate de tener esto bien configurado
import { useEffect, useState } from "react";
import useUsuarioForm from "@/hooks/useUsuarioForm";
import PerfilForms from "@/components/landing/PerfilForms";
import PerfilPasswordForms from "@/components/usuario/PerfilPasswordForms";
import ModalValidacion from "@/components/ModalValidacion";
import { baseAPI } from "@/services/baseAPI";


function InicioPerfil() {
  const { usuario, logout, loading: cargando, actualizarUsuario } = useContext(AuthContext);
    if (cargando || !usuario) return null;

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [showModalLogout, setShowModalLogout] = useState(false);
    const [showModalValidacion, setShowModalValidacion] = useState(false);
    const [mensajeValidacion, setMensajeValidacion] = useState("");


    const [staticNombres, setStaticNombres] = useState("");
    const [staticApellidos, setStaticApellidos] = useState("");

    //Para la imagen
    const [imagenFile, setImagenFile] = useState<File | null>(null);
    const [imagenPreview, setImagenPreview] = useState<string | null>(null);

    const {
      fotoPerfil,
      fechaCreacion: rawFechaCreacion,
      notificacionPorCorreo,
      notificacionPorSMS,
      notificacionPorWhatsApp,
      idUsuario,
      idCliente
    } = usuario;

   // console.log("Usuario en idUsuario:", usuario);

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
        contrasenha, //setContrasenha,
        setUsuarioAPI
    } = useUsuarioForm();

    useEffect(() => {
        baseAPI.get(`/admin/clientes/${idCliente}`, {
          auth: {
            username: "admin",
            password: "admin123"
          }
        })
          .then(res => {
            //console.log("Datos cargados:", res.data); // VER ESTO EN LA CONSOLA
            setUsuarioAPI(res.data);
           // console.log("Usuario:", res.data);
            setStaticNombres(res.data.nombres);
            setStaticApellidos(res.data.apellidos);
            setLoading(false);
          })
          .catch(err => {
            console.error("Error cargando el usuario", err);
            setLoading(false);
          });
      }, []);
    
    if (loading) {
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

    //VALIDACIONES DE CAMPOS 
    const validarCampos = (): boolean => {
    const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    const soloNumeros = /^[0-9]+$/;
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nombres || !soloLetras.test(nombres)) {
      setMensajeValidacion("Los nombres deben contener solo letras y no estar vacíos.");
      return false;
    }

    if (!apellidos || !soloLetras.test(apellidos)) {
      setMensajeValidacion("Los apellidos deben contener solo letras y no estar vacíos.");
      return false;
    }

    if (!DNI || !soloNumeros.test(DNI) || DNI.length !== 8) {
      setMensajeValidacion("El DNI debe tener exactamente 8 dígitos numéricos.");
      return false;
    }

    if (!telefono || !soloNumeros.test(telefono) || telefono.length !== 9) {
      setMensajeValidacion("El teléfono debe tener exactamente 9 dígitos numéricos.");
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
      setMensajeValidacion("La fecha de nacimiento debe ser válida y anterior a hoy.");
      return false;
    }
    return true;
  };  


  const handleAplicarCambios = async() => {

    if (!validarCampos()) {
        setShowModalValidacion(true);
        return;
    }


    let nombreArchivo = fotoPerfil;

    if (imagenFile) {
      const formData = new FormData();
      formData.append("archivo", imagenFile);

    try {
      const res = await baseAPI.post("/archivo", formData, {
        auth: { username: "admin", password: "admin123" },
      });
      nombreArchivo = res.data.nombreArchivo;
    } catch (error) {
      console.error("❌ Error al subir imagen:", error);
      alert("No se pudo subir la imagen.");
      return;
    }
    }
    //console.log("Genero en onSubmit:", genero);
    //console.log("TipoDoc en onSubmit:", tipoDoc);
    try {
      
      const response = await baseAPI.put(
        `/admin/clientes/${idCliente}`,
        {
          nombres,
          apellidos,
          numeroDocumento: DNI,
          correo,
          telefono,
          notificacionPorCorreo,
          notificacionPorSMS,
          notificacionPorWhatsApp,
          sexo: genero,
          fechaNacimiento,
          direccion,
          fotoPerfil: nombreArchivo ?? null,
          tipoDocumento: {
              idTipoDocumento: tipoDoc
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

      

      actualizarUsuario(response.data);
     // console.log("Perfil editado:", response.data);
      //alert("Usuario editado exitosamente");
      navigate("/usuario/configuracion/successEditar", {
          state: { created: true }
      });
    } catch (error) {
      console.error("❌ Error al actualizar perfil:", error);
      alert("Hubo un error al aplicar los cambios.");
    }
  };

 /* console.log("Nombres:", nombres, " Apellidos:", apellidos, " numeroDocumento:", DNI, " Telefono:", telefono," correo:", correo, " sexo:", genero, " contraseña:", contrasenha, 
    " fechaNacimiento:", fechaNacimiento, "Tipo documento:", tipoDoc);*/


  return (
    <div className="flex flex-col p-8">
      <title>Perfil de usuario</title>
      <section className="flex gap-4 mb-8">
          <figure className="relative group">
            {fotoPerfil ? (
              <img
                src={imagenPreview ? imagenPreview : `http://localhost:8080/api/archivo/${fotoPerfil}`}
                alt="Foto de perfil"
                className="h-[72px] aspect-1/1 rounded-full object-cover"
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
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setImagenFile(file);
                      setImagenPreview(URL.createObjectURL(file));
                    }
                  }}
            />
          </figure>
          <div>
            <h1 className="text-left">
              {staticNombres} {staticApellidos}
            </h1>
            <span className="block text-left">
              Miembro desde:{" "}
              <time dateTime={fechaCreacion}>{fechaCreacion}</time>
            </span>
          </div>
      </section>

      <PerfilForms
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
        onSubmit={handleAplicarCambios}
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

      <hr className="mt-8 border border-gray-300" /> 

      <PerfilPasswordForms id={idUsuario}/>

      <hr className="mt-8 border border-gray-300" />

      <section className="flex gap-4 mt-8 justify-between">
            <Button variant="outline" size="lg" onClick={() => navigate(-1)} >
                Volver
            </Button>
            <Button variant="danger" size="lg" onClick={() => setShowModalLogout(true)} >
                Cerrar Sesión
            </Button>
      </section>



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
                                <Button
                                    size="lg"
                                    onClick={() => {
                                        setShowModalLogout(false);
                                    }}
                                    
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    variant="danger"
                                    size="lg"
                                    onClick={logout}
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

export default InicioPerfil;

{/*<div className="p-8">


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

      <form onSubmit={handleAplicarCambios}>
        
        <section className="grid grid-cols-2 justify-start place-items-stretch gap-4 mb-8">
          <InputLabel type="email" placeholder="Ingrese los nombres" htmlFor="email" label="Nombres" value={nombres} required={true} onChange={(e) => setNombres(e.target.value)}/>
          <InputLabel type="email" placeholder="Ingrese los apellidos" htmlFor="email" label="Apellidos" value={apellidos} required={true} onChange={(e) => setApellidos(e.target.value)}/>
          <div className="col-span-full">
            <InputIconLabel icon={<Mail className="w-5 h-5" />} placeholder="Mail" type="email" htmlFor="email" label="Email" value={correo} required={true} onChange={(e) => setCorreo(e.target.value)}></InputIconLabel>
          </div>
          <InputIconLabel icon={<Phone className="w-5 h-5" />} placeholder="Teléfono" type="tel" htmlFor="tel" label="Teléfono" value={telefono} required={true} onChange={(e) => setTelefono(e.target.value)} ></InputIconLabel>
          <SelectLabel
            htmlFor="sexo"
            label="Sexo"
            options={sexo}
            value={genero}
            required = {true}
            onChange={(value) => setGenero(value)}
            placeholder="Seleccione su género"
          />
          <InputIconLabel icon={<MapPin className="w-5 h-5" />} placeholder="Dirección" type="address" htmlFor="address" label="Dirección" value={direccion} required={true} onChange={(e) => setDireccion(e.target.value)} ></InputIconLabel>
          <InputLabel type="date" placeholder="Ingrese la fecha de nacimiento" htmlFor="date" label="Fecha de nacimiento" value={fechaNacimiento} required={true} onChange={(e) => setFechaNacimiento(e.target.value)}/>
          <SelectLabel
            htmlFor="tipo-documento"
            label="Tipo de Documento de identidad"
            options={tipoDocumentos}
            placeholder="Seleccione el tipo de documento"
            value={tipoDoc}
            required = {true}
            onChange={(value) => setTipoDoc(value)}
          />
          <InputLabel type="email" placeholder="Ingrese el número de documento de identidad" htmlFor="email" label="DNI" value={DNI} required={true} onChange={(e) => setDNI(e.target.value)}/>
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

      <button
        className="mt-8 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded w-max self-end"
        onClick={() => setShowModalLogout(true)}
      >
        Cerrar sesión
      </button>

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
                    navigate("/");
                  }}
                >
                  Confirmar
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>*/}