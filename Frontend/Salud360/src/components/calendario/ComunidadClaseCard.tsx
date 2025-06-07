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

export function ComunidadClaseCard({ clase }: { clase: claseDTOType }) {
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
            color="pink"
            active={clase.activo ?? true}
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
        <HoverCardContent>
          {clase.estado !== "Reservada" && (
            <div className="p-2">
              <div className="flex gap-4 mb-2">
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
