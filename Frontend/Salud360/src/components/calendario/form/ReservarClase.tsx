import Button from "@/components/Button";
import { AuthContext } from "@/hooks/AuthContext";
import { useDialog } from "@/hooks/dialogContext";
import { useToasts } from "@/hooks/ToastContext";
import { claseDTOType } from "@/schemas/clase";
import { postReservarAPI } from "@/services/reservas.service";
import { Ticket } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router";

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
  const navigate = useNavigate();
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
            console.log({
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
              navigate(`/usuario/comunidades/detalle/${id}/reservas`);
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
