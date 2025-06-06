import { Pencil, Trash } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { extenedCitaMedicaType } from "@/schemas/citaMedica";
import Button from "../Button";
import { useDialog } from "@/hooks/dialogContext";
import {
  deleteCitaMedicaAPI,
  reactivarCitaMedicaAPI,
} from "@/services/citasMedicasAdmin.service";
import { useInternalModals } from "@/hooks/useInternalModals";
import BaseCard from "./cards/BaseCard";

export function AdminCitaMedicaCard({
  citaMedica,
  update,
}: {
  citaMedica: extenedCitaMedicaType;
  update: (_: extenedCitaMedicaType) => void;
}) {
  const { callAlertDialog, callErrorDialog, callSuccessDialog } = useDialog();
  const { reload } = useInternalModals();
  return (
    <>
      <HoverCard>
        <HoverCardTrigger asChild>
          <BaseCard
            color="blue"
            active={citaMedica.activo}
            estado={citaMedica.estado}
            date={citaMedica.fecha?.set({
              hour: citaMedica.horaInicio?.hour,
              minute: citaMedica.horaInicio?.minute,
            })}
          >
            <div className="flex items-center justify-between">
              <span className="use-label-large font-semibold">
                {citaMedica.medico?.especialidad}
              </span>
            </div>
            <span className="use-label-large font-medium text-left">
              {citaMedica.servicio?.nombre}
            </span>
          </BaseCard>
        </HoverCardTrigger>
        <HoverCardContent className="w-max">
          <div className="p-2">
            <div className="flex gap-4 mb-2">
              {citaMedica.activo && (
                <>
                  <Button onClick={() => update(citaMedica)}>
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
              )}
              {!citaMedica.activo && (
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
              )}
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
        </HoverCardContent>
      </HoverCard>
    </>
  );
}
