import { Navigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/hooks/AuthContext";
import { baseAPI } from "@/services/baseAPI";


export const ComunidadProtectedRoute = ({ children }: any) => {
  const { id } = useParams(); // este es el idComunidad
  const { usuario } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [autorizado, setAutorizado] = useState(false);

  useEffect(() => {
    const verificarAfiliacion = async () => {
      try {
        const res = await baseAPI.get(`/cliente/${usuario.idCliente}/afiliaciones-cliente`, {
          auth: {
            username: "admin",
            password: "admin123",
          },
        });

        const tieneAfiliacionActiva = res.data.some((afiliacion: any) =>
          afiliacion.comunidad.idComunidad === parseInt(id!) &&
          afiliacion.estado.toLowerCase() === "activado"
        );

        setAutorizado(tieneAfiliacionActiva);
      } catch (error) {
        console.error("Error al verificar afiliación:", error);
      } finally {
        setLoading(false);
      }
    };

    verificarAfiliacion();
  }, [id, usuario]);

  if (loading) return <div>Cargando...</div>;

  return autorizado ? children : <Navigate to="/usuario/comunidades" replace />;
};
