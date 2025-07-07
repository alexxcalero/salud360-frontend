import Input from "@/components/input/Input";
import { CalendarInput } from "@/components/input/CalendarInput";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToasts } from "@/hooks/ToastContext";
import { DateTime } from "luxon";
import { FormEvent, useMemo, useState } from "react";
import Button from "@/components/Button";
import { useFetchHandler } from "@/hooks/useFetchHandler";
import { useInternalModals } from "@/hooks/useInternalModals";
import { claseDTOType } from "@/schemas/clase";
import { DialogDescription } from "@radix-ui/react-dialog";
import { putClaseAPI } from "@/services/clasesAdmin.service";
import TextAreaInput from "@/components/input/TextAreaInput";

const ActualizarClaseModalForm = ({
  open,
  setOpen,
  onCreate,
  clase,
}: {
  open: boolean;
  setOpen: (_: boolean) => void;
  clase: claseDTOType;
  onCreate?: () => void;
}) => {
  const { reload } = useInternalModals();

  const [horaInicio, setHoraInicio] = useState(
    clase.horaInicio?.toFormat("T") ?? ""
  );
  const horaFin = useMemo(
    () =>
      DateTime.fromFormat(horaInicio, "T").plus({ hour: 1 }).toFormat("T") ??
      "00:00",
    [horaInicio]
  );

  const [dateInput, setDateInput] = useState<DateTime>(
    clase.fecha ?? DateTime.now()
  );

  const [nombre, setNombre] = useState(clase.nombre ?? "");
  const [descripcion, setDescripcion] = useState(clase.descripcion ?? "");
  const [capacidad, setCapacidad] = useState(clase.capacidad?.toString() ?? "");

  // const [estadoInput, setEstadoInput] = useState<string>(clase.estado ?? "");

  const { fetch } = useFetchHandler();
  const { createToast } = useToasts();

  const submitHanlder = async (e: FormEvent) => {
    e.preventDefault();

    if (
      (dateInput
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

    const diferenciaDeHoras = DateTime.fromISO(horaFin).diff(
      DateTime.fromISO(horaInicio),
      ["hour", "day", "month", "year"]
    ).hours;
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
      idClase: clase.idClase,
      nombre,
      descripcion,
      capacidad,
      horaInicio: horaInicio,
      horaFin: horaFin,
      fecha: dateInput.toISODate(),
    };

    //console.log(uploadData);

    fetch(async () => {
      await putClaseAPI(uploadData);
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
            <DialogTitle>Actualizar cita médica</DialogTitle>
            <div className="my-4 flex flex-col gap-4">
              <DialogDescription>Para: {clase.nombre}</DialogDescription>

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
              />
              <Input
                name="capacidad"
                placeholder="Capacidad..."
                label="Capacidad"
                type="number"
                value={capacidad}
                setValue={setCapacidad}
                disabled={true}
              />

              <CalendarInput
                value={dateInput}
                setValue={setDateInput}
                name="dia"
                label="Fecha"
                required={true}
              />

              {/* <SelectLabel
                htmlFor="estado"
                label="Seleccione el estado de la cita *"
                placeholder="Seleccione un estado"
                value={estadoInput}
                onChange={setEstadoInput}
                options={[
                  { value: "Disponible", content: "Disponible" },
                  { value: "Cancelada", content: "Cancelada" },
                ]}
              /> */}

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
              <Button type="submit">Acturalizar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ActualizarClaseModalForm;
