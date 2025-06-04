import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { extenedCitaMedicaType } from "@/schemas/citaMedica";
import Button from "../Button";
import { Pencil, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { useInternalModals } from "@/hooks/useInternalModals";
import { useDialog } from "@/hooks/dialogContext";
import {
  deleteCitaMedicaAPI,
  reactivarCitaMedicaAPI,
} from "@/services/citasMedicasAdmin.service";
import ActualizarCitaModalForm from "./modals/actualizarCitaModalForm";

const AdminCitaMedicaDot = ({
  citaMedica,
}: {
  citaMedica: extenedCitaMedicaType;
}) => {
  const { callAlertDialog, callErrorDialog, callSuccessDialog } = useDialog();
  const { activeModal, setActiveModal, reload } = useInternalModals();
  return (
    <>
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div
            className={cn(
              "bg-blue-500 h-4 w-4 rounded-full",
              !citaMedica.activo && "bg-neutral-500"
            )}
          ></div>
        </HoverCardTrigger>
        <HoverCardContent className="p-4">
          <h3>Cita mèdica</h3>
          <div>
            <p>Detalles:</p>
            <ul className="list-disc pl-6">
              {citaMedica.estado && <li>Estado: {citaMedica.estado}</li>}
              <li>
                Dr(a): {citaMedica.medico?.nombres}{" "}
                {citaMedica.medico?.apellidos}
              </li>
              <li>Especialidad: {citaMedica.medico?.especialidad}</li>
              <li>
                Fecha: {citaMedica.fecha?.toFormat("DDDD", { locale: "es" })}
              </li>
              <li>
                Hora: {citaMedica.horaInicio?.toFormat("t", { locale: "es" })} -{" "}
                {citaMedica.horaFin?.toFormat("t", { locale: "es" })}
              </li>
            </ul>
          </div>
          <div className="flex gap-4 justify-end mt-3">
            <div className="flex gap-4 mb-2">
              {citaMedica.activo && (
                <>
                  <Button onClick={() => setActiveModal?.("actualizarCita")}>
                    <Pencil size={16} color="white" /> Editar
                  </Button>

                  <Button
                    variant="danger"
                    onClick={() =>
                      callAlertDialog({
                        title: "¿Estàs seguro que quieres eliminar esto?",
                        onConfirm: async () => {
                          if (!citaMedica.idCitaMedica) return false;
                          const response = await deleteCitaMedicaAPI(
                            citaMedica.idCitaMedica
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
                    <Trash size={16} color="white" /> Eliminar
                  </Button>
                </>
              )}
              {!citaMedica.activo && (
                <div className="p-2">
                  <Button
                    onClick={() =>
                      callAlertDialog({
                        title: "¿Estàs seguro que quieres reactivar esto?",
                        buttonLabel: "Restaurar",
                        onConfirm: async () => {
                          if (!citaMedica.idCitaMedica) return false;
                          const response = await reactivarCitaMedicaAPI(
                            citaMedica.idCitaMedica
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
      {citaMedica.activo && (
        <ActualizarCitaModalForm
          open={activeModal === "actualizarCita"}
          setOpen={(b) =>
            b ? setActiveModal?.("actualizarCita") : setActiveModal?.("")
          }
          citaMedica={citaMedica}
        />
      )}
    </>
  );
};

export default AdminCitaMedicaDot;
