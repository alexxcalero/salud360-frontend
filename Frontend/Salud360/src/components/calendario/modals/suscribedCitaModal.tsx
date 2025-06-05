import Button from "@/components/Button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useDialog } from "@/hooks/dialogContext";
import { citaMedicaType } from "@/schemas/citaMedica";
import { Ban, CalendarClock } from "lucide-react";
import PostergarCitaModal from "./postergarCitaModal";
import { useState } from "react";

const SuscribedCitaModal = ({
  citaMedica,
  open,
  setOpen,
}: {
  citaMedica: citaMedicaType;
  open: boolean;
  setOpen: (_: boolean) => void;
}) => {
  const { callAlertDialog } = useDialog();
  const [openNext, setOpenNext] = useState(false);
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>
            Detalles de su cita con el/la Dr(a). {citaMedica.medico.apellidos}{" "}
            en la especialidad {citaMedica.medico.especialidad}
          </DialogTitle>
          <p>
            <ul className="list-disc pl-6">
              <li>
                Dia: {citaMedica.fecha.toFormat("DDDD", { locale: "es" })}
              </li>
              <li>Hora: {citaMedica.hora.toFormat("t", { locale: "es" })}</li>
            </ul>
          </p>
          <div className="flex gap-4 mt-2">
            <Button onClick={() => setOpenNext(true)}>
              <CalendarClock /> Postergar
            </Button>
            <PostergarCitaModal
              citaMedica={citaMedica}
              open={openNext}
              setOpen={setOpenNext}
            />
            <Button
              variant="danger"
              onClick={() => {
                callAlertDialog({
                  title: "¿Estás seguro que quieres anular esta cita?",
                  description: "El cambio será irrevertible",
                });
                setOpen(false);
              }}
            >
              <Ban /> Anular
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SuscribedCitaModal;
