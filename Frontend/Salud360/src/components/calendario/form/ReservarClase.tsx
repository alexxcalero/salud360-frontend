import Button from "@/components/Button";
import { AuthContext } from "@/hooks/AuthContext";
import { useDialog } from "@/hooks/dialogContext";
import { useToasts } from "@/hooks/ToastContext";
import { useInternalModals } from "@/hooks/useInternalModals";
import { claseDTOType } from "@/schemas/clase";
import { postReservarAPI } from "@/services/reservas.service";
import { Ticket } from "lucide-react";
import { useContext } from "react";

const ReservarClaseForm = ({
  clase,
  id,
}: {
  clase: claseDTOType;
  id?: string;
}) => {
  const { callErrorDialog, callInfoDialog, callSuccessDialog } = useDialog();
  const { usuario } = useContext(AuthContext);
  const { createToast } = useToasts();
  const { reload } = useInternalModals();
  return (
    <Button
      onClick={() => {
        callInfoDialog({
          title: "¿Quieres reservar esta clase?",
          description: `${clase.horaInicio?.toFormat(
            "T"
          )} - ${clase.horaFin?.toFormat("T")}`,
          buttonLabel: "Reservar",
          onConfirm: async () => {
            if (!usuario || !id || !clase.idClase) {
              createToast("error", {
                title: "Mal envio de datos",
              });
              return true;
            }
            const result = await postReservarAPI({
              cliente: {
                idCliente: usuario.idCliente,
              },
              clase: {
                idClase: clase.idClase,
              },
              comunidad: {
                idComunidad: Number(id),
              },
            });

            if (result) {
              callSuccessDialog({
                title: "Cita reservada correctamente",
              });
              reload();
            } else
              callErrorDialog({
                title: "la cita no pudo ser reservada correctamente",
              });
            return false;
          },
        });
      }}
    >
      <Ticket /> Reservar
    </Button>
  );
};

export default ReservarClaseForm;
