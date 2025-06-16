import { AuthContext } from "@/hooks/AuthContext";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import Spinner from "./Spinner";

function ProtectedAuthRoute() {
  const { usuario, loading } = useContext(AuthContext);

  if (loading)
    return (
      <div className="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center">
        <Spinner />
      </div>
    );

  if (!usuario) return <Outlet />; //Si no hay usuario en sesión

  const userRol = usuario.rol?.idRol;

  if ([1].includes(userRol)) {
    //Si hay usuario en sesión pero sin permisos de acceso.
    return <Navigate to="/admin" />;
  }
  if ([2, 3].includes(userRol)) {
    //Si hay usuario en sesión pero sin permisos de acceso.
    return <Navigate to="/usuario" />;
  }

  return <Navigate to="/" />;
}

export default ProtectedAuthRoute;
