import Input from "@/components/input/Input";
import { CalendarInput } from "@/components/input/CalendarInput";
import SelectLabel from "@/components/SelectLabel";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToasts } from "@/hooks/ToastContext";
import { DateTime } from "luxon";
import { FormEvent, useState } from "react";
import Button from "@/components/Button";
import { useFetchHandler } from "@/hooks/useFetchHandler";
import { useInternalModals } from "@/hooks/useInternalModals";
import { localType } from "@/schemas/local";
import { postClaseAPI } from "@/services/clasesAdmin.service";

const RegistrarClaseModalForm = ({
  open,
  setOpen,
  onCreate,
  local,
  date,
}: {
  open: boolean;
  setOpen: (_: boolean) => void;
  local: localType;
  date?: DateTime;
  onCreate?: () => void;
}) => {
  const { reload } = useInternalModals();

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [capacidad, setCapacidad] = useState("");

  const [horaInicio, setHoraInicio] = useState(date?.toFormat("T") ?? "");
  const [horaFin, setHoraFin] = useState(
    date?.plus({ hour: 1 }).toFormat("T") ?? ""
  );

  const [dateInput, setDateInput] = useState<DateTime>(date ?? DateTime.now());

  const { fetch } = useFetchHandler();
  const { createToast } = useToasts();

  const submitHanlder = async (e: FormEvent) => {
    e.preventDefault();

    const diferenciaDeHoras = DateTime.fromISO(horaFin).diff(
      DateTime.fromISO(horaInicio),
      ["hour", "day", "month", "year"]
    ).hours;

    if (
      (date
        ?.set({
          hour: DateTime.fromISO(horaInicio).hour,
          minute: DateTime.fromISO(horaInicio).minute,
        })
        .diff(DateTime.now()).milliseconds ?? 0) < 0
    ) {
      createToast("error", {
        title: "Error al ingresar la fecha",
        description: "La fecha no puede ser pasada",
      });
      return;
    }
    if (diferenciaDeHoras < 0) {
      createToast("error", {
        title: "Error al ingressar horas",
        description: "La hora final no debe ir antes que hora de inicio",
      });
      return;
    }
    if (diferenciaDeHoras < 0.5) {
      createToast("error", {
        title: "Error al ingressar horas",
        description:
          "Las horas deben estar separadas por, al menos, 30 minutos",
      });
      return;
    }

    const uploadData = {
      nombre,
      descripcion,
      capacidad,
      horaInicio: horaInicio,
      horaFin: horaFin,
      fecha: dateInput.toISODate(),
      estado: "Disponible",
      local,
    };

    fetch(async () => {
      await postClaseAPI(uploadData);
      setOpen(false);
      onCreate?.();
      createToast("success", { title: "Cita actualizada correctamente" });
      reload();
    });
  };
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <form action="" onSubmit={submitHanlder}>
            <DialogTitle>Registrar clase</DialogTitle>
            <DialogDescription>Llena el formulario </DialogDescription>
            <div className="my-4 flex flex-col gap-4">
              <Input
                name="nombre"
                placeholder="Ingrese el nombre"
                label="Nombre"
                required={true}
                value={nombre}
                setValue={setNombre}
              />
              <Input
                name="description"
                placeholder="Descripcion..."
                label="Descripcion"
                required={true}
                value={descripcion}
                setValue={setDescripcion}
              />
              <Input
                name="capacidad"
                placeholder="Capacidad..."
                label="Capacidad"
                required={true}
                type="number"
                value={capacidad}
                setValue={setCapacidad}
              />

              <CalendarInput
                value={dateInput}
                setValue={setDateInput}
                name="dia"
                label="Fecha"
                required={true}
              />

              <div className="flex gap-2">
                <Input
                  name="hora-inicio"
                  required={true}
                  placeholder="Hora de inicio"
                  label="Hora de inicio"
                  value={horaInicio}
                  setValue={setHoraInicio}
                  type="time"
                />
                <Input
                  name="hora-fin"
                  required={true}
                  placeholder="Hora fin"
                  value={horaFin}
                  setValue={setHoraFin}
                  label="Hora fin"
                  type="time"
                />
              </div>
            </div>
            <DialogFooter className="flex justify-end gap-2">
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button type="submit">Registrar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RegistrarClaseModalForm;
