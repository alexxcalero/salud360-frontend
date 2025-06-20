import Button from "@/components/Button";
import { useDialog } from "@/hooks/dialogContext";
import { useInternalModals } from "@/hooks/useInternalModals";
import { claseDTOType } from "@/schemas/clase";
import { deleteClaseAPI } from "@/services/clasesAdmin.service";
import { Pencil, Trash } from "lucide-react";

const EditarClaseForm = ({ clase }: { clase: claseDTOType }) => {
  const { callAlertDialog, callErrorDialog, callSuccessDialog } = useDialog();
  const { setSelectedData, setActiveModal, reload } = useInternalModals();

  return (
    <>
      <Button
        onClick={() => {
          setActiveModal?.("actualizar");
          setSelectedData(clase);
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
              if (!clase.idClase) return false;
              const response = await deleteClaseAPI(clase.idClase);
              if (response) {
                callSuccessDialog({
                  title: "La clase fue eliminada con exito",
                });
                reload();
                return false;
              }
              callErrorDialog({
                title: "No se pudo eliminar la clase",
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

export default EditarClaseForm;
