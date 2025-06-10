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

export function ComunidadCitaMedicaCard({
  citaMedica,
}: {
  citaMedica: extenedCitaMedicaType;
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
          {citaMedica.estado !== "Reservada" && (
            <div className="p-2">
              <div className="flex gap-4 mb-2">
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
