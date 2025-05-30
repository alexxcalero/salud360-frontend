import UsuarioNavbar from "@/components/usuario/UsuarioNavbar";
import { useEffect } from "react";
import { Outlet } from "react-router";

function UsuarioLayout(){

    useEffect(() => {
            window.scrollTo(0, 0); //Para que apenas cargue aparezca en el tope de la página.
    }, []);

    return (
        <div className="min-w-[100dvw] min-h-[100dvh]">
            <UsuarioNavbar/>
            <div className="mt-18"></div>
            <Outlet/>
        </div>
    )
}

export default UsuarioLayout;