import { CalendarCheck, CalendarPlus, CalendarX, Clock, X } from "lucide-react";

import { citaMedicaType } from "@/schemas/citaMedica";
import { useState } from "react";
import AvailableCitaModal from "./modals/availableCitaModal";
import SuscribedCitaModal from "./modals/suscribedCitaModal";

export function CitaMedicaCard({ citaMedica }: { citaMedica: citaMedicaType }) {
  const {
    estado,
    medico: { apellidos, especialidad },
  } = citaMedica;
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        onDoubleClick={() => setOpen(true)}
        className="w-full group p-2 gap-3 flex flex-col border-l-6 rounded-sm border-blue-500 data-[state='full']:border-neutral-500 bg-blue-700/10 data-[state='full']:bg-neutral-700/10 text-blue-700 data-[variant='yellow']:text-yellow-700 data-[variant='pink']:text-fuchsia-700 data-[state='full']:text-neutral-700 hover:shadow-md hover:shadow-blue-300"
        data-state={estado}
      >
        <div className="flex items-center justify-between">
          <span className="use-label-large font-semibold">Cita medica</span>
          <div className="py-1 px-2 rounded-full bg-blue-500 group-data-[state='suscribed']:bg-green-500 group-data-[state='full']:bg-neutral-500 group-data-[state='canceled']:bg-red-500 group-data-[state='soon']:bg-red-500 flex text-[9px] text-white font-semibold items-center">
            {estado === "available" && (
              <>
                <CalendarPlus color="white" size={14} strokeWidth={3} />{" "}
                <span className="ml-1">Disponible</span>
              </>
            )}
            {estado === "full" && (
              <>
                <CalendarX color="white" size={14} strokeWidth={3} />{" "}
                <span className="ml-1">No disponible</span>
              </>
            )}
            {estado === "suscribed" && (
              <>
                <CalendarCheck color="white" size={14} strokeWidth={3} />{" "}
                <span className="ml-1">Reservado</span>
              </>
            )}
            {estado === "soon" && (
              <>
                <Clock color="white" size={14} strokeWidth={3} />{" "}
                <span className="ml-1">Prox.</span>
              </>
            )}
            {estado === "canceled" && (
              <>
                <X color="white" size={14} strokeWidth={3} />{" "}
                <span className="ml-1">Cancelado</span>
              </>
            )}
          </div>
        </div>
        <span className="use-label-large font-medium text-left">
          {especialidad}
          <br />
          {`Dr(a) ${apellidos}`}
        </span>
      </div>
      {estado === "available" && (
        <AvailableCitaModal
          citaMedica={citaMedica}
          open={open}
          setOpen={setOpen}
        />
      )}
      {estado === "suscribed" && (
        <SuscribedCitaModal
          citaMedica={citaMedica}
          open={open}
          setOpen={setOpen}
        />
      )}
    </>
  );
}
