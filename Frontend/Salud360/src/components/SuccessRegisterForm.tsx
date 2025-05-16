import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import registroExitosoImg from "@/assets/registroExitoso.png"

export default function SuccessRegisterForm() {
  const navigate = useNavigate()

  return (
    <div className="bg-white shadow-md rounded-lg p-10 max-w-3xl w-full text-center">
      <h1 className="text-4xl font-bold text-black mb-3">¡Felicidades!</h1>
      <p className="text-xl text-black font-medium mb-6">Su cuenta fue creada</p>
      <img
        src={registroExitosoImg}
        alt="Registro exitoso"
        className="w-90 h-90 mx-auto mb-8"
      />
      <p className="text-black font-medium mb-8">
        Por favor, verifique su cuenta con el link enviado a su correo electrónico
      </p>
      <Button
        className="w-full"
        onClick={() => navigate("/IniciarSesionUsuario")}
      >
        Iniciar Sesión
      </Button>
    </div>
  )
}
