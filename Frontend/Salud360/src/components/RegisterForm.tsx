import { useState } from "react"
import { Mail, Lock, Phone, User, MapPin, Calendar, IdCard, ShieldUser } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useGoogleLogin } from "@react-oauth/google"
import SelectIconLabel from "@/components/SelectIconLabel"
import InputIconLabelEdit from "./InputIconLabelEdit"
import { useNavigate } from "react-router-dom"
import { register } from "@/services/registerService"


export default function RegisterForm() {
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    tipoDocumento: "",
    numeroDocumento: "",
    fechaNacimiento: "",
    lugarResidencia: "",
    correo: "",
    confirmarCorreo: "",
    contraseña: "",
    confirmarContraseña: "",
    telefono: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData)

    if (formData.correo !== formData.confirmarCorreo) {
      alert("Los correos no coinciden.");
      return;
    }

    if (formData.contraseña !== formData.confirmarContraseña) {
      alert("Las contraseñas no coinciden.");
      return;
    }
    // conexio a axios
    try {
      const datosEnvio = {
        nombres: formData.nombres,
        apellidos: formData.apellidos,
        tipoDocumento: formData.tipoDocumento,
        numeroDocumento: formData.numeroDocumento,
        fechaNacimiento: formData.fechaNacimiento,
        lugarResidencia: formData.lugarResidencia,
        correo: formData.correo,
        contraseña: formData.contraseña,
        telefono: formData.telefono,
      };

      await register(datosEnvio);

      navigate("/RegistroExitoso");
    } catch (error) {
      console.error("Error al registrar:", error);
      alert("Ocurrió un error al registrar. Inténtalo nuevamente.");
    }
  };

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
        <InputIconLabelEdit
          icon={<User className="w-5 h-5" />}
          placeholder="Nombre"
          htmlFor="nombres"
          label="Nombres *"
          value={formData.nombres}
          onChange={handleChange}
        />
        <InputIconLabelEdit
          icon={<User className="w-5 h-5" />}
          placeholder="Apellidos"
          htmlFor="apellidos"
          label="Apellidos *"
          value={formData.apellidos}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <SelectIconLabel
            icon={<IdCard className="w-5 h-5" />}
            htmlFor="tipoDocumento"
            label="Tipo de documento de identidad *"
            value={formData.tipoDocumento}
            onChange={handleChange}
            options={[
              { value: "", label: "Escoje una opción" },
              { value: "DNI", label: "DNI" },
              { value: "CE", label: "Carné de extranjería" },
            ]}
          />
        </div>
        <InputIconLabelEdit
          icon={<ShieldUser className="w-5 h-5" />}
          placeholder="72072230"
          htmlFor="numeroDocumento"
          label="Número de documento de identidad *"
          value={formData.numeroDocumento}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputIconLabelEdit
          icon={<Calendar className="w-5 h-5" />}
          type="date"
          htmlFor="fechaNacimiento"
          label="Fecha de nacimiento *"
          value={formData.fechaNacimiento}
          onChange={handleChange}
        />
        <InputIconLabelEdit
          icon={<MapPin className="w-5 h-5" />}
          placeholder="Ubicación"
          htmlFor="lugarResidencia"
          label="Lugar de residencia *"
          value={formData.lugarResidencia}
          onChange={handleChange}
        />
      </div>

      <InputIconLabelEdit
        icon={<Mail className="w-5 h-5" />}
        type="email"
        placeholder="example@email.com"
        htmlFor="correo"
        label="Correo electrónico *"
        value={formData.correo}
        onChange={handleChange}
      />
      <InputIconLabelEdit
        icon={<Mail className="w-5 h-5" />}
        type="email"
        placeholder="example@email.com"
        htmlFor="confirmarCorreo"
        label="Confirmar correo electrónico *"
        value={formData.confirmarCorreo}
        onChange={handleChange}
      />

      <InputIconLabelEdit
        icon={<Lock className="w-5 h-5" />}
        type="password"
        placeholder="***********"
        htmlFor="contraseña"
        label="Contraseña *"
        value={formData.contraseña}
        onChange={handleChange}
      />
      <InputIconLabelEdit
        icon={<Lock className="w-5 h-5" />}
        type="password"
        placeholder="***********"
        htmlFor="confirmarContraseña"
        label="Confirmar contraseña *"
        value={formData.confirmarContraseña}
        onChange={handleChange}
      />

      <InputIconLabelEdit
        icon={<Phone className="w-5 h-5" />}
        placeholder="999999999"
        htmlFor="telefono"
        label="Teléfono *"
        value={formData.telefono}
        onChange={handleChange}
      />
      <Button type="submit" className="w-full mt-4" onClick={() => navigate("/RegistroExitoso")}>
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
