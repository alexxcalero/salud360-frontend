//import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import registroExitosoImg from "@/assets/registroExitoso.png"
import Button from "./Button"

export default function SuccessRegisterForm() {
  const navigate = useNavigate()

  return (
    <div className="bg-white shadow-md rounded-lg p-10 max-w-3xl w-full text-center">
      <h1 className="text-4xl font-bold text-black mb-3">¡Felicidades!</h1>
      <p className="text-xl text-black font-medium mb-6">Su cuenta ha sido registrada exitosamente.</p>
      <img
        src={registroExitosoImg}
        alt="Registro exitoso"
        className="w-90 h-90 mx-auto mb-8"
      />
      {/*<p className="text-black font-medium mb-8">
        Por favor, verifique su cuenta con el link enviado a su correo electrónico
      </p>*/}

      <p className="text-black font-medium mb-8">
        Por favor, inicie sesión para comenzar.
      </p>

      <div className="flex flex-col gap-4 px-8">
        <Button variant="primary" size="lg" onClick={() => navigate("/IniciarSesionUsuario")}>Iniciar Sesión</Button>
        <Button variant="white" size="lg" onClick={() => navigate("/")}>Menú principal</Button>
      </div>

      

      {/*<Button
        className="w-full"
        onClick={() => navigate("/IniciarSesionUsuario")}
      >
        Iniciar Sesión
      </Button>*/}
    </div>
  )
}
