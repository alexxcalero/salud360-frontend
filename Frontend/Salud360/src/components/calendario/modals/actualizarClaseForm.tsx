import Input from "@/components/input/Input";
import { CalendarInput } from "@/components/input/CalendarInput";
import SelectLabel from "@/components/SelectLabel";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToasts } from "@/hooks/ToastContext";
import { DateTime } from "luxon";
import { FormEvent, useState } from "react";
import Button from "@/components/Button";
import { putCitaMedicaAPI } from "@/services/citasMedicasAdmin.service";
import { useFetchHandler } from "@/hooks/useFetchHandler";
import { useInternalModals } from "@/hooks/useInternalModals";
import { claseDTOType } from "@/schemas/clase";

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

  const [horaInicio, setHoraInicio] = useState(clase.horaInicio?.toFormat("T"));
  const [horaFin, setHoraFin] = useState(clase.horaFin?.toFormat("T"));

  const [dateInput, setDateInput] = useState<DateTime>(
    clase.fecha ?? DateTime.now()
  );

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [capacidad, setCapacidad] = useState("");

  const [estadoInput, setEstadoInput] = useState<string>(clase.estado ?? "");

  const { fetch } = useFetchHandler();
  const { createToast } = useToasts();

  const submitHanlder = async (e: FormEvent) => {
    e.preventDefault();

    const uploadData = {
      idClase: clase.idClase,
      nombre,
      descripcion,
      capacidad,
      cantAsistentes: clase.cantAsistentes,
      horaInicio: horaInicio,
      horaFin: horaFin,
      fechaCreacion: clase.fechaCreacion,
      fechaDesactivacion: clase.fechaDesactivacion,
      activo: clase.activo,
      fecha: dateInput.toISODate(),
      estado: estadoInput,
      local: clase.local,
      cliente: clase.cliente,
      reservas: clase.reservas,
    };

    fetch(async () => {
      await putCitaMedicaAPI(uploadData);
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
            <DialogTitle>Actualizar cita mèdica</DialogTitle>
            <div className="my-4 flex flex-col gap-4">
              <p>Para: {clase.nombre}</p>

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

              <SelectLabel
                htmlFor="estado"
                label="Seleccione el estado de la cita *"
                placeholder="Seleccione un estado"
                value={estadoInput}
                onChange={setEstadoInput}
                options={[
                  { value: "Disponible", content: "Disponible" },
                  { value: "Cancelada", content: "Cancelada" },
                ]}
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

export default ActualizarClaseModalForm;
