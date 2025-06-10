import CalendarioUsuarios from "@/components/usuario/CalendarioUsuarios";
import { useEffect } from "react";

function CalendarioYReservas() {
  useEffect(() => {
    window.scrollTo(0, 0); //Para que apenas cargue aparezca en el tope de la página.
  }, []);

  return (
    <section className="flex flex-col gap-4 w-full">
      <title>Calendario y reservas</title>
      <div className="w-full p-8 text-left border-b-1 border-neutral-300">
        <h1 className="text-4xl font-bold mb-2">Calendario de Reservas</h1>
        <h2 className="text-lg text-gray-700 mb-6">
          En este calendario puedes visualizar, reservar y anular citas o
          actividades:
        </h2>
      </div>

      <div className="w-full px-8">
        <CalendarioUsuarios />
      </div>
    </section>
  );
}

export default CalendarioYReservas;
