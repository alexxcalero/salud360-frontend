import { useEffect } from "react"
import SuccessRegisterForm from "@/components/SuccessRegisterForm"
import { useLocation, useNavigate } from "react-router";

export default function SuccessRegisterPage() {
  const location = useLocation();
  const navigate = useNavigate();

  //console.log("DESDE USUARIO SUCCESS, NO USE EFFECT EL VALOR DE LOCATION.state ES:", location.state)
  //console.log("DESDE USUARIO SUCCESS, NO USE EFFECT EL VALOR DE LOCATION.state.created ES:", location.state?.created)

  useEffect(() => {
    // Redirección si se accede directamente
    if (location.state === undefined) return;

    if (!location.state?.created) {
        navigate("/"); // Redirige si no vino del flujo correcto
    }

    // Scroll al top si entra correctamente
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <title>Cuenta creada</title>
      < SuccessRegisterForm/>        
    </div>
  )
}