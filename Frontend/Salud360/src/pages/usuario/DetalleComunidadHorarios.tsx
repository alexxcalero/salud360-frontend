import CalendarioComunidad from "@/components/usuario/CalendarioComunidad";
import { useParams } from "react-router";

function DetalleComunidadHorario() {
  const { id } = useParams();
  return (
    <section className="w-full px-8 py-8">
      <title>Horarios de comunidad</title>
      <CalendarioComunidad
        id={Number(id)}
        filtrosAdicionales={[(d) => d.estado !== "Reservada"]}
      />
    </section>
  );
}

export default DetalleComunidadHorario;
