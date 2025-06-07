import { useParams } from "react-router";
import CalendarioComunidad from "@/components/usuario/CalendarioComunidad";

function DetalleComunidadReservas() {
  const { id } = useParams();
  return (
    <section className="w-full px-8 py-8">
      <CalendarioComunidad
        id={Number(id)}
        filtrosAdicionales={[(d) => d.estado === "Reservada"]}
      />
    </section>
  );
}

export default DetalleComunidadReservas;
