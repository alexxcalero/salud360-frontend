import { useParams } from "react-router";
import CalendarioComunidad from "@/components/usuario/CalendarioComunidad";

function DetalleComunidadReservas() {
  const { id } = useParams();
  return (
    <section>
      <CalendarioComunidad idComunidad={Number(id)} />
    </section>
  );
}

export default DetalleComunidadReservas;
