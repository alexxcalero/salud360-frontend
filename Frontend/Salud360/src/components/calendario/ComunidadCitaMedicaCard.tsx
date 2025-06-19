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
import { useContext, useState } from "react";
import { AuthContext } from "@/hooks/AuthContext";
import { useParams } from "react-router";
import { useToasts } from "@/hooks/ToastContext";
import { useInternalModals } from "@/hooks/useInternalModals";
import Time from "../time";
import { cn } from "@/lib/utils";

//Para el formulario
import ModalFormularioReserva from "./modals/ModalFormularioReserva";


export function ComunidadCitaMedicaCard({
  citaMedica,
  collapsed = false,
}: {
  citaMedica: extenedCitaMedicaType;
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
  const { id } = useParams();

  const { reload } = useInternalModals();


  //Para el formulario
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const handleReservaConFormulario = async (descripcion: string, archivo?: File) => {
    try {
      let nombreArchivo;

      if (archivo) {
        const formData = new FormData();
        formData.append("archivo", archivo);
        const res = await fetch("/api/archivo", {
          method: "POST",
          body: formData,
        });
        if (!res.ok) {
          throw new Error("No se pudo subir el archivo");
        }

        const data = await res.json();
        nombreArchivo = data.nombreArchivo;
      }

      const result = await postReservarAPI({
        cliente: { idCliente: usuario.idCliente },
        citaMedica: { idCitaMedica: citaMedica.idCitaMedica },
        comunidad: { idComunidad: Number(id) },
        nombreArchivo, // LO NUEVO PARA DESCARGA
        descripcion, // LO NUEVO PARA DESCARGA
      });

      if (result) {
        callSuccessDialog({ title: "Cita reservada correctamente" });
        reload();
      } else {
        callErrorDialog({ title: "La cita no pudo ser reservada correctamente" });
      }
    } catch (e) {
      console.error(e);
      callErrorDialog({ title: "Error durante la reserva" });
    }
  };


  const handleDescargarArchivo = async () => {
    try {
      if (!citaMedica.nombreArchivo) return;
      const res = await fetch(`/api/archivo/${citaMedica.nombreArchivo}`);
      if (!res.ok) throw new Error("Error al obtener el archivo");
      const data = await res.json();
      window.open(data.url, "_blank");
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
              {/* Mostrar el formulario*/}
              <div className="flex gap-4 mt-2">
                <Button onClick={() => setMostrarFormulario(true)}>
                  <Ticket /> Reservar
                </Button>
              </div>
            </div>
          )}

          {citaMedica.estado === "Reservada" && (
            <div className="p-2 flex flex-col gap-2">
              {/* Mostrar descripción si existe */}
              {citaMedica.descripcion && (
                <p className="mb-2 text-sm text-gray-700">
                  <strong>Descripción médica:</strong> {citaMedica.descripcion}
                </p>
              )}
              <p className="mb-2 text-sm text-gray-700">
                  <strong>Descripción xxxx:</strong> {citaMedica.descripcion}
                </p>
                <p className="mb-2 text-sm text-gray-700">
                  <strong>Descripción asdasd:</strong> {citaMedica.nombreArchivo}
                </p>
              {/* Botón para descargar archivo médico */}
              {citaMedica.nombreArchivo ? (
                //cambie secondary por white
                <Button variant="white" onClick={handleDescargarArchivo}>
                  Descargar archivo médico
                </Button>
              ) : (
                <p className="text-sm text-gray-600">
                  No se adjuntó ningún archivo médico.
                </p>
              )}
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

      {/* Renderizado */}
      {mostrarFormulario && (
        <ModalFormularioReserva
          onClose={() => setMostrarFormulario(false)}
          onSubmit={(descripcion, archivo) => {
            setMostrarFormulario(false);
            handleReservaConFormulario(descripcion, archivo);
          }}
        />
      )}
    </>
  );
}


/*
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
import { useContext, useState } from "react";
import { AuthContext } from "@/hooks/AuthContext";
import { useParams } from "react-router";
import { useToasts } from "@/hooks/ToastContext";
import { useInternalModals } from "@/hooks/useInternalModals";
import Time from "../time";
import { cn } from "@/lib/utils";
// 🔵 NUEVO: importación del modal y useState
import ModalFormularioReserva from "./modals/ModalFormularioReserva";


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


    // 🔵 NUEVO: estado para mostrar el modal
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  // 🔵 FIN NUEVO

  // 🔵 NUEVO: función para manejar reserva luego de llenar el formulario
  const handleReservaConFormulario = async (descripcion: string, archivo?: File) => {
    try {
      let archivoId;

      if (archivo) {
        const formData = new FormData();
        formData.append("archivo", archivo);
        const res = await fetch("/api/archivo", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        archivoId = data.idArchivo;
      }

      const result = await postReservarAPI({
        cliente: { idCliente: usuario.idCliente },
        citaMedica: { idCitaMedica: citaMedica.idCitaMedica },
        comunidad: { idComunidad: Number(id) },
        //ESTO NO ESTABA ANTES PERO DEBO VER LA LÓGICA CON MI ENAMORADA ALEX
        
      });

      if (result) {
        callSuccessDialog({ title: "Cita reservada correctamente" });
        reload();
      } else {
        callErrorDialog({ title: "La cita no pudo ser reservada correctamente" });
      }
    } catch (e) {
      console.error(e);
      callErrorDialog({ title: "Error durante la reserva" });
    }
  };
  // 🔵 FIN NUEVO





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
              {/* 🔵 NUEVO: botón para abrir el formulario /}
              <div className="flex gap-4 mt-2">
                <Button onClick={() => setMostrarFormulario(true)}>
                  <Ticket /> Reservar
                </Button>
              </div>
              {/* 🔵 FIN NUEVO /}
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

      {/* 🔵 NUEVO: renderizar modal si está activo /}
      {mostrarFormulario && (
        <ModalFormularioReserva
          onClose={() => setMostrarFormulario(false)}
          onSubmit={(descripcion, archivo) => {
            setMostrarFormulario(false);
            handleReservaConFormulario(descripcion, archivo);
          }}
        />
      )}
      {/* 🔵 FIN NUEVO /}
    </>
  );
}



*/