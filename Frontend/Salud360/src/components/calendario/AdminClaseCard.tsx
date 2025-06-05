import { Pencil, Trash } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import Button from "../Button";
import { useDialog } from "@/hooks/dialogContext";
import { useInternalModals } from "@/hooks/useInternalModals";
import { claseDTOType } from "@/schemas/clase";
import {
  deleteClaseAPI,
  reactivarClaseAPI,
} from "@/services/clasesAdmin.service";
import ActualizarClaseModalForm from "./modals/actualizarClaseForm";

export function AdminClaseCard({ clase }: { clase: claseDTOType }) {
  const { callAlertDialog, callErrorDialog, callSuccessDialog } = useDialog();
  const { activeModal, setActiveModal, reload } = useInternalModals();
  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={`w-full group p-2 gap-3 flex flex-col border-l-6 rounded-sm border-pink-500 bg-pink-700/10 text-pink-700 hover:shadow-md hover:shadow-pink-300 ${
              !clase.activo &&
              "border-neutral-500 bg-neutral-700/10 text-neutral-700 hover:shadow-neutral-300"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="use-label-large font-semibold">
                {clase.nombre}
              </span>
            </div>
            <span className="use-label-large font-medium text-left">
              {clase.local?.nombre} ({clase.local?.direccion})
            </span>
            <span className="mt-2 text-left">{clase.descripcion}</span>
          </div>
        </TooltipTrigger>
        {clase.activo && (
          <TooltipContent className="w-max">
            <div className="p-2">
              <div className="flex gap-4 mb-2">
                <Button onClick={() => setActiveModal?.("actualizarCita")}>
                  <Pencil size={16} color="white" /> Editar
                </Button>

                <Button
                  variant="danger"
                  onClick={() =>
                    callAlertDialog({
                      title: "¿Estàs seguro que quieres eliminar esto?",
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
              </div>
              <p>
                <span className="text-lg">
                  {clase.fecha?.toFormat("DDDD", { locale: "es" })}
                </span>
                <br />
                {clase.horaInicio?.toFormat("TTTT", {
                  locale: "es",
                })}{" "}
                - {clase.horaFin?.toFormat("TTTT", { locale: "es" })}
              </p>
            </div>
          </TooltipContent>
        )}
        {!clase.activo && (
          <TooltipContent className="w-max">
            <div className="p-2">
              <Button
                onClick={() =>
                  callAlertDialog({
                    title: "¿Estàs seguro que quieres reactivar esto?",
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
            </div>
          </TooltipContent>
        )}
      </Tooltip>
      {clase.activo && (
        <ActualizarClaseModalForm
          open={activeModal === "actualizarCita"}
          setOpen={(b) =>
            b ? setActiveModal?.("actualizarCita") : setActiveModal?.("")
          }
          clase={clase}
        />
      )}
    </>
  );
}
