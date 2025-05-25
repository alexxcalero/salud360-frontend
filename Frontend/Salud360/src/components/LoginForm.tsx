import { useContext, useState } from "react"
import { Mail, Lock, ShieldCheck} from "lucide-react"
import { Button } from "@/components/ui/button"
import InputIconLabelEdit from "@/components/InputIconLabelEdit"
import { useGoogleLogin } from "@react-oauth/google"
import { Link } from "react-router"
import { useNavigate } from "react-router-dom"
import { login as loginRequest } from "@/services/authService"
import { authGoogleService } from "@/services/authGoogleService"
import { AuthContext } from "@/hooks/AuthContext"

export default function LoginForm() {
  const [formData, setFormData] = useState({
    correo: "",
    contraseña: ""
  })

  const { login: loginContext } = useContext(AuthContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Datos enviados:", formData)
    // Aquí puedes hacer una petición con Axios al backend


    try {
      const response = await loginRequest(formData.correo, formData.contraseña);
      console.log("El response es:", response)
      console.log("El token de response es:", response.token)


      var activeUser = response.usuario;
      var token = response.token;
      var idRol = activeUser.rol?.idRol;

      loginContext(activeUser, token)

      console.log("el idRol es:", idRol)

      switch(idRol){
        case 1: //Admin
          navigate("/admin");
          console.log("HOLA");
          break;
        case 2:
          alert("MEDICO")
          break;
        case 3:
          navigate("/usuario")
          break;
        case 4:
          navigate("/usuario")
          break;
        default:
          navigate("/")
      }

    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        alert("Correo o contraseña incorrectos.");
        setFormData({ correo: "", contraseña: "" })
      } else {
        console.error("Error al iniciar sesión:", error);
        alert("Error al iniciar sesión.");
        setFormData({ correo: "", contraseña: "" })
      }
    }

  }

  //Uso de Google OAuth
  const loginGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("Login con Google OK:", tokenResponse)
      try {
        const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });

        const profile = await res.json();
        console.log("Perfil de Google:", profile);
        const correo = profile.email;

        const result = await authGoogleService(correo);
        // Validación de cuenta opcional
        if (!result.verificado) {
          alert("Tu cuenta aún no ha sido verificada.");
          return;
        }
        localStorage.setItem("authToken", tokenResponse.access_token);
        navigate("/");
      } catch (error) {
        console.error("Error procesando login con Google:", error);
        alert("No pudimos completar el inicio de sesión con Google.");
      } 
    }
  })
  
  const navigate = useNavigate()

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputIconLabelEdit
        icon={<Mail className="w-5 h-5" />}
        type="email"
        placeholder="fabian@pucp.edu.pe"
        htmlFor="correo"
        label="Correo electrónico *"
        value={formData.correo}
        onChange={handleChange}
      />
      <InputIconLabelEdit
        icon={<Lock className="w-5 h-5" />}
        type="password"
        placeholder="********"
        htmlFor="contraseña"
        label="Contraseña *"
        value={formData.contraseña}
        onChange={handleChange}
      />
      <div className="text-sm">
        ¿No tienes una cuenta?{" "}
        <Link to="/RegistroUsuario" className="text-[#1E88E5] hover:underline">
          Regístrate aquí
        </Link>
      </div>

      <Button type="submit" className="w-full mt-4">
        Iniciar Sesión
      </Button>

      <div className="text-center mt-4">
        <p className="text-sm text-gray-500">¿Prefieres usar tu cuenta de Google?</p>
        <button
          type="button"
          onClick={() => loginGoogle()}
          className="w-full mt-2 flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 hover:bg-gray-100 transition"
        >
          <ShieldCheck className="w-5 h-5 text-blue-500" />
          <span className="text-sm font-medium text-gray-700">Iniciar Sesión con Google</span>
        </button>
      </div>
    </form>
  )
}
