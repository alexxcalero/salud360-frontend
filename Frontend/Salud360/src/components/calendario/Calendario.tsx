import { DateTime } from "luxon";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ReactNode, useCallback, useMemo, useState } from "react";
import CalendarioSemanal from "./CalendarioSemanal";
import CalendarioMensual from "./CalendarioMensual";
import CalendarioDiario from "./CalendarioDiario";
import FiltrarCalendario from "./utils/FiltrarCalendario";
import CambiarPeriodos from "./utils/CambiarDias";

interface Props<Data> {
  fechaSemana?: DateTime;
  blankTileAction?: (_: DateTime) => void;
  data: Data[];
  rangeDaysFilterFunc: (_: DateTime, _2: DateTime, _3: Data) => boolean;
  metadata: {
    day: {
      card: (_: Data) => ReactNode;
      equalFunc: (_: Data, _2: DateTime) => boolean;
    };
    week: {
      card: (_: Data) => ReactNode;
      equalFunc: (_: Data, _2: DateTime) => boolean;
    };
    month: {
      card: (_: Data) => ReactNode;
      equalFunc: (_: Data, _2: DateTime) => boolean;
    };
  };
  filterContent?: ReactNode;
  filterFuncs?: ((d: Data) => boolean)[];
}

function Calendario<Data>({
  fechaSemana = DateTime.now(),
  blankTileAction,
  data,
  metadata,
  rangeDaysFilterFunc,
  filterContent,
  filterFuncs,
}: Props<Data>) {
  const [periodo, setPeriodo] = useState<"week" | "day" | "month">("week");
  const [targetDay, setTargetDay] = useState<DateTime>(
    DateTime.fromObject({ day: fechaSemana.day })
  );

  const rangeDays = useMemo<{ initial: DateTime; final: DateTime }>(
    () => ({
      initial: targetDay.startOf(periodo),
      final: targetDay.endOf(periodo),
    }),
    [targetDay, periodo]
  );

  const filteredData = useMemo<Data[]>(() => {
    return data
      .filter((d) => rangeDaysFilterFunc(rangeDays.initial, rangeDays.final, d))
      .filter((d) => filterFuncs?.every((f) => f(d)) ?? true);
  }, [rangeDays, data]);

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
            {rangeDays.initial.toFormat("LLLL", { locale: "es" }).replace(/^./, (c) => c.toUpperCase())}
            {rangeDays.initial.month !== rangeDays.final.month && (
              <span>
                {" "}
                - {rangeDays.final.toFormat("LLLL", { locale: "es" }).replace(/^./, (c) => c.toUpperCase())}
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

        <div className="flex gap-4 items-center">
          <FiltrarCalendario>{filterContent}</FiltrarCalendario>

          <CambiarPeriodos
            setDay={() => setPeriodo("day")}
            setWeek={() => setPeriodo("week")}
            setMonth={() => setPeriodo("month")}
            periodo={periodo}
          />
        </div>
      </div>
      {periodo === "week" && (
        <CalendarioSemanal
          key={rangeDays.initial.toISO()}
          inicioSemana={rangeDays.initial}
          blankTileAction={blankTileAction}
          metadata={metadata.week}
          data={filteredData}
        />
      )}
      {periodo === "day" && (
        <CalendarioDiario
          key={rangeDays.initial.toISO()}
          dia={rangeDays.initial}
          blankTileAction={blankTileAction}
          metadata={metadata.day}
          data={filteredData}
        />
      )}
      {periodo === "month" && (
        <CalendarioMensual
          key={targetDay.month}
          mes={targetDay.month}
          blankTileAction={blankTileAction}
          inicioMes={rangeDays.initial}
          finMes={rangeDays.final}
          metadata={metadata.month}
          data={filteredData}
        />
      )}
    </>
  );
}

export default Calendario;
