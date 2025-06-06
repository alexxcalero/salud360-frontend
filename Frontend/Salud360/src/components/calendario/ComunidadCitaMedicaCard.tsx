import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { extenedCitaMedicaType } from "@/schemas/citaMedica";
import { useDialog } from "@/hooks/dialogContext";
import { useInternalModals } from "@/hooks/useInternalModals";
import BaseCard from "./cards/BaseCard";
import Button from "../Button";
import { Ticket } from "lucide-react";

export function ComunidadCitaMedicaCard({
  citaMedica,
}: {
  citaMedica: extenedCitaMedicaType;
}) {
  // const { callAlertDialog, callErrorDialog, callSuccessDialog } = useDialog();
  const { reload } = useInternalModals();
  return (
    <>
      <HoverCard>
        <HoverCardTrigger asChild>
          <BaseCard color="blue" active={citaMedica.activo}>
            <div className="flex items-center justify-between">
              <span className="use-label-large font-semibold">
                {citaMedica.medico?.especialidad}
              </span>
            </div>
            <span className="use-label-large font-medium text-left">
              {citaMedica.servicio?.nombre}
            </span>
          </BaseCard>
        </HoverCardTrigger>
        <HoverCardContent className="w-max">
          <div className="p-2">
            <div className="flex gap-4 mb-2">
              <Button>
                <Ticket /> Reservar
              </Button>
            </div>
            <p>
              <span className="text-lg">
                {citaMedica.fecha?.toFormat("DDDD", { locale: "es" })}
              </span>
              <br />
              {citaMedica.horaInicio?.toFormat("TTTT", {
                locale: "es",
              })}{" "}
              - {citaMedica.horaFin?.toFormat("TTTT", { locale: "es" })}
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </>
  );
}
