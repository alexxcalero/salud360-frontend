import { Pencil, Trash } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { extenedCitaMedicaType } from "@/schemas/citaMedica";
import Button from "../Button";
import { useDialog } from "@/hooks/dialogContext";
import { deleteCitaMedicaAPI } from "@/services/citasMedicasAdmin.service";
import { useInternalModals } from "@/hooks/useInternalModals";
import BaseCard from "./cards/BaseCard";
import Time from "../time";
import { cn } from "@/lib/utils";

export function AdminCitaMedicaCard({
  citaMedica,
  update,
  collapsed,
}: {
  citaMedica: extenedCitaMedicaType;
  update: (_: extenedCitaMedicaType) => void;
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
              citaMedica.estado === "Disponible"
                ? "blue"
                : citaMedica.estado === "Reservada"
                ? "green"
                : "red"
            }
            active={citaMedica.activo}
            date={citaMedica.fecha?.set({
              hour: citaMedica.horaInicio?.hour,
              minute: citaMedica.horaInicio?.minute,
            })}
          >
            <span className="use-label-medium text-left">
              {citaMedica.horaInicio?.toFormat("T")} -{" "}
              {citaMedica.horaFin?.toFormat("T")}
            </span>
            <div className="flex items-center justify-between">
              <span className="use-label-large font-semibold text-left">
                {citaMedica.medico?.especialidad}
              </span>
            </div>
            <span className="use-label-large font-medium text-left">
              {citaMedica.servicio?.nombre}
            </span>
          </BaseCard>
        </HoverCardTrigger>
        {citaMedica.activo && (
          <HoverCardContent className="w-max">
            <div className="p-2">
              <div>
                <div>
                  <span className="text-label-small">
                    Fecha creación:{" "}
                    {citaMedica.fechaCreacion?.toFormat("DDDD - HH:mm", {
                      locale: "es",
                    })}
                  </span>
                </div>
                <div>
                  <strong role="heading">Detalles de la cita médica</strong>
                  <span
                    className={cn(
                      "ml-2 bg-blue-500 px-2 py-1 rounded-full font-semibold select-none",
                      citaMedica.estado === "Reservada" && "bg-green-500",
                      citaMedica.estado === "Finalizada" && "bg-red-500",
                      "use-label-small",
                      "text-white"
                    )}
                  >
                    {citaMedica.estado ?? "ESTADO NO ESPECIFICADO"}
                  </span>
                  <p className="mt-2">
                    {citaMedica.fecha?.toFormat("DDDD", { locale: "es" })}
                    <br />
                    <Time type="time" dateTime={citaMedica.horaInicio} /> -{" "}
                    <Time type="time" dateTime={citaMedica.horaFin} />
                  </p>
                </div>
                <div className="mt-2">
                  <strong>Médico</strong>
                  <p>
                    Dr(a):{" "}
                    <span className="text-neutral-600">
                      {citaMedica.medico?.nombres}{" "}
                      {citaMedica.medico?.apellidos}
                    </span>
                    <br />
                    Especialidad:{" "}
                    <span className="text-neutral-600">
                      {citaMedica.medico?.especialidad}
                    </span>
                  </p>
                </div>
                {citaMedica.cliente && (
                  <div className="bg-green-200 border-1 border-green-600 rounded-md p-4 mt-4">
                    <strong className="text-green-800">
                      Cita ya reservada por:
                    </strong>
                    <p className="text-green-600">
                      {citaMedica.cliente?.nombres}{" "}
                      {citaMedica.cliente?.apellidos}
                      <br />
                      {citaMedica.cliente?.correo}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex gap-4 mt-2">
                {citaMedica.activo && citaMedica.estado !== "Finalizada" && (
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
                {/* No se si dejar el reactivar, pq al final se acumularía en el calendario */}
                {/* {!citaMedica.activo && (
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
              )} */}
              </div>
            </div>
          </HoverCardContent>
        )}
      </HoverCard>
    </>
  );
}
