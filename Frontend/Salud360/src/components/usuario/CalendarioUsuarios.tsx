import Calendario from "../calendario/Calendario";
import { reservaType } from "@/schemas/reserva";
import { DateTime } from "luxon";
import { ReservaCard } from "../calendario/reservaCard";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/hooks/AuthContext";
import { getAllClienteReservasAPI } from "@/services/cliente.service";
import { Switch } from "../ui/switch";
import Select from "../Select";
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
        getRangeDateFromData={(d) =>
          d.clase
            ? ([
                d.clase?.fecha?.set({
                  hour: d.clase?.horaInicio?.hour,
                  minute: d.clase?.horaInicio?.minute,
                }),
                d?.clase.fecha?.set({
                  hour: d.clase?.horaFin?.hour,
                  minute: d.clase?.horaFin?.minute,
                }),
              ] as [DateTime, DateTime])
            : d.citaMedica
            ? ([
                d.citaMedica?.fecha?.set({
                  hour: d.citaMedica?.horaInicio?.hour,
                  minute: d.citaMedica?.horaInicio?.minute,
                }),
                d?.citaMedica.fecha?.set({
                  hour: d.citaMedica?.horaFin?.hour,
                  minute: d.citaMedica?.horaFin?.minute,
                }),
              ] as [DateTime, DateTime])
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
            <div className="my-4">
              Tipo de actividad
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
            <div className="flex flex-col">
              <span>Mostrar canceladas</span>
              <Switch
                checked={showCancelados}
                onCheckedChange={setShowCancelados}
              />
            </div>

            <div className="mt-4">
              <span>Seleccionar por especialidad</span>
              <Select
                options={especialidades.map((esp) => ({
                  value: esp,
                  content: esp,
                }))}
                value={especialidadSeleccionada}
                onChange={setEspecialidadSeleccionada}
              />
            </div>
          </div>
        }
      />
    </>
  );
};

export default CalendarioUsuarios;
