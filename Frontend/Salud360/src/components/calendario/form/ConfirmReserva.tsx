import Button from "@/components/Button";
import { AuthContext } from "@/hooks/AuthContext";
import { useDialog } from "@/hooks/dialogContext";
import { useInternalModals } from "@/hooks/useInternalModals";
import { reservaType } from "@/schemas/reserva";
import { deleteReservaAPI } from "@/services/reservas.service";
import { Ban } from "lucide-react";
import { DateTime } from "luxon";
import { useContext } from "react";

const ConfirmReservaForm = ({ reserva }: { reserva: reservaType }) => {
  const { callSuccessDialog, callAlertDialog } = useDialog();
  const { usuario } = useContext(AuthContext);
  const { reload } = useInternalModals();
  return (
    <>
      <Button
        disabled={Boolean(
          reserva.fechaMaxCancelacion &&
            reserva.horaMaxCancelacion &&
            DateTime.fromISO(reserva.fechaMaxCancelacion)
              .set({
                hour: DateTime.fromISO(reserva.horaMaxCancelacion).hour,
                minute: DateTime.fromISO(reserva.horaMaxCancelacion).minute,
              })
              .diffNow()
              .as("minutes") < 0
        )}
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
              if (!usuario || !reserva.idReserva)
                throw new Error("Mal envío de datos");
              const result = await deleteReservaAPI(reserva.idReserva);

              if (result) {
                callSuccessDialog({
                  title: "Reserva cancelada correctamente",
                });
                reload();
              } else
                throw new Error(
                  "La reserva no pudo ser cancelada correctamente"
                );
            },
          });
        }}
      >
        <Ban /> Cancelar Reserva
      </Button>
    </>
  );
};

export default ConfirmReservaForm;
