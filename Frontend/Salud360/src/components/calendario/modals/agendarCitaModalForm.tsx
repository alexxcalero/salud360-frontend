import Button from "@/components/Button";
import FileInput from "@/components/input/FileInput";
import Input from "@/components/input/Input";
import {
  DialogContent,
  DialogTitle,
  Dialog,
  DialogClose,
} from "@/components/ui/dialog";
import { useDialog } from "@/hooks/dialogContext";
import { useLoading } from "@/hooks/LoadingContext";
import { useToasts } from "@/hooks/ToastContext";

import { citaMedicaType } from "@/schemas/citaMedica";
import { reservarCitaMedica } from "@/services/calendarioUsuario.service";
import { FormEvent } from "react";

const AgendarCitaModalForm = ({
  open,
  setOpen,
  citaMedica: { idCitaMedica },
}: {
  open: boolean;
  setOpen: (_: boolean) => void;
  citaMedica: citaMedicaType;
}) => {
  const { setLoading } = useLoading();
  const { createToast } = useToasts();
  const { callSuccessDialog } = useDialog();

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const reservarEvent = async () => {
      setLoading(true);
      try {
        if (!idCitaMedica) throw new Error("Id no deberìa ser indefinido");
        const d = await reservarCitaMedica(idCitaMedica);
        if (d) {
          callSuccessDialog({ title: "Cita agendada correctamente" });
        }
      } catch (error) {
        createToast("error", { title: "Error al realizar la reserva" });
      } finally {
        setLoading(false);
      }
    };

    reservarEvent();
  };
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <form onSubmit={submitHandler} action="">
            <DialogTitle>Formulario de agenda de cita médica</DialogTitle>
            <div className="flex gap-4 my-2">
              <Input
                name="nombres"
                label="Nombres"
                placeholder="Fabian"
                required={true}
              />
              <Input
                name="apellidos"
                label="Apellidos"
                placeholder="Montenegro"
                required={true}
              />
            </div>
            <Input
              name="correo"
              label="Correo elecctronico"
              placeholder="fabia@monos.supremos"
              required={true}
            />
            {/** Description */}

            <label htmlFor="">Documentos</label>
            <p className="text-neutral-700 my-2">
              El envio de los documentos. En caso no se envie algún archivo, se
              enviará un enlace por correo para enviarlo
            </p>
            <FileInput name="archivos" />
            <div className="flex justify-end items-center gap-4 mt-4">
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

export default AgendarCitaModalForm;
