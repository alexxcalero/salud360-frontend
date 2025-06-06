import { claseDTOType } from "@/schemas/clase";

import BaseCard from "./cards/BaseCard";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Button from "../Button";
import { Ticket } from "lucide-react";

export function ComunidadClaseCard({
  clase,
  reservar,
}: {
  clase: claseDTOType;
  reservar: (_: claseDTOType) => void;
}) {
  return (
    <>
      <HoverCard>
        <HoverCardTrigger asChild>
          {/* Esto es por un problema del backend */}
          <BaseCard
            color="pink"
            active={clase.activo ?? true}
            estado={clase.estado ?? undefined}
            date={clase.fecha?.set({
              hour: clase.horaInicio?.hour,
              minute: clase.horaInicio?.minute,
            })}
          >
            <div className="flex items-center justify-between">
              <span className="use-label-large font-semibold">
                {clase.nombre}
              </span>
            </div>
            <span className="use-label-large font-medium text-left">
              {clase.horaInicio?.toFormat("T")} {clase.horaFin?.toFormat("T")}
            </span>
          </BaseCard>
        </HoverCardTrigger>
        <HoverCardContent>
          <div className="p-2">
            <div className="flex gap-4 mb-2">
              <Button onClick={() => reservar(clase)}>
                <Ticket /> Reservar
              </Button>
            </div>
            <p>
              <span className="text-lg">
                {clase.fecha?.toFormat("DDDD", { locale: "es" })}
              </span>
              <br />
              {clase.horaInicio?.toFormat("TTTT", {
                locale: "es",
              })}{" "}
              - {clase.horaFin?.toFormat("TTTT", { locale: "es" })}
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </>
  );
}
