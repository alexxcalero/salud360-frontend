import { useEffect, useState } from "react";
import { useParams } from "react-router";

import useRol from "@/hooks/useRol";
import RolForm from "@/components/admin/roles/RolForm";
import { baseAPI } from "@/services/baseAPI";

function DetalleRol() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const {
    nombre, setNombre,
    usuariosAsignados, setUsuariosAsignados,
    fechaCreacion, setFechaCreacion
  } = useRol();

  useEffect(() => {
    baseAPI.get(`/roles/${id}`, {
      auth: { username: "admin", password: "admin123" }
    })
      .then(res => {
        const rol = res.data;
        setNombre(rol.nombre);
        setUsuariosAsignados(rol.usuariosAsignados);
        setFechaCreacion(rol.fechaCreacion);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error cargando los datos del rol", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="p-6">Cargando rol...</p>;

  return (
    <div className="w-full px-10 py-8 text-left">
      <RolForm
        nombre={nombre}
        setNombre={setNombre}
        usuariosAsignados={usuariosAsignados}
        fechaCreacion={fechaCreacion}
        readOnly={true}
      />
    </div>
  );
}

export default DetalleRol;