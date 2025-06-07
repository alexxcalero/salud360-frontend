import Calendario from "../calendario/Calendario";
import { reservaType } from "@/schemas/reserva";
import { DateTime } from "luxon";
import { ReservaCard } from "../calendario/reservaCard";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/hooks/AuthContext";
import { getAllClienteReservasAPI } from "@/services/cliente.service";
import { Switch } from "../ui/switch";
import Select from "../Select";
import { medicoType } from "@/schemas/medico";
import ToggleGroup from "../input/ToggleGroup";
import { useFetchHandler } from "@/hooks/useFetchHandler";
import { getMedicos } from "@/services/medico.service";

const CalendarioUsuarios = () => {
  const { usuario } = useContext(AuthContext);

  const [especialidades, setEspecialidades] = useState<string[]>([]);
  const [especialidadSeleccionada, setEspecialidadSeleccionada] =
    useState<string>("");

  const [act, setAct] = useState<string[]>(["citaMedica", "clase"]);
  const [showCancelados, setShowCancelados] = useState(true);

  const { fetch } = useFetchHandler();
  useEffect(() => {
    fetch(async () => {
      const data = await getMedicos();
      const data2 = Array.from(
        new Set(data.map((med) => med.especialidad ?? ""))
      );
      setEspecialidades(data2);
    });
  }, []);
  return (
    <>
      <Calendario<reservaType>
        getDateFromData={(d) => d.clase?.fecha ?? d.citaMedica?.fecha}
        getHourRangeFromData={(d) =>
          d.clase
            ? ([d.clase.horaInicio, d.clase.horaFin] as [DateTime, DateTime])
            : d.citaMedica
            ? ([d.citaMedica.horaInicio, d.citaMedica.horaFin] as [
                DateTime,
                DateTime
              ])
            : undefined
        }
        cards={{
          day: (d) => <ReservaCard reserva={d} />,
          week: (d) => <ReservaCard reserva={d} />,
          month: (d) => <ReservaCard reserva={d} />,
        }}
        fetchData={async () => {
          const reservas = await getAllClienteReservasAPI(
            usuario.idCliente as number
          );
          return reservas ?? [];
        }}
        filterFuncs={[
          (d) => {
            if (d.estado === "Cancelada" && !showCancelados) return false;

            if (d.citaMedica && !act.includes("citaMedica")) return false;
            if (d.clase && !act.includes("clase")) return false;

            if (
              especialidadSeleccionada !== "" &&
              d.citaMedica &&
              d.citaMedica.medico?.especialidad !== especialidadSeleccionada
            )
              return false;

            return true;
          },
        ]}
        filterContent={
          <div>
            <div className="flex flex-col">
              <strong>Mostrar canceladas</strong>
              <Switch
                checked={showCancelados}
                onCheckedChange={setShowCancelados}
              />
            </div>

            <div className="mt-4">
              <strong>Seleccionar por especialidad</strong>
              <Select
                options={especialidades.map((esp) => ({
                  value: esp,
                  content: esp,
                }))}
                value={especialidadSeleccionada}
                onChange={setEspecialidadSeleccionada}
              />
            </div>
            <div className="mt-4">
              <strong>Tipo de actividad</strong>
              <ToggleGroup
                type="multiple"
                options={[
                  {
                    value: "citaMedica",
                    content: "Cita medica",
                  },
                  {
                    value: "clase",
                    content: "Clase",
                  },
                ]}
                value={act}
                onValueChange={setAct}
              />
            </div>
          </div>
        }
      />
    </>
  );
};

export default CalendarioUsuarios;
