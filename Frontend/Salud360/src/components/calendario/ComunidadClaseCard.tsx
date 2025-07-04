import { claseDTOType } from "@/schemas/clase";

import BaseCard from "./cards/BaseCard";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useParams } from "react-router";
import Time from "../time";
import { cn } from "@/lib/utils";
import { ClaseEstado } from "@/models/enums/clase";
import ReservarClaseForm from "./form/ReservarClase";
import CancelarClaseForm from "./form/CancelarClase";
import { useContext } from "react";
import { AuthContext } from "@/hooks/AuthContext";

export function ComunidadClaseCard({
  clase,
  collapsed,
}: {
  clase: claseDTOType;
  collapsed?: boolean;
}) {
  const { id } = useParams();

  const { usuario } = useContext(AuthContext);
  if (
    clase.clientes?.findIndex((c) => c.idCliente === usuario.idCliente) !== -1
  )
    return;

  return (
    <>
      <HoverCard openDelay={300}>
        <HoverCardTrigger asChild>
          {/* Esto es por un problema del backend */}
          <BaseCard
            collapsed={collapsed}
            color={
              clase.estado === "Disponible"
                ? "pink"
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
              {/* Solucionar esto, considerar separarlo de las otras cards */}
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
              {clase.clientes && clase.clientes.length !== 0 && (
                <div className="bg-green-200 border-1 border-green-600 rounded-md p-4 mt-4">
                  <strong className="text-green-800">
                    Clase ya está reservada por {clase.clientes.length}{" "}
                    {clase.clientes.length === 1 ? "cliente" : "clientes"}
                  </strong>
                </div>
              )}
            </div>
            <div className="flex gap-4 mt-2">
              {clase.estado === ClaseEstado.disponible && (
                <ReservarClaseForm clase={clase} id={id} />
              )}

              {clase.estado === ClaseEstado.completa && (
                <CancelarClaseForm clase={clase} id={id} />
              )}
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </>
  );
}
