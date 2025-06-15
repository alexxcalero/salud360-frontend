import { claseDTOType } from "@/schemas/clase";

import BaseCard from "./cards/BaseCard";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Button from "../Button";
import { Ban, Ticket } from "lucide-react";
import { postReservarAPI } from "@/services/reservas.service";
import { useDialog } from "@/hooks/dialogContext";
import { useContext } from "react";
import { AuthContext } from "@/hooks/AuthContext";
import { useParams } from "react-router";
import { useToasts } from "@/hooks/ToastContext";
import { useInternalModals } from "@/hooks/useInternalModals";
import Time from "../time";
import { cn } from "@/lib/utils";

export function ComunidadClaseCard({
  clase,
  collapsed,
}: {
  clase: claseDTOType;
  collapsed?: boolean;
}) {
  const {
    callAlertDialog,
    callErrorDialog,
    callInfoDialog,
    callSuccessDialog,
  } = useDialog();
  const { usuario } = useContext(AuthContext);
  const { id } = useParams();
  const { createToast } = useToasts();
  const { reload } = useInternalModals();
  return (
    <>
      <HoverCard openDelay={300}>
        <HoverCardTrigger asChild>
          {/* Esto es por un problema del backend */}
          <BaseCard
            collapsed={collapsed}
            color={
              clase.estado === "Disponible"
                ? "blue"
                : clase.estado === "Reservada"
                ? "green"
                : "red"
            }
            active={clase.activo ?? true}
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
        <HoverCardContent>
          {clase.estado !== "Reservada" && (
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
                <Button
                  onClick={() => {
                    callInfoDialog({
                      title: "¿Quieres reservar esta clase?",
                      description: `${clase.horaInicio?.toFormat(
                        "T"
                      )} - ${clase.horaFin?.toFormat("T")}`,
                      buttonLabel: "Reservar",
                      onConfirm: async () => {
                        if (!usuario || !id || !clase.idClase) {
                          createToast("error", {
                            title: "Mal envio de datos",
                          });
                          return true;
                        }
                        const result = await postReservarAPI({
                          cliente: {
                            idCliente: usuario.idCliente,
                          },
                          clase: {
                            idClase: clase.idClase,
                          },
                          comunidad: {
                            idComunidad: Number(id),
                          },
                        });

                        if (result) {
                          callSuccessDialog({
                            title: "Cita reservada correctamente",
                          });
                          reload();
                        } else
                          callErrorDialog({
                            title:
                              "la cita no pudo ser reservada correctamente",
                          });
                        return false;
                      },
                    });
                  }}
                >
                  <Ticket /> Reservar
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
          )}

          {clase.estado === "Reservada" && (
            <div className="p-2">
              <Button
                variant="danger"
                onClick={() => {
                  callAlertDialog({
                    title: "¿Quieres cancelar esta reserva?",
                    description: `${clase.horaInicio?.toFormat(
                      "T"
                    )} - ${clase.horaFin?.toFormat("T")}`,
                    buttonLabel: "Cancelar",
                    onConfirm: async () => {
                      if (!usuario || !id) {
                        createToast("error", {
                          title: "Mal envio de datos",
                        });
                        return true;
                      }
                      // const result = await deleteReservaAPI(citaMedica.);

                      // if (result)
                      //   callSuccessDialog({
                      //     title: "Cita reservada correctamente",
                      //   });
                      // else
                      //   callErrorDialog({
                      //     title: "la cita no pudo ser reservada correctamente",
                      //   });
                      return false;
                    },
                  });
                }}
              >
                <Ban /> Cancelar Reserva
              </Button>
            </div>
          )}
        </HoverCardContent>
      </HoverCard>
    </>
  );
}
