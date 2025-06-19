import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import BaseCard from "./cards/BaseCard";
import Button from "../Button";
import { Ban } from "lucide-react";
import { useDialog } from "@/hooks/dialogContext";
import { deleteReservaAPI } from "@/services/reservas.service";
import { useContext } from "react";
import { AuthContext } from "@/hooks/AuthContext";
import { useToasts } from "@/hooks/ToastContext";
import { reservaType } from "@/schemas/reserva";
import { useInternalModals } from "@/hooks/useInternalModals";

export function ReservaCard({
  reserva,
  collapsed = false,
}: {
  reserva: reservaType;
  collapsed?: boolean;
}) {
  const {
    //callInfoDialog,
    callSuccessDialog,
    callErrorDialog,
    callAlertDialog,
  } = useDialog();
  const { createToast } = useToasts();
  const { usuario } = useContext(AuthContext);
  const { reload } = useInternalModals();

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
          {reserva.estado === "Confirmada" && (

            
            <div className="p-2 flex flex-col gap-2">

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
                    callErrorDialog({ title: "No se pudo abrir el archivo." });
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


              <Button
                variant="danger"
                onClick={() => {
                  callAlertDialog({
                    title: "¿Quieres cancelar esta reserva?",
                    description: `${
                      reserva.clase?.horaInicio?.toFormat("T") ??
                      reserva.citaMedica?.horaInicio?.toFormat("T")
                    } - ${
                      reserva.clase?.horaFin?.toFormat("T") ??
                      reserva.citaMedica?.horaFin?.toFormat("T")
                    }`,
                    buttonLabel: "Cancelar",
                    onConfirm: async () => {
                      if (!usuario || !reserva.idReserva) {
                        createToast("error", {
                          title: "Mal envio de datos",
                        });
                        return true;
                      }
                      const result = await deleteReservaAPI(reserva.idReserva);

                      if (result) {
                        callSuccessDialog({
                          title: "Reserva cancelada correctamente",
                        });
                        reload();
                      } else
                        callErrorDialog({
                          title:
                            "La reserva no pudo ser cancelada correctamente",
                        });
                      return false;
                    },
                  });
                }}
              >
                <Ban /> Cancelar Reserva
              
              </Button>
              

            
            </div>
            
          )}
          {reserva.estado === "Cancelada" && (
            <div className="p-2">
              <strong>Cancelada</strong>
            </div>
          )}
        </HoverCardContent>
      </HoverCard>
    </>
  );
}
