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
import { medicoType } from "@/schemas/medico";
import { extendedServicioType } from "@/schemas/servicio";
import { DateTime } from "luxon";
import { FormEvent, useEffect, useMemo, useState } from "react";
import Button from "@/components/Button";
import { getServiciosAPI } from "@/services/servicio.service";
import { postCitaMedicaAPI } from "@/services/citasMedicasAdmin.service";
import { useFetchHandler } from "@/hooks/useFetchHandler";
import { useInternalModals } from "@/hooks/useInternalModals";

const RegistrarCitaModalForm = ({
  open,
  setOpen,
  date,
  medico,
  onCreate,
}: {
  open: boolean;
  setOpen: (_: boolean) => void;
  date?: DateTime;
  medico: medicoType;
  onCreate?: () => void;
}) => {
  const [servicios, setServicios] = useState<extendedServicioType[]>([]);
  const [servicioInput, setServicioInput] = useState("");

  const [horaInicio, setHoraInicio] = useState(date?.toFormat("T") ?? "00:00");
  const horaFin = useMemo(
    () =>
      DateTime.fromFormat(horaInicio, "T").plus({ hour: 1 }).toFormat("T") ??
      "00:00",
    [horaInicio]
  );

  const [dateInput, setDateInput] = useState<DateTime>(date ?? DateTime.now());

  const { fetch } = useFetchHandler();
  const { createToast } = useToasts();
  const { reload } = useInternalModals();

  useEffect(() => {
    fetch(async () => {
      const data = await getServiciosAPI();
      setServicios(data);
    });
  }, []);

  const submitHanlder = async (e: FormEvent) => {
    e.preventDefault();

    if (servicioInput === "") {
      createToast("error", {
        title: "Seleccione un servicio",
      });
      return;
    }

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
      horaInicio: horaInicio,
      horaFin: horaFin,
      fecha: dateInput.toISODate(),
      estado: "Disponible",
      medico: {
        idMedico: medico.idMedico,
        nombres: medico.nombres,
        apellidos: medico.apellidos,
        especialidad: medico.especialidad,
        descripcion: medico.descripcion,
        fotoPerfil: medico.fotoPerfil,
      },
      servicio: servicios.find(
        ({ idServicio }) => idServicio?.toString() === servicioInput
      ),
    };

    //console.log("Webada");
    //console.log(uploadData);
    fetch(async () => {
      await postCitaMedicaAPI(uploadData);
      setOpen(false);
      createToast("success", { title: "Cita creada correctamente" });
      onCreate?.();
      reload();
    });
  };
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <form onSubmit={submitHanlder}>
            <DialogTitle>Registrar cita médica</DialogTitle>
            <DialogDescription>Llena el formulario </DialogDescription>
            <div className="my-4 flex flex-col gap-4">
              <p>
                Para: {medico.nombres} {medico.apellidos} -{" "}
                {medico.especialidad}
              </p>
              <SelectLabel
                htmlFor="servicio"
                label="Seleccione servicio"
                placeholder="Seleccione servicio"
                value={servicioInput}
                onChange={setServicioInput}
                options={servicios.map((s) => ({
                  value: s.idServicio?.toString() ?? "",
                  content: s.nombre ?? "",
                }))}
                required={true}
              />
              <CalendarInput
                value={dateInput}
                setValue={setDateInput}
                name="dia"
                format="DDDD"
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

export default RegistrarCitaModalForm;
