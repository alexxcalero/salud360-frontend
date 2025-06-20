import CalendarioComunidad from "@/components/usuario/CalendarioComunidad";
import { CitaMedicaEstado } from "@/models/enums/citaMedica";
import { ClaseEstado } from "@/models/enums/clase";
import { useParams } from "react-router";

function DetalleComunidadHorario() {
  const { id } = useParams();
  return (
    <section className="w-full px-8 py-8">
      <title>Horarios de comunidad</title>
      <CalendarioComunidad
        id={Number(id)}
        filtrosAdicionales={[
          (d) =>
            d.estado !== CitaMedicaEstado.reservada &&
            d.estado !== ClaseEstado.completa &&
            d.tipo !== "reserva",
        ]}
      />
    </section>
  );
}

export default DetalleComunidadHorario;
