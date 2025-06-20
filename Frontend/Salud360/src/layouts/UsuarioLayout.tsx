import UsuarioNavbar from "@/components/usuario/UsuarioNavbar";
import { useEffect } from "react";
import { Outlet } from "react-router";

function UsuarioLayout() {
  useEffect(() => {
    window.scrollTo(0, 0); //Para que apenas cargue aparezca en el tope de la página.
  }, []);

  return (
    <div className="max-w-full max-h-full min-h-dvh grid grid-rows-[auto_1fr]">
      <UsuarioNavbar />
      <Outlet />
    </div>
  );
}

export default UsuarioLayout;
