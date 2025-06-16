import { useContext, useEffect } from "react";
import LoginForm from "@/components/LoginForm";
import { AuthContext } from "@/hooks/AuthContext";
import { Navigate } from "react-router";
import CardMembresiaAdvertencia from "@/components/usuario/membresia/CardMembresiaAdvertencia";

export default function LoginPage() {
  const { usuario } = useContext(AuthContext);

  if (usuario) {
    // Redirigir según el rol
    const rol = usuario.rol?.idRol;
    if (rol === 1) return <Navigate to="/admin" />;
    else return <Navigate to="/usuario" />;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-left ">INICIAR SESIÓN</h1>
        <CardMembresiaAdvertencia />{" "}
        {/* Esto solo muestra algo si hay una membresia pendiente */}
        <LoginForm />
      </div>
    </div>
  );
}
