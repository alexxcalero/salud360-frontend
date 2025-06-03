import ModalExito from "@/components/ModalExito";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";

interface Props{
    modulo: string;
    detalle: string;
    route?: string;
}

function UsuarioSuccess({modulo, detalle, route= "/admin/usuarios"}: Props){
    
    const location = useLocation();
    const navigate = useNavigate();

    //console.log("DESDE USUARIO SUCCESS, NO USE EFFECT EL VALOR DE LOCATION.state ES:", location.state)
    //console.log("DESDE USUARIO SUCCESS, NO USE EFFECT EL VALOR DE LOCATION.state.created ES:", location.state?.created)

    useEffect(() => {

        //console.log("DESDE USUARIO SUCCESS, EL VALOR DE LOCATION.state ES:", location.state)
        //console.log("DESDE USUARIO SUCCESS, EL VALOR DE LOCATION.state.created ES:", location.state?.created)

        if (location.state === undefined) return;

        if (!location.state?.created) {
            navigate(route); // Redirige si no vino del flujo correcto
        }
    }, [location]);

    return(
        <div className="w-full flex flex-row justify-center items-center">
            <ModalExito modulo={modulo} detalle={detalle} onConfirm={() => {
                navigate(route, { replace: true });
            }}/>
        </div>
        
    );
}

export default UsuarioSuccess