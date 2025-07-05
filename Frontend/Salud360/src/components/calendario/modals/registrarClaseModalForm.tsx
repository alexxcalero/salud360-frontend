import Input from "@/components/input/Input";
import { CalendarInput } from "@/components/input/CalendarInput";
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
import { FormEvent, useMemo, useState } from "react";
import Button from "@/components/Button";
import { useFetchHandler } from "@/hooks/useFetchHandler";
import { useInternalModals } from "@/hooks/useInternalModals";
import { localType } from "@/schemas/local";
import { postClaseAPI } from "@/services/clasesAdmin.service";
import TextAreaInput from "@/components/input/TextAreaInput";

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
  // const [capacidad, setCapacidad] = useState("");

  const [horaInicio, setHoraInicio] = useState(date?.toFormat("T") ?? "");
  const horaFin = useMemo(
    () =>
      DateTime.fromFormat(horaInicio, "T").plus({ hour: 1 }).toFormat("T") ??
      "00:00",
    [horaInicio]
  );

  const [dateInput, setDateInput] = useState<DateTime>(date ?? DateTime.now());

  const { fetch } = useFetchHandler();
  const { createToast } = useToasts();

  const submitHanlder = async (e: FormEvent) => {
    e.preventDefault();

    if (
      dateInput &&
      dateInput.set({
        hour: DateTime.fromISO(horaInicio).hour,
        minute: DateTime.fromISO(horaInicio).minute,
      }) < DateTime.now()
    ) {
      createToast("error", {
        title: "La fecha debe ser posterior al presente",
      });
      return;
    }

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
              <div className="p-4 bg-blue-700/10 border-1 border-blue-500 rounded-md text-blue-500">
                <p>
                  La <strong>capacidad total</strong> de alumnos será{" "}
                  <strong>asignada automáticamente</strong>{" "}por el sistema.
                </p>
              </div>
              <Input
                name="nombre"
                placeholder="Ingrese el nombre"
                label="Nombre"
                required={true}
                value={nombre}
                setValue={setNombre}
              />
              <TextAreaInput
                name="description"
                placeholder="Descripcion..."
                label="Descripcion"
                required={true}
                value={descripcion}
                setValue={setDescripcion}
                reserveSpace={true}
              />
              {/* Poner un card
              <Input
                name="capacidad"
                placeholder="Esto se asignará con la capacidad por defecto"
                label="Capacidad"
                type="number"
                // value={capacidad}
                // setValue={setCapacidad}
                disabled={true}
              /> */}

              <CalendarInput
                value={dateInput}
                setValue={setDateInput}
                name="dia"
                label="Fecha"
                required={true}
                format="DDDD"
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
                  setValue={() => {}}
                  disabled={true}
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
