import { DateTime } from "luxon";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CalendarioSemanal from "./CalendarioSemanal";
import CalendarioMensual from "./CalendarioMensual";
import CalendarioDiario from "./CalendarioDiario";
import { citaMedicaType } from "@/schemas/citaMedica";
import { claseType } from "@/schemas/clase";
import { useLoading } from "@/hooks/LoadingContext";
import { useToasts } from "@/hooks/ToastContext";
import { getCalendarData } from "@/services/calendarioUsuario.service";

interface Props {
  fechaSemana?: DateTime;
  blankTileAction?: (_: DateTime) => void;
}

const Calendario = ({
  fechaSemana = DateTime.now(),
  blankTileAction,
}: Props) => {
  const [citasMedicas, setCitasMedicas] = useState<citaMedicaType[]>([]);
  const [clases, setClases] = useState<claseType[]>([]);

  const { setLoading } = useLoading();
  const { createToast } = useToasts();

  const [periodo, setPeriodo] = useState<"week" | "day" | "month">("week");
  const [targetDay, setTargetDay] = useState<DateTime>(
    DateTime.fromObject({ day: fechaSemana.day })
  );

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      await new Promise<string>((res) => setTimeout(() => res(""), 1000));
      try {
        const [dataCitas, dataClases] = await getCalendarData();
        setCitasMedicas(dataCitas);
        setClases(dataClases);
      } catch (error) {
        createToast("error", {
          title: "Error en la consulta de datos",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [periodo, targetDay]);

  const rangeDays = useMemo<{ initial: DateTime; final: DateTime }>(
    () => ({
      initial: targetDay.startOf(periodo),
      final: targetDay.endOf(periodo),
    }),
    [targetDay, periodo]
  );

  const changeDate = useCallback(
    (step = 1) => {
      switch (periodo) {
        case "day":
          setTargetDay((prev) => prev.plus({ day: step }));
          break;
        case "week":
          setTargetDay((prev) => prev.plus({ week: step }));
          break;
        case "month":
          setTargetDay((prev) => prev.plus({ month: step }));
          break;
      }
    },
    [periodo]
  );

  return (
    <>
      <div className="w-full flex justify-between items-center p-4">
        <div className="text-label-large font-semibold text-neutral-700 flex items-center gap-1">
          <button onClick={() => changeDate(-1)}>
            <ChevronLeft />
          </button>
          <p>
            {rangeDays.initial.toFormat("LLLL", { locale: "es" })}
            {rangeDays.initial.month !== rangeDays.final.month && (
              <span>
                {" "}
                - {rangeDays.final.toFormat("LLLL", { locale: "es" })}
              </span>
            )}{" "}
          </p>
          <button onClick={() => changeDate(1)}>
            <ChevronRight />
          </button>
        </div>

        <div>
          {rangeDays.initial.toFormat("DDD", { locale: "es" })} -{" "}
          {rangeDays.initial.endOf("week").toFormat("DDD", { locale: "es" })}
        </div>

        <div className="flex gap-2 items-center">
          <Popover>
            <PopoverTrigger>
              <Filter />
            </PopoverTrigger>
            <PopoverContent className="w-72">
              <h2>Filtros</h2>
            </PopoverContent>
          </Popover>

          <div className="flex border-1 border-neutral-300 rounded-full overflow-hidden">
            <button
              data-active={periodo === "day"}
              className="border-r-1 border-neutral-300 py-1 px-4 hover:bg-neutral-200 transition-colors duration-200 ease-in-out data-[active=true]:bg-blue-500 data-[active=true]:text-white"
              onClick={() => setPeriodo("day")}
            >
              Día
            </button>
            <button
              data-active={periodo === "week"}
              className="border-r-1 border-neutral-300 py-1 px-4 hover:bg-neutral-200 transition-colors duration-200 ease-in-out data-[active=true]:bg-blue-500 data-[active=true]:text-white"
              onClick={() => setPeriodo("week")}
            >
              Semana
            </button>
            <button
              data-active={periodo === "month"}
              className="py-1 px-4 hover:bg-neutral-200 transition-colors duration-200 ease-in-out data-[active=true]:bg-blue-500 data-[active=true]:text-white"
              onClick={() => setPeriodo("month")}
            >
              Mes
            </button>
          </div>
        </div>
      </div>
      {periodo === "week" && (
        <CalendarioSemanal
          inicioSemana={rangeDays.initial}
          blankTileAction={blankTileAction}
          citasMedicas={citasMedicas.filter((elem) =>
            elem.fecha.hasSame(rangeDays.initial, "week")
          )}
          clases={clases.filter((elem) =>
            elem.fecha.hasSame(rangeDays.initial, "week")
          )}
        />
      )}
      {periodo === "day" && (
        <CalendarioDiario
          dia={rangeDays.initial}
          blankTileAction={blankTileAction}
          citasMedicas={citasMedicas.filter((elem) =>
            elem.fecha.hasSame(rangeDays.initial, "day")
          )}
          clases={clases.filter((elem) =>
            elem.fecha.hasSame(rangeDays.initial, "day")
          )}
        />
      )}
      {periodo === "month" && (
        <CalendarioMensual
          mes={targetDay.month}
          blankTileAction={blankTileAction}
          inicioMes={rangeDays.initial}
          finMes={rangeDays.final}
          citasMedicas={citasMedicas.filter((elem) =>
            elem.fecha.hasSame(rangeDays.initial, "month")
          )}
          clases={clases.filter((elem) =>
            elem.fecha.hasSame(rangeDays.initial, "month")
          )}
        />
      )}
    </>
  );
};

export default Calendario;
