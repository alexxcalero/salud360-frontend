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
import { servicioType } from "@/schemas/servicio";
import { DateTime } from "luxon";
import { FormEvent, useEffect, useState } from "react";
import Button from "@/components/Button";
import { getServiciosAPI } from "@/services/servicio.service";
import { putCitaMedicaAPI } from "@/services/citasMedicasAdmin.service";
import { useFetchHandler } from "@/hooks/useFetchHandler";
import { extenedCitaMedicaType } from "@/schemas/citaMedica";
import { useInternalModals } from "@/hooks/useInternalModals";

const ActualizarCitaModalForm = ({
  open,
  setOpen,
  onCreate,
  citaMedica,
}: {
  open: boolean;
  setOpen: (_: boolean) => void;
  citaMedica: extenedCitaMedicaType;
  onCreate?: () => void;
}) => {
  const [servicios, setServicios] = useState<servicioType[]>([]);

  const { reload } = useInternalModals();

  const [horaInicio, setHoraInicio] = useState(
    citaMedica.horaInicio?.toFormat("T") ?? ""
  );
  const [horaFin, setHoraFin] = useState(
    citaMedica.horaFin?.toFormat("T") ?? ""
  );

  const [dateInput, setDateInput] = useState<DateTime>(
    citaMedica.fecha ?? DateTime.now()
  );

  const [estadoInput, setEstadoInput] = useState<string>(
    citaMedica.estado ?? ""
  );

  const { fetch } = useFetchHandler();
  const { createToast } = useToasts();

  useEffect(() => {
    fetch(async () => {
      const data = await getServiciosAPI();
      setServicios(data);
    });
  }, []);

  const submitHanlder = async (e: FormEvent) => {
    e.preventDefault();

    const diferenciaDeHoras = DateTime.fromISO(horaFin).diff(
      DateTime.fromISO(horaInicio),
      ["hour", "day", "month", "year"]
    ).hours;

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
      idCitaMedica: citaMedica.idCitaMedica,
      horaInicio: horaInicio,
      horaFin: horaFin,
      fecha: dateInput.toISODate(),
      estado: estadoInput,
      activo: citaMedica.activo,
      fechaCrecion: citaMedica.fechaCreacion,
      fechaDesactivacion: citaMedica.fechaDesactivacion,
      medico: {
        idMedico: citaMedica.medico?.idMedico,
        nombres: citaMedica.medico?.nombres,
        apellidos: citaMedica.medico?.apellidos,
        especialidad: citaMedica.medico?.especialidad,
        descripcion: citaMedica.medico?.descripcion,
        fotoPerfil: citaMedica.medico?.fotoPerfil,
      },
      cliente: citaMedica.cliente,
      servicio: citaMedica.servicio,
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
            <DialogTitle>Actualizar cita médica</DialogTitle>
            <div className="my-4 flex flex-col gap-4">
              <DialogDescription>
                Para: {citaMedica.medico?.nombres}{" "}
                {citaMedica.medico?.apellidos} -{" "}
                {citaMedica.medico?.especialidad}
              </DialogDescription>
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
              <Button type="submit">Actualizar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ActualizarCitaModalForm;
