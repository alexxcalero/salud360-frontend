import { useEffect, useState } from "react";
import {
  Phone,
  User,
  MapPin,
  Calendar,
  IdCard,
  ShieldUser,
  Transgender,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import SelectIconLabel from "@/components/SelectIconLabel";
import { useNavigate } from "react-router-dom";
import { register } from "@/services/registerService";
import { useToasts } from "@/hooks/ToastContext";
import { useLoading } from "@/hooks/LoadingContext";
import Input from "./input/Input";
import MailInput from "./input/MailInput";
import PasswordInput from "./input/PasswordInput";
import axios from "axios";
import ModalValidacion from "./ModalValidacion";
import { Link } from "react-router-dom";

import { jwtDecode } from "jwt-decode";
import { enviarNotificacion } from "@/services/notificacionService";
import { baseAPI } from "@/services/baseAPI";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    tipoDocumento: "",
    numeroDocumento: "",
    genero: "",
    fechaNacimiento: "",
    lugarResidencia: "",
    correo: "",
    confirmarCorreo: "",
    contraseña: "",
    confirmarContraseña: "",
    telefono: "",
  });
  const [tipoDocumentos, setTipoDocumentos] = useState([]);

  const [showModalValidacion, setShowModalValidacion] = useState(false);
  const [mensajeValidacion, setMensajeValidacion] = useState("");

  const { setLoading } = useLoading();
  const { createToast } = useToasts();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //VALIDACIONES DE CAMPOS
  const validarCampos = (): boolean => {
    const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    const soloNumeros = /^[0-9]+$/;
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.nombres || !soloLetras.test(formData.nombres)) {
      setMensajeValidacion(
        "Los nombres deben contener solo letras y no estar vacíos."
      );
      return false;
    }

    if (!formData.apellidos || !soloLetras.test(formData.apellidos)) {
      setMensajeValidacion(
        "Los apellidos deben contener solo letras y no estar vacíos."
      );
      return false;
    }

    if (
      !formData.numeroDocumento ||
      !soloNumeros.test(formData.numeroDocumento) ||
      formData.numeroDocumento.length !== 8
    ) {
      setMensajeValidacion(
        "El DNI debe tener exactamente 8 dígitos numéricos."
      );
      return false;
    }

    if (
      !formData.telefono ||
      !soloNumeros.test(formData.telefono) ||
      formData.telefono.length !== 9
    ) {
      setMensajeValidacion(
        "El teléfono debe tener exactamente 9 dígitos numéricos."
      );
      return false;
    }

    if (!formData.correo.trim() || !regexCorreo.test(formData.correo)) {
      setMensajeValidacion("El correo electrónico ingresado no es válido.");
      setShowModalValidacion(true);
      return false;
    }

    if (!formData.lugarResidencia || formData.lugarResidencia.trim() === "") {
      setMensajeValidacion("La dirección no puede estar vacía.");
      return false;
    }

    if (!formData.contraseña || formData.contraseña.trim() === "") {
      setMensajeValidacion("La contraseña no puede estar vacía.");
      return false;
    }
    //rb t
    if (!formData.tipoDocumento || formData.tipoDocumento.trim() === "") {
      setMensajeValidacion("Debe seleccionar un tipo de documento.");
      setShowModalValidacion(true);
      return false;
    }

    if (!formData.genero || formData.genero.trim() === "") {
      setMensajeValidacion("Debe seleccionar un género.");
      setShowModalValidacion(true);
      return false;
    }

    const fechaIngresada = new Date(formData.fechaNacimiento);
    const hoy = new Date();
    if (isNaN(fechaIngresada.getTime()) || fechaIngresada >= hoy) {
      setMensajeValidacion(
        "La fecha de nacimiento debe ser válida y anterior a hoy."
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validarCampos()) {
      setShowModalValidacion(true);
      return;
    }

    if (formData.correo !== formData.confirmarCorreo) {
      createToast("error", {
        title: "Los correos no coinciden",
        description: "",
      });
      return;
    }

    if (formData.contraseña !== formData.confirmarContraseña) {
      createToast("error", {
        title: "Las contraseñas no coinciden",
        description: "",
      });
      return;
    }

    setLoading(true);
    //console.log("Formulario a enviar:", formData);

    // conexión a axios
    try {
      const datosEnvio = {
        nombres: formData.nombres,
        apellidos: formData.apellidos,
        numeroDocumento: formData.numeroDocumento,
        correo: formData.correo,
        contrasenha: formData.contraseña,
        sexo: formData.genero,
        telefono: formData.telefono,
        fechaNacimiento: formData.fechaNacimiento,
        direccion: formData.lugarResidencia,
        tipoDocumento: {
          idTipoDocumento: formData.tipoDocumento,
        },
      };

      const clienteRegistrado = await register(datosEnvio);
      const idCliente = clienteRegistrado.idCliente;

      // ⏩ Notificación después del registro exitoso
      const fechaActual = new Date().toISOString();
      await enviarNotificacion({
        mensaje:
          "Bienvenido a Salud 360. Tu cuenta se ha creado correctamente.",
        fechaEnvio: fechaActual,
        tipo: "CREACIÓN CUENTA - SIN GOOGLE",
        cliente: {
          idCliente: idCliente,
          correo: formData.correo,
          nombres: formData.nombres,
          apellidos: formData.apellidos,
          numeroDocumento: formData.numeroDocumento,
          sexo: formData.genero,
          telefono: formData.telefono,
          fechaNacimiento: formData.fechaNacimiento,
          direccion: formData.lugarResidencia,
          notificacionPorCorreo: true,
          notificacionPorSMS: false,
          notificacionPorWhatsApp: false,
        },
        reserva: null,
      });
      //("✅ Usuario creado");
      //console.log("A punto de navegar a successCrear");
      navigate("/RegistroExitoso", {
        state: { created: true },
      });
    } catch (error) {
      console.error("Error al registrar:", error);
      createToast("error", {
        title: "Ocurrió un error al registrar. Inténtalo nuevamente.",
        description: "",
      });
    } finally {
      setLoading(false);
    }
  };

  //Llamada TipoDocumentos
  const fetchTipoDocumentos = () => {
    baseAPI
      .get("/admin/tiposDocumentos", {
        auth: {
          username: "admin",
          password: "admin123",
        },
      })
      .then((res) => {
        //console.log("Datos cargados:", res.data); // VER ESTO EN LA CONSOLA

        const opciones = res.data.map((tipoDocX: any) => ({
          value: tipoDocX.idTipoDocumento,
          content: tipoDocX.nombre,
        }));

        setTipoDocumentos(opciones);
        //console.log("Tipo Documentos:", opciones);
      })
      .catch((err) => console.error("Error cargando tipo documentos", err));
  };
  useEffect(() => {
    fetchTipoDocumentos();
  }, []);

  const sexo = [
    { value: "Masculino", content: "Masculino" },
    { value: "Femenino", content: "Femenino" },
  ];

  const registerGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      //console.log("👉 tokenResponse:", tokenResponse);

      try {
        const { access_token } = tokenResponse;

        // Obtener datos del perfil desde Google
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );

        const userData = res.data;
        //console.log("✅ Datos de Google:", userData);

        // Completar el formulario con datos obtenidos
        const nuevosDatos = {
          nombres: userData.given_name || "",
          apellidos: userData.family_name || "",
          correo: userData.email || "",
          confirmarCorreo: userData.email || "",
          numeroDocumento: "11111111",
          contraseña: "google123",
          confirmarContraseña: "google123",
          genero: "No especificado",
          telefono: "11111111",
          fechaNacimiento: "2000-01-01",
          lugarResidencia: "No especificado",
          tipoDocumento: "1",
        };

        // Actualizar estado del formulario (visualmente)
        setFormData(nuevosDatos);

        // Enviar datos al backend
        setLoading(true);

        const datosEnvio = {
          nombres: nuevosDatos.nombres,
          apellidos: nuevosDatos.apellidos,
          numeroDocumento: nuevosDatos.numeroDocumento,
          correo: nuevosDatos.correo,
          contrasenha: nuevosDatos.contraseña,
          sexo: nuevosDatos.genero,
          telefono: nuevosDatos.telefono,
          fechaNacimiento: nuevosDatos.fechaNacimiento,
          direccion: nuevosDatos.lugarResidencia,
          tipoDocumento: {
            idTipoDocumento: nuevosDatos.tipoDocumento,
          },
        };

        const clienteRegistrado = await register(datosEnvio);
        const idCliente = clienteRegistrado.idCliente;

        const fechaActual = new Date().toISOString();
        await enviarNotificacion({
          mensaje:
            "Bienvenido a Salud 360. Tu cuenta se ha creado correctamente mediante Google OAuth. Por favor edita tus campos desde tu perfil",
          fechaEnvio: fechaActual,
          tipo: "CREACIÓN CUENTA - CON GOOGLE",
          cliente: {
            idCliente: idCliente,
            correo: datosEnvio.correo,
            nombres: datosEnvio.nombres,
            apellidos: datosEnvio.apellidos,
            numeroDocumento: datosEnvio.numeroDocumento,
            sexo: datosEnvio.sexo,
            telefono: datosEnvio.telefono,
            fechaNacimiento: datosEnvio.fechaNacimiento,
            direccion: datosEnvio.direccion,
            notificacionPorCorreo: true,
            notificacionPorSMS: false,
            notificacionPorWhatsApp: false,
          },
          reserva: null,
        });
        createToast("success", {
          title: "Registro exitoso con Google",
          description: "Redirigiendo...",
        });

        navigate("/RegistroExitoso", {
          state: { created: true },
        });
      } catch (error) {
        console.error("❌ Error en registro con Google:", error);
        createToast("error", {
          title: "Error al registrar con Google",
          description: "Intenta nuevamente.",
        });
      } finally {
        setLoading(false);
      }
    },
    onError: () => {
      console.error("Error al iniciar sesión con Google");
      createToast("error", {
        title: "Fallo en el inicio con Google",
        description: "Intenta otra vez.",
      });
    },
  });

  const navigate = useNavigate();

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            name="nombres"
            label="Nombres"
            placeholder="Nombre"
            leftIcon={<User />}
            required={true}
            defaultValue={formData.nombres}
            onChange={handleChange}
          />
          <Input
            name="apellidos"
            label="Apellidos"
            placeholder="Apellidos"
            leftIcon={<User />}
            required={true}
            defaultValue={formData.apellidos}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            name="fechaNacimiento"
            label="Fecha de Nacimiento"
            type="date"
            leftIcon={<Calendar />}
            required={true}
            defaultValue={formData.fechaNacimiento}
            onChange={handleChange}
          />
          <Input
            name="numeroDocumento"
            label="Número de Documento de Identidad"
            placeholder="72072230"
            leftIcon={<ShieldUser />}
            required={true}
            defaultValue={formData.numeroDocumento}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectIconLabel
            icon={<IdCard className="w-5 h-5" />}
            htmlFor="tipoDocumento"
            label="Tipo de Documento"
            value={formData.tipoDocumento}
            onChange={handleChange}
            required={true}
            options={tipoDocumentos}
          />
          <SelectIconLabel
            icon={<Transgender className="w-5 h-5" />}
            htmlFor="genero"
            label="Género"
            value={formData.genero}
            onChange={handleChange}
            required={true}
            options={sexo}
          />
        </div>

        <Input
          name="telefono"
          label="Teléfono"
          leftIcon={<Phone />}
          defaultValue={formData.telefono}
          onChange={handleChange}
          required={true}
        />

        <Input
          name="lugarResidencia"
          label="Dirección"
          placeholder="Ubicación"
          leftIcon={<MapPin />}
          required={true}
          defaultValue={formData.lugarResidencia}
          onChange={handleChange}
        />

        <MailInput
          name="correo"
          placeholder="example@gmail.com"
          label="Correo electrónico"
          defaultValue={formData.correo}
          onChange={handleChange}
          required={true}
        />
        <MailInput
          name="confirmarCorreo"
          placeholder="example@gmail.com"
          label="Confirmar correo electrónico"
          defaultValue={formData.confirmarCorreo}
          onChange={handleChange}
          required={true}
        />

        <PasswordInput
          name="contraseña"
          placeholder="***********"
          label="Contraseña"
          defaultValue={formData.contraseña}
          onChange={handleChange}
          required={true}
        />
        <PasswordInput
          name="confirmarContraseña"
          placeholder="***********"
          label="Confirmar contraseña"
          defaultValue={formData.contraseña}
          onChange={handleChange}
          required={true}
        />

        <div className="text-sm">
          <span>¿Ya tienes una cuenta?</span>{" "}
          <Link to={`/IniciarSesionUsuario`}>
            <span className="text-blue-500 hover:underline">
              Inicia sesión aquí
            </span>
          </Link>
        </div>

        <Button type="submit" className="w-full mt-4">
          Registrarse
        </Button>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            ¿Prefieres usar tu cuenta de Google?
          </p>
          <button
            type="button"
            onClick={() => registerGoogle()}
            className="w-full mt-2 flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 hover:bg-gray-100 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="24"
              height="24"
              viewBox="0 0 48 48"
            >
              <path
                fill="#fbc02d"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path
                fill="#e53935"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>
              <path
                fill="#4caf50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              ></path>
              <path
                fill="#1565c0"
                d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
            </svg>
            <span className="text-sm font-medium text-gray-700">
              Registrarse con Google
            </span>
          </button>
        </div>
      </form>

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
