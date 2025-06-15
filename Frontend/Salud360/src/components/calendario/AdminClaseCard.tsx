import { Pencil, Trash } from "lucide-react";

import Button from "../Button";
import { useDialog } from "@/hooks/dialogContext";
import { useInternalModals } from "@/hooks/useInternalModals";
import { claseDTOType } from "@/schemas/clase";
import { deleteClaseAPI } from "@/services/clasesAdmin.service";

import BaseCard from "./cards/BaseCard";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import Time from "../time";

export function AdminClaseCard({
  clase,
  update,
  collapsed,
}: {
  clase: claseDTOType;
  update: (_: claseDTOType) => void;
  collapsed?: boolean;
}) {
  const { callAlertDialog, callErrorDialog, callSuccessDialog } = useDialog();
  const { reload } = useInternalModals();

  return (
    <>
      <HoverCard openDelay={300}>
        <HoverCardTrigger asChild>
          <BaseCard
            collapsed={collapsed}
            color={
              clase.estado === "Disponible"
                ? "pink"
                : clase.estado === "Reservada"
                ? "green"
                : "red"
            }
            active={clase.activo ?? undefined}
            date={clase.fecha?.set({
              hour: clase.horaInicio?.hour,
              minute: clase.horaInicio?.minute,
            })}
          >
            <span className="use-label-medium text-left">
              {clase.horaInicio?.toFormat("T")} - {clase.horaFin?.toFormat("T")}
            </span>
            <div className="flex items-center justify-between">
              <span className="use-label-large font-semibold text-left">
                {clase.nombre}
              </span>
            </div>
            <span className="use-label-large font-medium text-left">
              {clase.local?.nombre}: {clase.local?.direccion}
            </span>
          </BaseCard>
        </HoverCardTrigger>
        <HoverCardContent className="w-max">
          {clase.activo && (
            <div className="p-2">
              <div>
                <div>
                  <span className="text-label-small">
                    Fecha creación:{" "}
                    {clase.fechaCreacion?.toFormat("DDDD - HH:mm", {
                      locale: "es",
                    })}
                  </span>
                </div>
                <div>
                  <strong role="heading">Detalles de la clase</strong>
                  <span
                    className={cn(
                      "ml-2 bg-blue-500 px-2 py-1 rounded-full font-semibold select-none",
                      clase.estado === "Reservada" && "bg-green-500",
                      clase.estado === "Finalizada" && "bg-red-500",
                      "use-label-small",
                      "text-white"
                    )}
                  >
                    {clase.estado ?? "ESTADO NO ESPECIFICADO"}
                  </span>
                  <p className="mt-2">
                    {clase.fecha?.toFormat("DDDD", { locale: "es" })}
                    <br />
                    <Time
                      type="time"
                      dateTime={clase.horaInicio ?? undefined}
                    />{" "}
                    - <Time type="time" dateTime={clase.horaFin ?? undefined} />
                  </p>
                </div>
                <div className="mt-2">
                  <strong>Local</strong>
                  <p>
                    <span className="text-neutral-600">
                      {clase.local?.nombre}: {clase.local?.direccion}
                    </span>
                  </p>
                </div>
                {clase.cliente && (
                  <div className="bg-green-200 border-1 border-green-600 rounded-md p-4 mt-4">
                    <strong className="text-green-800">
                      Clase ya reservada por:
                    </strong>
                    <p className="text-green-600">
                      {clase.cliente?.nombres} {clase.cliente?.apellidos}
                      <br />
                      {clase.cliente?.correo}
                    </p>
                  </div>
                )}
              </div>
              <div className="flex gap-4 mt-2">
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
            </div>
          )}
        </HoverCardContent>
        {/* {!clase.activo && (
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
        )} */}
      </HoverCard>
    </>
  );
}
