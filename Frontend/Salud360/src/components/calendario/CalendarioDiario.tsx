import { DateTime } from "luxon";
import { ReactNode, useMemo } from "react";
import { cn } from "@/lib/utils";

interface Props<Data> {
  dia: DateTime;
  getDate?: (_: DateTime) => void;
  getCalendarData?: (_: Data) => void;
  data: Data[];
  getRangeDateFromData: (d: Data) => [DateTime, DateTime] | undefined;
  card: (_: Data, _2?: (_: Data) => void) => ReactNode;
}

function CalendarioDiario<Data>({
  dia,
  data,
  getDate,
  getCalendarData,
  getRangeDateFromData,
  card,
}: Props<Data>) {
  const inicioDia = DateTime.local().startOf("day"); // o cualquier otro día específico
  const horasDelDia = useMemo<DateTime[]>(() => {
    const horas = [];
    for (let h = 0; h < 24; h++) {
      horas.push(inicioDia.plus({ hours: h }));
    }
    return horas;
  }, []);

  return (
    <>
      <div className="w-full grid border-collapse grid-rows-[auto_minmax(0,1fr)] h-full max-h-full min-h-0 min-w-0">
        {/* ============================================= */}
        {/* Numeración de calendario */}
        {/* ============================================= */}
        <div className="py-3 grid grid-cols-[50px_1fr_50px] min-h-0">
          <div></div>
          <div
            className="text-center group"
            data-active={dia.hasSame(DateTime.now(), "day")}
          >
            <span className="text-label-large font-normal text-neutral-700 group-data-[active=true]:text-blue-500">
              {dia.toFormat("ccc", { locale: "es" }).toUpperCase()}
            </span>
            <br />
            <div className=" mx-auto w-[2rem] h-[2rem] text-body-medium text-neutral-900 font-medium group-data-[active=true]:text-white group-data-[active=true]:bg-blue-500 rounded-full aspect-1/1">
              {dia.toFormat("dd")}
            </div>
          </div>
        </div>
        {/* ============================================= */}
        {/* Grilla de calenario */}
        {/* ============================================= */}
        <div className="grid grid-cols-[50px_1fr_50px] grid-rows-[25px_repeat(24,58px)_25px] relative min-h-0 h-full overflow-y-scroll min-w-0">
          {/* Datos mostrados en position: absolute */}
          <div className="absolute top-0 left-0 bottom-0 right-0 z-10 pointer-events-none">
            {data.map((d, index) => {
              const rango = getRangeDateFromData(d);
              if (rango === undefined) return;

              const diffInitialHour = DateTime.fromObject({
                hour: rango[0].hour,
                minute: rango[0].minute,
              }).diff(DateTime.fromObject({ hour: 0, minute: 0 }), [
                "hours",
                "days",
                "months",
                "years",
              ]).hours;
              const diffFinalHour = DateTime.fromObject({
                hour: rango[1].hour,
                minute: rango[1].minute,
              }).diff(
                DateTime.fromObject({
                  hour: rango[0].hour,
                  minute: rango[0].minute,
                }),
                ["hours", "days", "months", "years"]
              ).hours;

              return (
                <div
                  className={cn(
                    "flex w-[calc(calc(100%-100px)/7)] p-1 absolute pointer-events-auto"
                  )}
                  style={{
                    height: `${58 * diffFinalHour}px`,
                    top: `calc(calc(58px * ${diffInitialHour}) + 25px)`,
                    left: `50px`,
                  }}
                  key={index}
                >
                  {card(d, getCalendarData)}
                </div>
              );
            })}
          </div>
          {/* Calendario estático */}

          <div className="grid grid-cols-subgrid col-span-full">
            {/* Limite superior */}
            <div className="border-1 border-neutral-300 "></div>
            <div className="border-1 border-neutral-300 "></div>
            <div className="border-1 border-neutral-300 "></div>
          </div>
          {/* Recorrer por horas */}
          {horasDelDia
            .map(
              (horasDias) =>
                [horasDias, horasDias <= DateTime.now()] as [DateTime, boolean]
            )
            .map(([horaDias, futuro], index) => (
              <div key={index} className="grid grid-cols-subgrid col-span-full">
                <div className="border-1 border-neutral-300 text-right text-label-medium flex items-start justify-end pr-1">
                  {horaDias.toFormat("h a")}
                </div>
                {/* Recorrer por dìas de la semana */}
                <div
                  key={index}
                  className={cn(
                    "w-full h-full relative text-center group border-1 border-neutral-300 bg-white transition-colors duration-150 ease-out",
                    !futuro && "bg-neutral-100",
                    futuro && getDate && "hover:bg-neutral-300"
                  )}
                >
                  {futuro && getDate && (
                    <button
                      className="w-full h-full"
                      onClick={() => getDate(dia)}
                    ></button>
                  )}
                </div>
                <div className="border-1 border-neutral-300"></div>
              </div>
            ))}
          <div className="grid grid-cols-subgrid col-span-full grid-rows-[25px]">
            {/* Limite inferior */}
            <div className="border-1 border-neutral-300 "></div>
            <div className="border-1 border-neutral-300 "></div>
            <div className="border-1 border-neutral-300 "></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CalendarioDiario;
