import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Button from "../Button";
import { Pencil, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { useInternalModals } from "@/hooks/useInternalModals";
import { useDialog } from "@/hooks/dialogContext";
import { claseDTOType } from "@/schemas/clase";
import {
  deleteClaseAPI,
  reactivarClaseAPI,
} from "@/services/clasesAdmin.service";
import ActualizarClaseModalForm from "./modals/actualizarClaseForm";

const AdminClaseDot = ({ clase }: { clase: claseDTOType }) => {
  const { callAlertDialog, callErrorDialog, callSuccessDialog } = useDialog();
  const { activeModal, setActiveModal, reload } = useInternalModals();
  return (
    <>
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div
            className={cn(
              "bg-blue-500 h-4 w-4 rounded-full",
              !clase.activo && "bg-neutral-500"
            )}
          ></div>
        </HoverCardTrigger>
        <HoverCardContent className="p-4">
          <h3>Cita médica</h3>
          <div>
            <p>Detalles:</p>
            <ul className="list-disc pl-6">
              {clase.estado && <li>Estado: {clase.estado}</li>}
              <li>Local: {clase.nombre} </li>
              <li>Descripcion: {clase.descripcion}</li>
              <li>
                Ubicacion: {clase.local?.nombre} ({clase.local?.direccion})
              </li>
              <li>Fecha: {clase.fecha?.toFormat("DDDD", { locale: "es" })}</li>
              <li>
                Hora: {clase.horaInicio?.toFormat("t", { locale: "es" })} -{" "}
                {clase.horaFin?.toFormat("t", { locale: "es" })}
              </li>
            </ul>
          </div>
          <div className="flex gap-4 justify-end mt-3">
            <div className="flex gap-4 mb-2">
              {clase.activo && (
                <>
                  <Button onClick={() => setActiveModal?.("actualizarCita")}>
                    <Pencil size={16} color="white" /> Editar
                  </Button>

                  <Button
                    variant="danger"
                    onClick={() =>
                      callAlertDialog({
                        title: "¿Estás seguro que quieres eliminar esto?",
                        onConfirm: async () => {
                          if (!clase.idClase) return false;
                          const response = await deleteClaseAPI(clase.idClase);
                          if (response) {
                            callSuccessDialog({
                              title: "La cita fue eliminada con exito",
                            });
                            reload();
                            return false;
                          }
                          callErrorDialog({
                            title: "No se pudo eliminar la cita",
                          });
                          return true;
                        },
                      })
                    }
                  >
                    <Trash size={16} color="white" /> Eliminar
                  </Button>
                </>
              )}
              {!clase.activo && (
                <div className="p-2">
                  <Button
                    onClick={() =>
                      callAlertDialog({
                        title: "¿Estás seguro que quieres reactivar esto?",
                        buttonLabel: "Restaurar",
                        onConfirm: async () => {
                          if (!clase.idClase) return false;
                          const response = await reactivarClaseAPI(
                            clase.idClase
                          );
                          if (response) {
                            callSuccessDialog({
                              title: "La cita fue eliminada con exito",
                            });
                            reload();
                            return false;
                          }
                          callErrorDialog({
                            title: "No se pudo eliminar la cita",
                          });
                          return true;
                        },
                      })
                    }
                  >
                    Reactivar
                  </Button>
                </div>
              )}
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
      {clase.activo && (
        <ActualizarClaseModalForm
          open={activeModal === "actualizarCita"}
          setOpen={(b) =>
            b ? setActiveModal?.("actualizarCita") : setActiveModal?.("")
          }
          clase={clase}
        />
      )}
    </>
  );
};

export default AdminClaseDot;
