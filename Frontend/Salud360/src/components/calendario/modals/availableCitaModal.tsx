import Button from "@/components/Button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { citaMedicaType } from "@/schemas/citaMedica";
import { CalendarPlus } from "lucide-react";
import { useState } from "react";
import AgendarCitaModalForm from "./agendarCitaModalForm";

//Hora: {citaMedica.hora.toFormat("t", { locale: "es" })}
const AvailableCitaModal = ({
  citaMedica,
  open,
  setOpen,
}: {
  citaMedica: citaMedicaType;
  open: boolean;
  setOpen: (_: boolean) => void;
}) => {
  const [openNext, setOpenNext] = useState(false);
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>
            ¿Desea reservar su cita médica con {citaMedica.medico?.apellidos}?
          </DialogTitle>
          <div>
            <p>
              Dia: {citaMedica.fecha?.toFormat("DDDD", { locale: "es" })}
              Hora: {citaMedica.horaInicio?.toFormat("t")} - {citaMedica.horaFin?.toFormat("t")}
            </p>
          </div>
          <div className="flex justify-end items-center gap-4">
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button
              onClick={() => {
                // setOpen(false);
                setOpenNext(true);
              }}
            >
              <CalendarPlus /> Agendar
            </Button>
            <AgendarCitaModalForm
              open={openNext}
              setOpen={setOpenNext}
              citaMedica={citaMedica}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AvailableCitaModal;
