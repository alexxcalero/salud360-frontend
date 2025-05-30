import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";

import useRol from "@/hooks/useRol";
import RolForm from "@/components/admin/roles/RolForm";

function EditarRol() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { nombre, setNombre } = useRol();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/roles/${id}`, {
      auth: { username: "admin", password: "admin123" }
    })
      .then(res => {
        const rol = res.data;
        setNombre(rol.nombre);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error cargando rol", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="p-6">Cargando rol...</p>;

  const handleEditarRol = async () => {
    try {
      await axios.patch(`http://localhost:8080/api/roles/${id}`, { nombre }, {
        auth: { username: "admin", password: "admin123" }
      });

      alert("Rol actualizado exitosamente");
      navigate("/admin/roles");

    } catch (err) {
      console.error("Error al editar rol:", err);
      alert("Hubo un error al editar el rol");
    }
  };

  return (
    <div className="w-full px-10 py-8 text-left">
      <RolForm
        nombre={nombre}
        setNombre={setNombre}
        onSubmit={handleEditarRol}
        buttonText="Guardar cambios"
      />
    </div>
  );
}

export default EditarRol;
