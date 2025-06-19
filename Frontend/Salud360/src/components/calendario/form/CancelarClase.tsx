import Button from "@/components/Button";
import { AuthContext } from "@/hooks/AuthContext";
import { useDialog } from "@/hooks/dialogContext";
import { useToasts } from "@/hooks/ToastContext";
import { claseDTOType } from "@/schemas/clase";
import { Ban } from "lucide-react";
import { useContext } from "react";

const CancelarClaseForm = ({
  clase,
  id,
}: {
  clase: claseDTOType;
  id?: string;
}) => {
  const { callAlertDialog } = useDialog();
  const { usuario } = useContext(AuthContext);
  const { createToast } = useToasts();
  return (
    <Button
      variant="danger"
      onClick={() => {
        callAlertDialog({
          title: "¿Quieres cancelar esta reserva?",
          description: `${clase.horaInicio?.toFormat(
            "T"
          )} - ${clase.horaFin?.toFormat("T")}`,
          buttonLabel: "Cancelar",
          onConfirm: async () => {
            if (!usuario || !id) {
              createToast("error", {
                title: "Mal envio de datos",
              });
              return true;
            }
            // const result = await deleteReservaAPI(citaMedica.);

            // if (result)
            //   callSuccessDialog({
            //     title: "Cita reservada correctamente",
            //   });
            // else
            //   callErrorDialog({
            //     title: "la cita no pudo ser reservada correctamente",
            //   });
            return false;
          },
        });
      }}
    >
      <Ban /> Cancelar Reserva
    </Button>
  );
};

export default CancelarClaseForm;
