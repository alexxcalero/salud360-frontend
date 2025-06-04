import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { citaMedicaType } from "@/schemas/citaMedica";
import Button from "../Button";
import { Ban, CalendarClock, CalendarPlus } from "lucide-react";
import AgendarCitaModalForm from "./modals/agendarCitaModalForm";
import { useState } from "react";

const CitaCardDot = ({ citaMedica }: { citaMedica: citaMedicaType }) => {
  const {
    fecha,
    hora,
    estado,
    medico: { apellidos, nombres, especialidad },
  } = citaMedica;
  const [open, setOpen] = useState(false);
  return (
    <>
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className="bg-blue-500 h-4 w-4 rounded-full"></div>
        </HoverCardTrigger>
        <HoverCardContent className="p-4">
          <h3>Cita mèdica</h3>
          <p>
            Detalles:
            <ul className="list-disc pl-6">
              {estado && <li>Estado: {estado}</li>}
              <li>
                Dr(a): {nombres} {apellidos}
              </li>
              <li>Especialidad: {especialidad}</li>
              <li>Fecha: {fecha.toFormat("DDDD", { locale: "es" })}</li>
              <li>Hora: {hora.toFormat("t", { locale: "es" })}</li>
            </ul>
          </p>
          <div className="flex gap-4 justify-end mt-3">
            {estado === "available" && (
              <>
                <Button onClick={() => setOpen(true)}>
                  <CalendarPlus /> Agendar
                </Button>
                <AgendarCitaModalForm
                  open={open}
                  setOpen={setOpen}
                  citaMedica={citaMedica}
                />
              </>
            )}
            {estado === "suscribed" && (
              <>
                <Button variant="danger">
                  <Ban />
                  Anular
                </Button>
                <Button>
                  <CalendarClock />
                  Postergar
                </Button>
              </>
            )}
          </div>
        </HoverCardContent>
      </HoverCard>
    </>
  );
};

export default CitaCardDot;
