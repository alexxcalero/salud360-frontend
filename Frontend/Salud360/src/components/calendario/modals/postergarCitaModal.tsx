import Button from "@/components/Button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { useDialog } from "@/hooks/dialogContext";
import { useLoading } from "@/hooks/LoadingContext";
import { useToasts } from "@/hooks/ToastContext";
import { citaMedicaType } from "@/schemas/citaMedica";
import { postergarCitaMedicaQuery } from "@/services/calendarioUsuario.service";
import { FormEvent } from "react";
//<li>Hora: {citaMedica.hora.toFormat("t", { locale: "es" })}</li> linea 52
const PostergarCitaModal = ({
  citaMedica,
  open,
  setOpen,
}: {
  citaMedica: citaMedicaType;
  open: boolean;
  setOpen: (_: boolean) => void;
}) => {
  const { setLoading } = useLoading();
  const { createToast } = useToasts();
  const { callErrorDialog, callSuccessDialog } = useDialog();

  const submitHanlder = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const d = await postergarCitaMedicaQuery(0, 0, "");
      if (d) callSuccessDialog({ title: "Cita postergada existosamente" });
      else callErrorDialog({ title: "La cita no pudo ser postergada" });
    } catch (error) {
      createToast("error", { title: "Un error sucediò" });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <form action="" onSubmit={submitHanlder}>
            <DialogTitle>Postergar clase</DialogTitle>
            <p>La cita que desea postergar, atualmente se dará para fecha:</p>
            <ul className="pl-6 list-disc">
              <li>
                Dia: {citaMedica.fecha?.toFormat("DDDD", { locale: "es" })}
              </li>
              <li>Hora: {citaMedica.horaInicio?.toFormat("t")} - {citaMedica.horaFin?.toFormat("t")}</li>
            </ul>
            {/** Inputs */}
            <div className="flex justify-end items-center gap-4">
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button type="submit">Continuar</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PostergarCitaModal;
