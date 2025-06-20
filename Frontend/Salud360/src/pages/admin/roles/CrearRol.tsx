import { useNavigate } from "react-router";

import useRol from "@/hooks/useRol";
import RolForm from "@/components/admin/roles/RolForm";
import { baseAPI } from "@/services/baseAPI";

function CrearRol() {
  const navigate = useNavigate();

  const { nombre, setNombre } = useRol();

  const handleCrearRol = async () => {
    try {
      await baseAPI.post("/roles", {
        nombre
      }, {
        auth: { username: "admin", password: "admin123" }
      });

      alert("Rol creado exitosamente");
      navigate("/admin/roles");

    } catch (err) {
      console.error("Error al crear rol:", err);
      alert("Hubo un error al crear el rol");
    }
  };

  return (
    <div className="w-full px-10 py-8 text-left">
      <RolForm
        nombre={nombre}
        setNombre={setNombre}
        onSubmit={handleCrearRol}
        buttonText="Registrar rol"
      />
    </div>
  );
}

export default CrearRol;
