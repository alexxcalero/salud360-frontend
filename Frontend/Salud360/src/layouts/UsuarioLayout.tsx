import UsuarioNavbar from "@/components/usuario/UsuarioNavbar";
import { Outlet } from "react-router";

function UsuarioLayout(){
    return (
        <div className="min-w-[100dvw] min-h-[100dvh]">
            <UsuarioNavbar/>
            <div className="mt-18"></div>
            <Outlet/>
        </div>
    )
}

export default UsuarioLayout;