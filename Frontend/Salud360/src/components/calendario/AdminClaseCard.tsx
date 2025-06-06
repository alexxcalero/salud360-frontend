import { Pencil, Trash } from "lucide-react";

import Button from "../Button";
import { useDialog } from "@/hooks/dialogContext";
import { useInternalModals } from "@/hooks/useInternalModals";
import { claseDTOType } from "@/schemas/clase";
import {
  deleteClaseAPI,
  reactivarClaseAPI,
} from "@/services/clasesAdmin.service";

import BaseCard from "./cards/BaseCard";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export function AdminClaseCard({
  clase,
  update,
}: {
  clase: claseDTOType;
  update: (_: claseDTOType) => void;
}) {
  const { callAlertDialog, callErrorDialog, callSuccessDialog } = useDialog();
  const { reload } = useInternalModals();

  return (
    <>
      <HoverCard>
        <HoverCardTrigger asChild>
          <BaseCard
            color="pink"
            active={clase.activo ?? false}
            estado={clase.estado ?? undefined}
            date={clase.fecha?.set({
              hour: clase.horaInicio?.hour,
              minute: clase.horaInicio?.minute,
            })}
          >
            <div className="flex items-center justify-between">
              <span className="use-label-large font-semibold">
                {clase.nombre}
              </span>
            </div>
            <span className="use-label-large font-medium text-left">
              {clase.horaInicio?.toFormat("T")} {clase.horaFin?.toFormat("T")}
            </span>
          </BaseCard>
        </HoverCardTrigger>
        {clase.activo && (
          <HoverCardContent
            className="w-max"
            aria-describedby="Actualizar clase"
          >
            <div className="p-2">
              <div className="flex gap-4 mb-2">
                <Button onClick={() => update(clase)}>
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
          </HoverCardContent>
        )}
        {!clase.activo && (
          <HoverCardContent className="w-max">
            <div className="p-2">
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
            </div>
          </HoverCardContent>
        )}
      </HoverCard>
    </>
  );
}
