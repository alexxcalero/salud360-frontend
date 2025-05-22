import { DateTime, WeekdayNumbers } from "luxon";

interface Props {
  inicioMes: DateTime;
  finMes: DateTime;
  mes: number;
}

const CalendarioMensual = ({ mes, inicioMes, finMes }: Props) => {
  const dias: DateTime[] = [];

  let _diaTmp = inicioMes;
  while (_diaTmp <= finMes) {
    dias.push(_diaTmp);
    _diaTmp = _diaTmp.plus({ days: 1 });
  }

  // @ts-ignore
  const diasPorSemanas = Object.groupBy(dias, (dia) => dia.weekNumber);
  console.log(diasPorSemanas);

  return (
    <>
      <table className="w-full grid grid-cols-7 border-collapse h-full grid-rows-[max-content_1fr] min-h-[600px]">
        <thead className="border-b-1 border-neutral-400 py-3 grid grid-cols-subgrid col-span-full">
          <tr className="grid grid-cols-subgrid col-span-full">
            {Array.from({ length: 7 }, (_, i) =>
              DateTime.fromObject(
                { weekday: i as WeekdayNumbers },
                { locale: "es" }
              )
            ).map((dia, index) => (
              <th key={index} className="text-center">
                <span className="text-label-large font-normal text-neutral-700">
                  {dia.toFormat("ccc", { locale: "es" }).toUpperCase()}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="grid grid-cols-subgrid col-span-full grid-rows-5">
          {Object.values(diasPorSemanas as { [key: number]: DateTime[] }).map(
            (_dias, i) => (
              <tr key={i} className="grid grid-cols-subgrid col-span-full">
                {_dias.map((dia, index) => (
                  <td
                    key={index}
                    className={`text-center group border-1 border-neutral-300 p-2 ${
                      mes !== dia.month && "bg-neutral-100"
                    }`}
                  >
                    <div className="text-label-large">{dia.toFormat("dd")}</div>
                  </td>
                ))}
              </tr>
            )
          )}
        </tbody>
      </table>
    </>
  );
};

export default CalendarioMensual;
