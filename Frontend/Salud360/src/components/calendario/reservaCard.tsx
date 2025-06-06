import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import BaseCard from "./cards/BaseCard";
import Button from "../Button";
import { Ban } from "lucide-react";
import { useDialog } from "@/hooks/dialogContext";
import { deleteReservaAPI } from "@/services/reservas.service";
import { useContext } from "react";
import { AuthContext } from "@/hooks/AuthContext";
import { useToasts } from "@/hooks/ToastContext";
import { reservaType } from "@/schemas/reserva";

export function ReservaCard({ reserva }: { reserva: reservaType }) {
  const {
    callInfoDialog,
    callSuccessDialog,
    callErrorDialog,
    callAlertDialog,
  } = useDialog();
  const { createToast } = useToasts();
  const { usuario } = useContext(AuthContext);

  return (
    <>
      <HoverCard openDelay={300}>
        <HoverCardTrigger asChild>
          <BaseCard
            color="green"
            estado={reserva.estado ?? undefined}
            date={
              reserva.citaMedica?.fecha?.set({
                hour: reserva.citaMedica?.horaInicio?.hour,
                minute: reserva.citaMedica?.horaInicio?.minute,
              }) ??
              reserva.clase?.fecha?.set({
                hour: reserva.clase?.horaInicio?.hour,
                minute: reserva.clase?.horaInicio?.minute,
              })
            }
          >
            <div className="flex items-center justify-between">
              <span className="use-label-large font-semibold">
                {reserva.citaMedica?.medico?.nombres}
                {reserva.clase?.nombre}
              </span>
            </div>
            <span className="use-label-large font-medium text-left">
              {reserva.clase?.horaInicio?.toFormat("T") ??
                reserva.citaMedica?.horaInicio?.toFormat("T")}{" "}
              -{" "}
              {reserva.clase?.horaFin?.toFormat("T") ??
                reserva.citaMedica?.horaFin?.toFormat("T")}
            </span>
          </BaseCard>
        </HoverCardTrigger>
        <HoverCardContent className="w-max">
          <div className="p-2">
            <Button
              variant="danger"
              onClick={() => {
                callAlertDialog({
                  title: "¿Quieres cancelar esta reserva?",
                  description: `${
                    reserva.clase?.horaInicio?.toFormat("T") ??
                    reserva.citaMedica?.horaInicio?.toFormat("T")
                  } - ${
                    reserva.clase?.horaFin?.toFormat("T") ??
                    reserva.citaMedica?.horaFin?.toFormat("T")
                  }`,
                  buttonLabel: "Cancelar",
                  onConfirm: async () => {
                    if (!usuario || !reserva.idReserva) {
                      createToast("error", {
                        title: "Mal envio de datos",
                      });
                      return true;
                    }
                    const result = await deleteReservaAPI(reserva.idReserva);

                    if (result)
                      callSuccessDialog({
                        title: "Reserva cancelada correctamente",
                      });
                    else
                      callErrorDialog({
                        title: "La reserva no pudo ser cancelada correctamente",
                      });
                    return false;
                  },
                });
              }}
            >
              <Ban /> Cancelar Reserva
            </Button>
          </div>
        </HoverCardContent>
      </HoverCard>
    </>
  );
}
