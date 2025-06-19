import Button from "@/components/Button";
import { useDialog } from "@/hooks/dialogContext";
import { useInternalModals } from "@/hooks/useInternalModals";
import { claseDTOType } from "@/schemas/clase";
import { reactivarClaseAPI } from "@/services/clasesAdmin.service";

const ReactivarClaseForm = ({ clase }: { clase: claseDTOType }) => {
  const { callAlertDialog, callErrorDialog, callSuccessDialog } = useDialog();
  const { reload } = useInternalModals();

  return (
    <>
      <Button
        onClick={() =>
          callAlertDialog({
            title: "¿Estás seguro que quieres reactivar esto?",
            buttonLabel: "Restaurar",
            onConfirm: async () => {
              if (!clase.idClase) return false;
              const response = await reactivarClaseAPI(clase.idClase);
              if (response) {
                callSuccessDialog({
                  title: "La clase fue recuperada con exito",
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
        Reactivar
      </Button>
    </>
  );
};

export default ReactivarClaseForm;
