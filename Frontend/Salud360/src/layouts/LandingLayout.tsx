
import LandingFooter from "@/components/landing/LandingFooter";
import LandingNavbar from "@/components/landing/LandingNavbar";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { Outlet } from "react-router";

function LandingLayout(){

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
    if (location.hash) {
      // Esperamos un poco para asegurarnos que el DOM está montado
      setTimeout(() => {
        const element = document.getElementById(location.hash.slice(1));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        } else {
          // Si el elemento no existe, limpiamos el hash pero no forzamos scroll
          navigate(location.pathname, { replace: true });
        }
      }, 100); // 100ms es suficiente en la mayoría de casos
    }}, [location]);

    useEffect(() => {
    if (location.hash) {
        // Reemplaza la URL actual sin el hash
        window.history.replaceState(null, "", location.pathname);
    }
    }, []);


    return (
        <div className="max-w-full max-h-full">
            <LandingNavbar/>
            <Outlet/>
            <LandingFooter/>
        </div>
    )
}

export default LandingLayout;