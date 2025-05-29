import ConfigUsuarioSideBar from "@/components/usuario/config/ConfigUsuarioSidebar";
import { useEffect } from "react";
import { Outlet } from "react-router";

function UsuarioConfigLayout() {

  useEffect(() => {
              window.scrollTo(0, 0); //Para que apenas cargue aparezca en el tope de la página.
  }, []);

  return (
    <div className="w-full min-h-full grid grid-cols-[max-content_1fr]">
      <div className="row-start-1 row-end-2 col-start-2 col-end-3">
        <Outlet />
      </div>
      <div className="row-start-1 row-end-2 col-start-1 col-end-2 bg-blue-400">
        <ConfigUsuarioSideBar />
      </div>
    </div>
  );
}

export default UsuarioConfigLayout;
