import Button from "@/components/Button";
import { useDialog } from "@/hooks/dialogContext";
import { useInternalModals } from "@/hooks/useInternalModals";
import { extenedCitaMedicaType } from "@/schemas/citaMedica";
import { deleteCitaMedicaAPI } from "@/services/citasMedicasAdmin.service";
import { Pencil, Trash } from "lucide-react";

const EditarCitaMedicaForm = ({
  citaMedica,
}: {
  citaMedica: extenedCitaMedicaType;
}) => {
  const { callAlertDialog, callErrorDialog, callSuccessDialog } = useDialog();
  const { setSelectedData, setActiveModal, reload } = useInternalModals();

  return (
    <>
      <Button
        onClick={() => {
          setActiveModal?.("actualizar");
          setSelectedData(citaMedica);
        }}
      >
        <Pencil size={16} color="white" /> Editar
      </Button>

      <Button
        variant="danger"
        onClick={() =>
          callAlertDialog({
            title: "¿Estás seguro que quieres eliminar esto?",
            onConfirm: async () => {
              if (!citaMedica.idCitaMedica) return false;
              const response = await deleteCitaMedicaAPI(
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
        <Trash size={16} color="white" /> Eliminar
      </Button>
    </>
  );
};

export default EditarCitaMedicaForm;
