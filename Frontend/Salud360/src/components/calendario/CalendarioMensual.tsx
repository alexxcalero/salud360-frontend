import { cn } from "@/lib/utils";
import { DateTime, WeekdayNumbers } from "luxon";
import { ReactNode } from "react";

interface Props<Data> {
  inicioMes: DateTime;
  finMes: DateTime;
  mes: number;
  registerEnabled?: boolean;
  events: Record<string, Data[][]>;
  getRangeDateFromData: (d: Data) => [DateTime, DateTime] | undefined;
  card: (_: Data, _2?: (_: Data) => void) => ReactNode;
}

function CalendarioMensual<Data>({
  mes,
  inicioMes,
  finMes,
  events,
  card,
}: Props<Data>) {
  const diasPorSemanas: DateTime[][] = [];

  let _diaTmp = inicioMes.startOf("week");
  while (_diaTmp <= finMes.endOf("week")) {
    const tmp: DateTime[] = [],
      prevEnd: DateTime = _diaTmp.endOf("week");
    while (_diaTmp <= prevEnd) {
      tmp.push(_diaTmp);
      _diaTmp = _diaTmp.plus({ days: 1 });
    }
    diasPorSemanas.push(tmp);
  }

  return (
    <>
      <div className="w-full grid grid-cols-7 border-collapse h-full grid-rows-[max-content_1fr] min-h-[600px]">
        <div className="border-b-1 border-neutral-400 py-3 grid grid-cols-subgrid col-span-full">
          <div className="grid grid-cols-subgrid col-span-full">
            {Array.from({ length: 7 }, (_, i) =>
              DateTime.fromObject(
                { weekday: (i + 1) as WeekdayNumbers },
                { locale: "es" }
              )
            ).map((dia, index) => (
              <div key={index} className="text-center">
                <span className="text-label-large font-normal text-neutral-700">
                  {dia.toFormat("ccc", { locale: "es" }).toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-subgrid col-span-full auto-rows-fr">
          {diasPorSemanas.map((_dias, i) => (
            <div key={i} className="grid grid-cols-subgrid col-span-full">
              {_dias.map((dia, index) => {
                const matrizEvents = events[dia.toISODate() ?? ""];
                //console.log(events);
                //console.log(dia.toISODate());
                return (
                  <div
                    key={index}
                    className={`text-center group border-1 border-neutral-300 p-2 ${
                      mes !== dia.month && "bg-neutral-100"
                    }`}
                  >
                    <div
                      className={cn(
                        "mx-auto w-[2rem] h-[2rem] text-label-large text-neutral-900 font-medium rounded-full aspect-1/1",
                        dia.hasSame(DateTime.now(), "day") &&
                          "text-white bg-blue-500"
                      )}
                    >
                      {dia.toFormat("dd")}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {matrizEvents &&
                        matrizEvents.map((arrayEvents) =>
                          arrayEvents.map((event, index) => (
                            <div key={index}>{card(event)}</div>
                          ))
                        )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CalendarioMensual;
