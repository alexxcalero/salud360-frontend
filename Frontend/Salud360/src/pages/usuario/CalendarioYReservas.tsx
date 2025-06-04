import CalendarioUsuarios from "@/components/usuario/CalendarioUsuarios";
import { useEffect } from "react";

function CalendarioYReservas() {
  useEffect(() => {
    window.scrollTo(0, 0); //Para que apenas cargue aparezca en el tope de la página.
  }, []);

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 px-4 py-8 text-left">
        <h1>Calendario de Reservas</h1>
        <p>
          En este calendario puedes visualizar, reservar y anular citas o
          actividades:
        </p>
      </div>
      <CalendarioUsuarios />
    </section>
  );
}

export default CalendarioYReservas;
