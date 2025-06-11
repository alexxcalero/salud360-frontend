import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { extenedCitaMedicaType } from "@/schemas/citaMedica";
import BaseCard from "./cards/BaseCard";
import Button from "../Button";
import { Ban, Ticket } from "lucide-react";
import { useDialog } from "@/hooks/dialogContext";
import { postReservarAPI } from "@/services/reservas.service";
import { useContext } from "react";
import { AuthContext } from "@/hooks/AuthContext";
import { useParams } from "react-router";
import { useToasts } from "@/hooks/ToastContext";
import { useInternalModals } from "@/hooks/useInternalModals";
import Time from "../time";
import { cn } from "@/lib/utils";

export function ComunidadCitaMedicaCard({
  citaMedica,
  collapsed = false,
}: {
  citaMedica: extenedCitaMedicaType;
  collapsed?: boolean;
}) {
  const {
    callInfoDialog,
    callSuccessDialog,
    callErrorDialog,
    callAlertDialog,
  } = useDialog();
  const { createToast } = useToasts();
  const { usuario } = useContext(AuthContext);
  const { id } = useParams();

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
        <HoverCardContent className="w-max">
          {citaMedica.estado !== "Reservada" && (
            <div className="p-2">
              <div>
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
              </div>
              <div className="flex gap-4 mt-2">
                <Button
                  onClick={() => {
                    callInfoDialog({
                      title: "¿Quieres reservar esta cita médica?",
                      description: `${citaMedica.horaInicio?.toFormat(
                        "T"
                      )} - ${citaMedica.horaFin?.toFormat("T")}`,
                      buttonLabel: "Reservar",
                      onConfirm: async () => {
                        if (!usuario || !id || !citaMedica.idCitaMedica) {
                          createToast("error", {
                            title: "Mal envio de datos",
                          });
                          return true;
                        }
                        const result = await postReservarAPI({
                          cliente: {
                            idCliente: usuario.idCliente,
                          },
                          citaMedica: {
                            idCitaMedica: citaMedica.idCitaMedica,
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
            </div>
          )}

          {citaMedica.estado === "Reservada" && (
            <div className="p-2">
              <Button
                variant="danger"
                onClick={() => {
                  callAlertDialog({
                    title: "¿Quieres cancelar esta reserva?",
                    description: `${citaMedica.horaInicio?.toFormat(
                      "T"
                    )} - ${citaMedica.horaFin?.toFormat("T")}`,
                    buttonLabel: "Cancelar",
                    onConfirm: async () => {
                      if (!usuario || !id) {
                        createToast("error", {
                          title: "Mal envio de datos",
                        });
                        return true;
                      }
                      reload();
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
