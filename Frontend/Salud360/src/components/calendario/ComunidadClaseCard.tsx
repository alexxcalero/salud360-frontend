import { useInternalModals } from "@/hooks/useInternalModals";
import { claseDTOType } from "@/schemas/clase";

import BaseCard from "./cards/BaseCard";
import { HoverCard, HoverCardTrigger } from "@/components/ui/hover-card";

export function ComunidadClaseCard({ clase }: { clase: claseDTOType }) {
  // const { callAlertDialog, callErrorDialog, callSuccessDialog } = useDialog();
  const { reload } = useInternalModals();

  return (
    <>
      <HoverCard>
        <HoverCardTrigger asChild>
          <BaseCard color="pink" active={clase.activo ?? false}>
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
      </HoverCard>
    </>
  );
}
