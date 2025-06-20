import Button from "@/components/Button";
import { useDialog } from "@/hooks/dialogContext";
import { useInternalModals } from "@/hooks/useInternalModals";
import { extenedCitaMedicaType } from "@/schemas/citaMedica";
import { reactivarCitaMedicaAPI } from "@/services/citasMedicasAdmin.service";

const ReactivarCitaMedicaForm = ({
  citaMedica,
}: {
  citaMedica: extenedCitaMedicaType;
}) => {
  const { callAlertDialog, callErrorDialog, callSuccessDialog } = useDialog();
  const { reload } = useInternalModals();
  return (
    <div className="p-2">
      <Button
        onClick={() =>
          callAlertDialog({
            title: "¿Estás seguro que quieres reactivar esto?",
            buttonLabel: "Restaurar",
            onConfirm: async () => {
              if (!citaMedica.idCitaMedica) return false;
              const response = await reactivarCitaMedicaAPI(
                citaMedica.idCitaMedica
              );
              if (response) {
                callSuccessDialog({
                  title: "La cita fue eliminada con exito",
                });
                reload();
                return false;
              }
              callErrorDialog({
                title: "No se pudo eliminar la cita",
              });
              return true;
            },
          })
        }
      >
        Reactivar
      </Button>
    </div>
  );
};

export default ReactivarCitaMedicaForm;
