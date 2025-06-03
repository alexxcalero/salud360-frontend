import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";

import useComunidadForm from "@/hooks/useComunidadForm";
import ComunidadForm from "@/components/admin/comunidades/ComunidadForm";

function EditarComunidad() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    nombre, setNombre,
    descripcion, setDescripcion,
    proposito, setProposito,
    servicios, setServicios
  } = useComunidadForm();

  const [membresias, setMembresias] = useState<any[]>([]);
  const [membresiasSeleccionadas, setMembresiasSeleccionadas] = useState<number[]>([]);
  const [locales, setLocales] = useState<any[]>([]);
  const [localesSeleccionados, setLocalesSeleccionados] = useState<number[]>([]);
  const [serviciosDisponibles, setServiciosDisponibles] = useState<any[]>([]);
  const [nuevasMembresias, setNuevasMembresias] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [comunidadRes, serviciosRes, membresiasRes, localesRes] = await Promise.all([
          axios.get(`http://localhost:8080/api/comunidades/${id}`, {
            auth: { username: "admin", password: "admin123" }
          }),
          axios.get("http://localhost:8080/api/servicios", {
            auth: { username: "admin", password: "admin123" }
          }),
          axios.get("http://localhost:8080/api/membresias", {
            auth: { username: "admin", password: "admin123" }
          }),
          axios.get("http://localhost:8080/api/locales", {
            auth: { username: "admin", password: "admin123" }
          })
        ]);

        const comunidad = comunidadRes.data;

        setNombre(comunidad.nombre);
        setDescripcion(comunidad.descripcion);
        setProposito(comunidad.proposito);
        setServicios(comunidad.servicios.map((s: any) => s.idServicio));
        setMembresiasSeleccionadas(comunidad.membresias?.map((m: any) => m.idMembresia));
        setLocalesSeleccionados(comunidad.locales?.map((l: any) => l.idLocal));
        setNuevasMembresias(comunidad.membresias || []);

        setServiciosDisponibles(serviciosRes.data);
        setMembresias(membresiasRes.data);
        setLocales(localesRes.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar datos de comunidad:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleEditarComunidad = async () => {
    try {
      const payload = {
        nombre,
        descripcion,
        proposito,
        idServicios: servicios,
        idMembresias: membresiasSeleccionadas,
        idLocales: localesSeleccionados,
        membresias: nuevasMembresias
      };

      const response = await axios.put(`http://localhost:8080/api/comunidades/${id}`, payload, {
        auth: {
          username: "admin",
          password: "admin123"
        },
        headers: {
          "Content-Type": "application/json"
        }
      });

      console.log("✅ Comunidad actualizada:", response.data);
      navigate("/admin/comunidades/successEditar");

    } catch (error) {
      console.error("❌ Error al editar comunidad:", error);
      alert("Hubo un error al editar la comunidad");
    }
  };

  if (loading) return <p className="p-6">Cargando comunidad...</p>;

  return (
    <div className="w-full px-10 py-8 text-left">
      <ComunidadForm
        title="Editar Comunidad"
        subtitle="Modifique los datos de la comunidad."
        nombre={nombre}
        setNombre={setNombre}
        descripcion={descripcion}
        setDescripcion={setDescripcion}
        proposito={proposito}
        setProposito={setProposito}
        serviciosDisponibles={serviciosDisponibles}
        serviciosSeleccionados={servicios}
        setServiciosSeleccionados={setServicios}
        membresiasDisponibles={membresias}
        membresiasSeleccionadas={membresiasSeleccionadas}
        setMembresiasSeleccionadas={setMembresiasSeleccionadas}
        nuevasMembresias={nuevasMembresias}
        setNuevasMembresias={setNuevasMembresias}
        localesDisponibles={locales}
        localesSeleccionados={localesSeleccionados}
        setLocalesSeleccionados={setLocalesSeleccionados}
        imagen={null}
        setImagen={() => {}}
        onSubmit={handleEditarComunidad}
        buttonText="Guardar cambios"
      />
    </div>
  );
}

export default EditarComunidad;