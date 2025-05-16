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
  const [imagen, setImagen] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cargar combos
    axios.get("http://localhost:8080/api/servicios", { auth: { username: "admin", password: "admin123" } })
      .then(res => setServiciosDisponibles(res.data));
    axios.get("http://localhost:8080/api/membresias", { auth: { username: "admin", password: "admin123" } })
      .then(res => setMembresias(res.data));
    axios.get("http://localhost:8080/api/locales", { auth: { username: "admin", password: "admin123" } })
      .then(res => setLocales(res.data));

    // Cargar datos de comunidad
    axios.get(`http://localhost:8080/api/comunidades/${id}`, {
      auth: { username: "admin", password: "admin123" }
    })
      .then(res => {
        const comunidad = res.data;
        setNombre(comunidad.nombre);
        setDescripcion(comunidad.descripcion);
        setProposito(comunidad.proposito);
        setServicios(comunidad.servicios.map((s: any) => s.idServicio));
        setMembresiasSeleccionadas(comunidad.membresias?.map((m: any) => m.id) || []);
        setLocalesSeleccionados(comunidad.locales?.map((l: any) => l.id) || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error cargando comunidad", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="p-6">Cargando comunidad...</p>;

  const handleEditarComunidad = async () => {
    try {
      const formData = new FormData();
      formData.append("nombre", nombre);
      formData.append("descripcion", descripcion);
      formData.append("proposito", proposito);
      formData.append("idServicios", JSON.stringify(servicios));
      formData.append("idMembresias", JSON.stringify(membresiasSeleccionadas));
      formData.append("idLocales", JSON.stringify(localesSeleccionados));
      if (imagen) formData.append("imagen", imagen);

      await axios.patch(`http://localhost:8080/api/comunidades/${id}`, formData, {
        auth: { username: "admin", password: "admin123" },
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Comunidad actualizada exitosamente");
      navigate("/admin/comunidades");

    } catch (err) {
      console.error("Error al editar comunidad:", err);
      alert("Hubo un error al editar la comunidad");
    }
  };

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
        localesDisponibles={locales}
        localesSeleccionados={localesSeleccionados}
        setLocalesSeleccionados={setLocalesSeleccionados}
        imagen={imagen}
        setImagen={setImagen}
        onSubmit={handleEditarComunidad}
        buttonText="Guardar cambios"
      />
    </div>
  );
}

export default EditarComunidad;
