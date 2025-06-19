import { claseDTOType } from "@/schemas/clase";

import BaseCard from "./cards/BaseCard";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import EditarClaseForm from "./form/EditarClase";
import ReactivarClaseForm from "./form/ReactivarClase";
import Time from "../time";
import { cn } from "@/lib/utils";
import { ClaseEstado } from "@/models/enums/clase";

export function AdminClaseCard({
  clase,
  collapsed,
}: {
  clase: claseDTOType;
  collapsed?: boolean;
}) {
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
                    clase.estado === ClaseEstado.completa && "bg-green-500",
                    clase.estado === ClaseEstado.finalizada && "bg-red-500",
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
                    {clase.local?.nombre} ({clase.local?.direccion})
                  </span>
                </p>
              </div>
              {clase.clientes && clase.clientes.length !== 0 && (
                <div className="bg-green-200 border-1 border-green-600 rounded-md p-4 mt-4">
                  <strong className="text-green-800">
                    Clase ya reservada por:
                  </strong>
                  {clase.clientes.map((client) => (
                    <p className="text-green-600" key={client.idCliente}>
                      {client?.nombres} {client?.apellidos} - {client?.correo}
                    </p>
                  ))}
                </div>
              )}
            </div>
            {/* Botones */}
            <div className="flex gap-4 mt-2">
              {/* El admin solo puede editar la clase y eliminarla si esta está disponible */}
              {clase.activo && clase.estado === ClaseEstado.disponible ? (
                <EditarClaseForm clase={clase} />
              ) : (
                !clase.activo && <ReactivarClaseForm clase={clase} />
              )}
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </>
  );
}
