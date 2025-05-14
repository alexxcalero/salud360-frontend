import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

import useComunidadForm from "@/hooks/useComunidadForm";
import ComunidadForm from "@/components/admin/comunidades/ComunidadForm";

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

  const [locales, setLocales] = useState<any[]>([]);
  const [localesSeleccionados, setLocalesSeleccionados] = useState<number[]>([]);

  const [serviciosDisponibles, setServiciosDisponibles] = useState<any[]>([]);
  const [imagen, setImagen] = useState<File | null>(null);

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
        setServicios(comunidad.servicios?.map((s: any) => s.idServicio) || []);

        setMembresiasSeleccionadas(comunidad.membresias?.map((m: any) => m.id) || []);
        setLocalesSeleccionados(comunidad.locales?.map((l: any) => l.id) || []);

        setServiciosDisponibles(serviciosRes.data);
        setMembresias(membresiasRes.data);
        setLocales(localesRes.data);

        setLoading(false);
      } catch (err) {
        console.error("Error cargando los datos de la comunidad", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Cargando comunidad...</p>;
  }

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
        localesDisponibles={locales}
        localesSeleccionados={localesSeleccionados}
        setLocalesSeleccionados={setLocalesSeleccionados}
        imagen={imagen}
        setImagen={setImagen}
        buttonText=""
        onSubmit={() => {}}
        readOnly={true}
      />
    </div>
  );
}

export default DetalleComunidad;