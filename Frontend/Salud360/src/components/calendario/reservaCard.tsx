import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import BaseCard from "./cards/BaseCard";
import { reservaType } from "@/schemas/reserva";
import ConfirmReservaForm from "./form/ConfirmReserva";
import { ReservaEnum } from "@/models/enums/reserva";
import Button from "../Button";
import { useDialog } from "@/hooks/dialogContext";
import Time from "../time";
import { DateTime } from "luxon";

export function ReservaCard({
  reserva,
  collapsed = false,
}: {
  reserva: reservaType;
  collapsed?: boolean;
}) {
  const { callErrorDialog } = useDialog();
  const fechaActual = DateTime.now();
  const fechaMaxCancelacionReserva = DateTime.fromISO(
    reserva.fechaMaxCancelacion ?? DateTime.now().toISO()
  ).set({
    hour: DateTime.fromISO(reserva.horaMaxCancelacion ?? "00:00").hour,
    minute: DateTime.fromISO(reserva.horaMaxCancelacion ?? "00:00").minute,
  });

  return (
    <>
      <HoverCard openDelay={300}>
        <HoverCardTrigger asChild>
          <BaseCard
            collapsed={collapsed}
            color={reserva.estado === "Confirmada" ? "green" : "red"}
            date={
              reserva.citaMedica?.fecha?.set({
                hour: reserva.citaMedica?.horaInicio?.hour,
                minute: reserva.citaMedica?.horaInicio?.minute,
              }) ??
              reserva.clase?.fecha?.set({
                hour: reserva.clase?.horaInicio?.hour,
                minute: reserva.clase?.horaInicio?.minute,
              })
            }
          >
            <div className="flex items-center justify-between">
              <span className="use-label-large font-semibold">
                {reserva.citaMedica?.medico?.nombres}
                {reserva.clase?.nombre}
              </span>
            </div>
            <span className="use-label-large font-medium text-left">
              {reserva.clase?.horaInicio?.toFormat("T") ??
                reserva.citaMedica?.horaInicio?.toFormat("T")}{" "}
              -{" "}
              {reserva.clase?.horaFin?.toFormat("T") ??
                reserva.citaMedica?.horaFin?.toFormat("T")}
            </span>
          </BaseCard>
        </HoverCardTrigger>
        <HoverCardContent className="w-max">
          {/** Mostrar fecha y hora */}
          <div className="p-2 flex flex-col gap-2">
            <strong role="heading">
              Reserva de {reserva.clase && "clase"}{" "}
              {reserva.citaMedica && "Cita médica"}
            </strong>
            {reserva.estado !== ReservaEnum.cancelada && (
              <>
                {reserva.fechaMaxCancelacion &&
                  reserva.horaMaxCancelacion &&
                  (fechaActual < fechaMaxCancelacionReserva ? (
                    <div className="text-sm text-yellow-600 bg-yellow-500/20 p-4 rounded-md border-1 border-yellow-700">
                      Puede cancelar hasta antes de{" "}
                      <Time
                        type="datetime"
                        dateTime={fechaMaxCancelacionReserva}
                      />
                      <br />
                      <span>Quedan</span>
                      <strong>
                        {fechaMaxCancelacionReserva
                          .diff(fechaActual, [
                            "days",
                            "hours",
                            "minutes",
                            "seconds",
                          ])
                          .toFormat(
                            " d 'días' h 'horas' m 'minutos' s 'segundos'"
                          )}
                      </strong>
                    </div>
                  ) : (
                    <div className="text-sm text-red-600 bg-red-500/20 p-4 rounded-md border-1 border-red-700">
                      <strong>
                        No puede cancelar esta reserva, ya que ha pasado el
                        tiempo límite.
                      </strong>
                    </div>
                  ))}
                <p className="text-sm text-gray-600">
                  Fecha y hora de inicio:{" "}
                  {reserva.clase?.fecha?.toFormat("DDDD", { locale: "es" }) ??
                    reserva.citaMedica?.fecha?.toFormat("DDDD", {
                      locale: "es",
                    })}
                  {reserva.clase?.horaInicio?.toFormat(" t", {
                    locale: "es",
                  }) ??
                    reserva.citaMedica?.horaInicio?.toFormat(" t", {
                      locale: "es",
                    })}
                </p>
                {/* mOSTRAR DESCRIPCIÓN SI TIENE */}
                {reserva.descripcion && (
                  <p className="mb-2 text-sm text-gray-700">
                    <strong>Descripción médica:</strong> {reserva.descripcion}
                  </p>
                )}

                {/* BOTON DE DESCARGA DE ARCHIVO SI SUBIO UNO */}
                {reserva.nombreArchivo ? (
                  <Button
                    variant="primary"
                    className="mt-2"
                    onClick={async () => {
                      try {
                        const res = await fetch(
                          `/api/reservas/archivo-url/${reserva.nombreArchivo}`
                        );
                        const url = await res.text();
                        window.open(url, "_blank");
                      } catch (e) {
                        console.error("Error al obtener el archivo:", e);
                        callErrorDialog({
                          title: "No se pudo abrir el archivo.",
                        });
                      }
                    }}
                  >
                    Descargar archivo médico
                  </Button>
                ) : (
                  <p className="mt-2 text-sm text-gray-600">
                    No se adjuntó ningún archivo médico.
                  </p>
                )}
              </>
            )}

            <div className="flex gap-4 mt-2">
              {reserva.estado === ReservaEnum.confirmada && (
                <ConfirmReservaForm reserva={reserva} />
              )}
              {reserva.estado === ReservaEnum.cancelada && (
                <div>
                  <strong className="text-red-400">Cancelada</strong>
                </div>
              )}
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </>
  );
}
