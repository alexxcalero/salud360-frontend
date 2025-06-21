import { useEffect, useState } from "react";
import { useParams } from "react-router";

import useComunidadForm from "@/hooks/useComunidadForm";
import ComunidadForm from "@/components/admin/comunidades/ComunidadForm";
import { baseAPI } from "@/services/baseAPI";

function DetalleComunidad() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const {
    nombre, setNombre,
    descripcion, setDescripcion,
    proposito, setProposito,
    servicios, setServicios
  } = useComunidadForm();

  const [membresias, setMembresias] = useState<any[]>([]);
  const [membresiasSeleccionadas, setMembresiasSeleccionadas] = useState<number[]>([]);
  const [nuevasMembresias, setNuevasMembresias] = useState<any[]>([]);

  const [locales, setLocales] = useState<any[]>([]);
  const [localesSeleccionados, setLocalesSeleccionados] = useState<number[]>([]);
  const [serviciosDisponibles, setServiciosDisponibles] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [comunidadRes, serviciosRes, membresiasRes, localesRes] = await Promise.all([
          baseAPI.get(`/comunidades/${id}`, {
            auth: { username: "admin", password: "admin123" }
          }),
          baseAPI.get("/servicios", {
            auth: { username: "admin", password: "admin123" }
          }),
          baseAPI.get("/membresias", {
            auth: { username: "admin", password: "admin123" }
          }),
          baseAPI.get("/locales", {
            auth: { username: "admin", password: "admin123" }
          })
        ]);

        const comunidad = comunidadRes.data;

        setNombre(comunidad.nombre);
        setDescripcion(comunidad.descripcion);
        setProposito(comunidad.proposito);
        setServicios(comunidad.servicios?.map((s: any) => s.idServicio) || []);
        setMembresiasSeleccionadas(comunidad.membresias?.map((m: any) => m.idMembresia) || []);
        setNuevasMembresias(comunidad.membresias || []);
        setLocalesSeleccionados(comunidad.locales?.map((l: any) => l.idLocal) || []);

        setServiciosDisponibles(serviciosRes.data);
        setMembresias(membresiasRes.data);
        setLocales(localesRes.data);

        setLoading(false);
      } catch (err) {
        console.error("❌ Error cargando datos de la comunidad", err);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p className="p-6">Cargando comunidad...</p>;

  return (
    <div className="w-full px-10 py-8 text-left">
      <ComunidadForm
        title="Detalles de la Comunidad"
        subtitle="Información de la comunidad registrada."
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
        buttonText=""
        onSubmit={() => {}}
        readOnly={true}
      />
    </div>
  );
}

export default DetalleComunidad;
