import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { extenedCitaMedicaType } from "@/schemas/citaMedica";
import BaseCard from "./cards/BaseCard";
import EditarCitaMedicaForm from "./form/EditarCitaMedica";
import ReactivarCitaMedicaForm from "./form/ReactivarCitaMedica";
import { cn } from "@/lib/utils";
import Time from "../time";
import { obtenerURLDescargaArchivo } from "@/services/citasMedicasAdmin.service";
import { useDialog } from "@/hooks/dialogContext";
import Button from "../Button";
import { CitaMedicaEstado } from "@/models/enums/citaMedica";

export function AdminCitaMedicaCard({
  citaMedica,
  collapsed,
}: {
  citaMedica: extenedCitaMedicaType;
  collapsed?: boolean;
}) {
  const { callErrorDialog } = useDialog();
  const handleDescargarArchivo = async () => {
    try {
      if (!citaMedica.nombreArchivo) return;
      const url = await obtenerURLDescargaArchivo(citaMedica.nombreArchivo);
      window.open(url, "_blank");
    } catch (e) {
      console.error("Error al obtener el archivo:", e);
      callErrorDialog({ title: "No se pudo abrir el archivo." });
    }
  };
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
        <HoverCardContent>
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
                    {citaMedica.medico?.nombres} {citaMedica.medico?.apellidos}
                  </span>
                  <br />
                  Especialidad:{" "}
                  <span className="text-neutral-600">
                    {citaMedica.medico?.especialidad}
                  </span>
                </p>
              </div>
              <div>
                <strong>Servicio</strong>
                <p>Nombre: {citaMedica.servicio?.nombre}</p>
                <p>Tipo: {citaMedica.servicio?.tipo}</p>
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

                  {citaMedica.nombreArchivo && (
                    <p className="text-sm text-gray-700 mb-2 break-all">
                      <strong>Archivo adjunto:</strong>{" "}
                      {citaMedica.nombreArchivo.split("_").slice(1).join("_")}
                    </p>
                  )}

                  {citaMedica.descripcion?.trim() ? (
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Descripción médica:</strong>{" "}
                      {citaMedica.descripcion}
                    </p>
                  ) : null}

                  {citaMedica.nombreArchivo ? (
                    <Button className="mt-3" onClick={handleDescargarArchivo}>
                      Descargar archivo médico
                    </Button>
                  ) : (
                    <p className="text-sm mt-2 text-gray-600">
                      No se adjuntó ningún archivo.
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Botones */}
            <div className="flex gap-4 mt-2">
              {/* El admin solo puede editar la cita y eliminarla si esta está disponible */}
              {citaMedica.activo &&
              citaMedica.estado === CitaMedicaEstado.disponible ? (
                <EditarCitaMedicaForm citaMedica={citaMedica} />
              ) : (
                !citaMedica.activo && (
                  <ReactivarCitaMedicaForm citaMedica={citaMedica} />
                )
              )}
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </>
  );
}
