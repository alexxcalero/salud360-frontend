import CalendarioComunidad from "@/components/usuario/CalendarioComunidad";
import { useParams } from "react-router";

function DetalleComunidadHorario() {
  const { id } = useParams();
  return (
    <section>
      <CalendarioComunidad
        id={Number(id)}
        filtrosAdicionales={[(d) => d.estado !== "Reservada"]}
      />
    </section>
  );
}

export default DetalleComunidadHorario;
