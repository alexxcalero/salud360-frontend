import { useContext, useState } from "react"
import { Button } from "@/components/ui/button"
import { useGoogleLogin } from "@react-oauth/google"
import { Link } from "react-router"
import { useNavigate } from "react-router-dom"
import { login as loginRequest } from "@/services/authService"
import { authGoogleService } from "@/services/authGoogleService"
import { AuthContext } from "@/hooks/AuthContext"
import MailInput from "./input/MailInput"
import PasswordInput from "./input/PasswordInput"
import { useLoading } from "@/hooks/LoadingContext"
import { useToasts } from "@/hooks/ToastContext"
import axios from "axios"

export default function LoginForm() {
  const [formData, setFormData] = useState({
    correo: "",
    contraseña: ""
  })
  const {setLoading} = useLoading();
  const {createToast} = useToasts();

  const { login: loginContext } = useContext(AuthContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Datos enviados:", formData)
    // Aquí puedes hacer una petición con Axios al backend
    setLoading(true)
    await new Promise<string>((res) => setTimeout(() => res(""), 3000))

    try {
      const response = await loginRequest(formData.correo, formData.contraseña);
      console.log("El response del inicio de sesión es:", response)
      console.log("El token de response es:", response.token)

      var usuario = response.usuario;

      let activeUser = null

      if (usuario.cliente){
        activeUser = usuario.cliente
      }
      else if (usuario.administrador){
        activeUser = usuario.administrador
      }

      console.log("******activeUser contiene:", activeUser)

      //var activeUser = response.usuario;
      var token = response.token;
      var idRol = activeUser.rol?.idRol;

      loginContext(activeUser, token)

      console.log("el idRol es:", idRol)

      setLoading(false)
      switch(idRol){
        case 1: //Admin
          navigate("/admin");
          console.log("HOLA");
          break;
        case 2: //Cliente Visitante
          navigate("/usuario")
          break;
        case 3: //Cliente Miembro
          navigate("/usuario")
          break;
        default:
          navigate("/")
      }

    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNABORTED') {
          createToast("error", {
            id: 1,
            title: "Error: Conexión agotada (timeout)",
            description: ""
          })
        } else if (!error.response) {
          createToast("error", {
            id: 1,
            title: "Error: No se pudo conectar al servidor",
            description: ""
          })
        } else {
          createToast("error", {
            id: 1,
            title: 'Error de respuesta:' + error.response.status + error.response.data,
            description: ""
          })
        }
      }
      else if (error.response && error.response.status === 401) {
        createToast("error", {
          id: 1,
          title: "Correo o contraseña incorrectos",
          description: ""
        })
        // alert("Correo o contraseña incorrectos.");
        setFormData({ correo: "", contraseña: "" })
      } else {
        createToast("error", {
          id: 1,
          title: "Error al iniciar sesión",
          description: ""
        })
        console.error("Error al iniciar sesión:", error);
        // alert("Error al iniciar sesión.");
        setFormData({ correo: "", contraseña: "" })
      }
    } finally {
      setLoading(false)
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
      <MailInput name="correo" required={true} label="Correo electrónico" value={formData.correo} onChange={handleChange}/>
      <PasswordInput name="contraseña" required={true} showRecommendations={false} value={formData.contraseña} onChange={handleChange}/>
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
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
            <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
          </svg>
          <span className="text-sm font-medium text-gray-700">Iniciar Sesión con Google</span>
        </button>
      </div>
    </form>
  )
}
