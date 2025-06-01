import { useNavigate } from "react-router";
import axios from "axios";

import useRol from "@/hooks/useRol";
import RolForm from "@/components/admin/roles/RolForm";

function CrearRol() {
  const navigate = useNavigate();

  const { nombre, setNombre } = useRol();

  const handleCrearRol = async () => {
    try {
      await axios.post("http://localhost:8080/api/roles", {
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
