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
import { useLoading } from "@/hooks/LoadingContext";
import { useToasts } from "@/hooks/ToastContext";
import { medicoType } from "@/schemas/medico";
import { servicioType } from "@/schemas/servicio";
import { DateTime } from "luxon";
import { FormEvent, useEffect, useState } from "react";
import Button from "@/components/Button";

const RegistrarCitaModalForm = ({
  open,
  setOpen,
  date,
  medico,
}: {
  open: boolean;
  setOpen: (_: boolean) => void;
  date: DateTime;
  medico: medicoType;
}) => {
  const [servicios, setServicios] = useState<servicioType[]>([]);
  const [servicioInput, setServicioInput] = useState("");

  const { setLoading } = useLoading();
  const { createToast } = useToasts();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        setServicios([
          {
            idServicio: 0,
            descripcion: "",
            nombre: "Servicio de lavado de alma",
            imagenes: [],
            tipo: "",
          },
        ]);
      } catch (error) {
        createToast("error", { title: "Error p" });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const submitHanlder = (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <form action="" onSubmit={submitHanlder}>
            <DialogTitle>Registrar cita mèdica</DialogTitle>
            <div className="my-4 flex flex-col gap-4">
              <SelectLabel
                htmlFor="servicio"
                label="Seleccione servicio *"
                placeholder="Seleccione servicio"
                value={servicioInput}
                onChange={setServicioInput}
                options={servicios.map((s) => ({
                  value: s.idServicio.toString(),
                  content: s.nombre,
                }))}
              />
              <CalendarInput
                defaultValue={date}
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
                  defaultValue={date.toFormat("T")}
                  type="time"
                />
                <Input
                  name="hora-fin"
                  required={true}
                  placeholder="Hora fin"
                  defaultValue={date.plus({ hour: 1 }).toFormat("T")}
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
