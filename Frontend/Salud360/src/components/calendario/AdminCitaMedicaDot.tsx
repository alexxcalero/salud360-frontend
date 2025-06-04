import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { citaMedicaType, extenedCitaMedicaType } from "@/schemas/citaMedica";
import Button from "../Button";
import { Ban, CalendarClock, CalendarPlus, Pencil, Trash } from "lucide-react";
import AgendarCitaModalForm from "./modals/agendarCitaModalForm";
import { useState } from "react";

const AdminCitaMedicaDot = ({
  citaMedica,
}: {
  citaMedica: extenedCitaMedicaType;
}) => {
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
              {citaMedica.estado && <li>Estado: {citaMedica.estado}</li>}
              <li>
                Dr(a): {citaMedica.medico?.nombres}{" "}
                {citaMedica.medico?.apellidos}
              </li>
              <li>Especialidad: {citaMedica.medico?.especialidad}</li>
              <li>
                Fecha: {citaMedica.fecha?.toFormat("DDDD", { locale: "es" })}
              </li>
              <li>
                Hora: {citaMedica.horaInicio?.toFormat("t", { locale: "es" })} -{" "}
                {citaMedica.horaFin?.toFormat("t", { locale: "es" })}
              </li>
            </ul>
          </p>
          <div className="flex gap-4 justify-end mt-3">
            <div className="flex gap-4 mb-2">
              <Button>
                <Pencil size={16} color="white" /> Editar
              </Button>
              <Button variant="danger">
                <Trash size={16} color="white" /> Eliminar
              </Button>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </>
  );
};

export default AdminCitaMedicaDot;
