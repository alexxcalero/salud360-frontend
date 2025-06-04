import { AuthContext } from "@/hooks/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router";

interface Props {
    children: React.ReactNode,
    allowedRules: number[]
}

function ProtectedRoute({children, allowedRules}: Props){
    return <>{children}</>; // Recordar que esto es un hack
    const {usuario} = useContext(AuthContext);

    if (!usuario) return <Navigate to="/"/> //Si no hay usuario en sesión

    const userRol = usuario.rol?.idRol;

    if (!allowedRules.includes(userRol)){ //Si hay usuario en sesión pero sin permisos de acceso.
        return <Navigate to="/"/>
    }

    return <>{children}</>;

}

export default ProtectedRoute;