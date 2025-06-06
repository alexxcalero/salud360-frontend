import { useEffect, useState } from "react"
import { Phone, User, MapPin, Calendar, IdCard, ShieldUser, Transgender } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useGoogleLogin } from "@react-oauth/google"
import SelectIconLabel from "@/components/SelectIconLabel"
import { useNavigate } from "react-router-dom"
import { register } from "@/services/registerService"
import { useToasts } from "@/hooks/ToastContext"
import { useLoading } from "@/hooks/LoadingContext"
import Input from "./input/Input"
import MailInput from "./input/MailInput"
import PasswordInput from "./input/PasswordInput"
import axios from "axios"
import { FaGenderless } from "react-icons/fa"


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
  })
  const [tipoDocumentos, setTipoDocumentos] = useState([]);
  const {setLoading} = useLoading();
  const {createToast} = useToasts();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    console.log("Formulario enviado:", formData)

    if (formData.correo !== formData.confirmarCorreo) {
      createToast("error", {
        title: "Los correos no coinciden",
        description: ""
      })
      return;
    }

    if (formData.contraseña !== formData.confirmarContraseña) {
      createToast("error", {
        title: "Las contraseñas no coinciden",
        description: ""
      })
      return;
    }
    // conexio a axios
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
          idTipoDocumento: formData.tipoDocumento
        },
        
      };

      await register(datosEnvio);

      setLoading(false);
      console.log("✅ Usuario creado");
      console.log("A punto de navegar a successCrear");
      navigate("/RegistroExitoso", {
        state: { created: true },
      });
    } catch (error) {
      console.error("Error al registrar:", error);
      createToast("error", {
        title: "Ocurrió un error al registrar. Inténtalo nuevamente.",
        description: ""
      })
    } finally {
      setLoading(false)
    }
  };

  //Llamada TipoDocumentos
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
            value: tipoDocX.idTipoDocumento,
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


  const sexo = [
    { value: "Masculino", content: "Masculino" },
    { value: "Femenino", content: "Femenino" }
  ]

  //Uso de Google OAuth
  const registerGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("Registro con Google OK:", tokenResponse)
      // Aquí debemos jwtDecode para extraer el token que envia google
    },
    onError: () => {
      console.error("Error al registrarse con Google")
    }
  })

  const navigate = useNavigate()
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input name="nombres" label="Nombres" placeholder="Nombre" leftIcon={<User />} required={true} defaultValue={formData.nombres} onChange={handleChange}/>
        <Input name="apellidos" label="Apellidos" placeholder="Apellidos" leftIcon={<User />} required={true} defaultValue={formData.apellidos} onChange={handleChange}/>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input name="fechaNacimiento" label="Fecha de nacimiento" type="date" leftIcon={<Calendar />} required={true} defaultValue={formData.fechaNacimiento} onChange={handleChange}/>
        <Input name="numeroDocumento" label="Número de documento de identidad" placeholder="72072230" leftIcon={<ShieldUser />} required={true} defaultValue={formData.numeroDocumento} onChange={handleChange}/>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectIconLabel icon={<IdCard className="w-5 h-5" />} htmlFor="tipoDocumento" label="Tipo de Documento" value={formData.tipoDocumento} onChange={handleChange} required={true} options={tipoDocumentos}/>
        <SelectIconLabel icon={<Transgender className="w-5 h-5" />} htmlFor="genero" label="Género" value={formData.genero} onChange={handleChange} required={true} options={sexo}/>
      </div>

      <Input name="telefono" label="Teléfono" leftIcon={<Phone />} defaultValue={formData.telefono} onChange={handleChange} required={true} />

      <Input name="lugarResidencia" label="Lugar de residencia" placeholder="Ubicación" leftIcon={<MapPin />} required={true} defaultValue={formData.lugarResidencia} onChange={handleChange}/>
      

      <MailInput name="correo" placeholder="example@gmail.com" label="Correo electrónico"  defaultValue={formData.correo} onChange={handleChange} required={true}/>
      <MailInput name="confirmarCorreo" placeholder="example@gmail.com" label="Confirmar correo electrónico"  defaultValue={formData.confirmarCorreo} onChange={handleChange} required={true}/>

      <PasswordInput name="contraseña" placeholder="***********" label="Contraseña" defaultValue={formData.contraseña} onChange={handleChange} required={true} />
      <PasswordInput name="confirmarContraseña" placeholder="***********" label="Confirmar contraseña" defaultValue={formData.contraseña} onChange={handleChange} required={true} />

      <Button type="submit" className="w-full mt-4">
        Registrarse
      </Button>
      <div className="text-center mt-4">
        <p className="text-sm text-gray-500">¿Prefieres usar tu cuenta de Google?</p>
        <button
          type="button"
          onClick={() => registerGoogle()}
          className="w-full mt-2 flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 hover:bg-gray-100 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
            <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
          </svg>
          <span className="text-sm font-medium text-gray-700">Registrarse con Google</span>
        </button>
      </div>

    </form>  
  )
}
