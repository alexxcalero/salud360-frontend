import { Pencil, Trash } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { extenedCitaMedicaType } from "@/schemas/citaMedica";
import Button from "../Button";
import { useDialog } from "@/hooks/dialogContext";
import {
  deleteCitaMedicaAPI,
  reactivarCitaMedicaAPI,
} from "@/services/citasMedicasAdmin.service";
import ActualizarCitaModalForm from "./modals/actualizarCitaModalForm";
import { useInternalModals } from "@/hooks/useInternalModals";

export function AdminCitaMedicaCard({
  citaMedica,
}: {
  citaMedica: extenedCitaMedicaType;
}) {
  const { callAlertDialog, callErrorDialog, callSuccessDialog } = useDialog();
  const { activeModal, setActiveModal, reload } = useInternalModals();
  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={`w-full group p-2 gap-3 flex flex-col border-l-6 rounded-sm border-blue-500 bg-blue-700/10 text-blue-700 hover:shadow-md hover:shadow-blue-300 ${
              !citaMedica.activo &&
              "border-neutral-500 bg-neutral-700/10 text-neutral-700 hover:shadow-neutral-300"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="use-label-large font-semibold">
                {citaMedica.medico?.especialidad}
              </span>
            </div>
            <span className="use-label-large font-medium text-left">
              {citaMedica.servicio?.nombre}
            </span>
          </div>
        </TooltipTrigger>
        {citaMedica.activo && (
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
              </div>
              <p>
                <span className="text-lg">
                  {citaMedica.fecha?.toFormat("DDDD", { locale: "es" })}
                </span>
                <br />
                {citaMedica.horaInicio?.toFormat("TTTT", {
                  locale: "es",
                })}{" "}
                - {citaMedica.horaFin?.toFormat("TTTT", { locale: "es" })}
              </p>
            </div>
          </TooltipContent>
        )}
        {!citaMedica.activo && (
          <TooltipContent className="w-max">
            <div className="p-2">
              <Button
                onClick={() =>
                  callAlertDialog({
                    title: "¿Estàs seguro que quieres reactivar esto?",
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
          </TooltipContent>
        )}
      </Tooltip>
      {citaMedica.activo && (
        <ActualizarCitaModalForm
          open={activeModal === "actualizarCita"}
          setOpen={(b) =>
            b ? setActiveModal?.("actualizarCita") : setActiveModal?.("")
          }
          citaMedica={citaMedica}
        />
      )}
    </>
  );
}
