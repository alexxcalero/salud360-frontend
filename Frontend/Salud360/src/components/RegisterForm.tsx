import { useState } from "react"
import { Mail, Lock, Phone, User, MapPin, Calendar, ShieldCheck, IdCard, ShieldUser } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useGoogleLogin } from "@react-oauth/google"
import SelectIconLabel from "@/components/SelectIconLabel"
import InputIconLabelEdit from "./InputIconLabelEdit"
import { useNavigate } from "react-router-dom"
import { register } from "@/services/registerService";


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
          <ShieldCheck className="w-5 h-5 text-blue-500" />
          <span className="text-sm font-medium text-gray-700">Registrarse con Google</span>
        </button>
      </div>

    </form>  
  )
}
