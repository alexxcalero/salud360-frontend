import { citaMedicaType } from "@/schemas/citaMedica";
import { claseType } from "@/schemas/clase";
import { DateTime, WeekdayNumbers } from "luxon";
import CitaCardDot from "./CitaCardDot";

interface Props {
  inicioMes: DateTime;
  finMes: DateTime;
  mes: number;
  citasMedicas?: citaMedicaType[];
  clases?: claseType[];
}

const CalendarioMensual = ({
  mes,
  inicioMes,
  finMes,
  citasMedicas = new Array(),
  clases = new Array(),
}: Props) => {
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
      <table className="w-full grid grid-cols-7 border-collapse h-full grid-rows-[max-content_1fr] min-h-[600px]">
        <thead className="border-b-1 border-neutral-400 py-3 grid grid-cols-subgrid col-span-full">
          <tr className="grid grid-cols-subgrid col-span-full">
            {Array.from({ length: 7 }, (_, i) =>
              DateTime.fromObject(
                { weekday: (i + 1) as WeekdayNumbers },
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
        <tbody className="grid grid-cols-subgrid col-span-full auto-rows-fr">
          {diasPorSemanas.map((_dias, i) => (
            <tr key={i} className="grid grid-cols-subgrid col-span-full">
              {_dias.map((dia, index) => {
                const virtualCitasMedicas = citasMedicas.filter(
                  (elem) =>
                    elem.fecha.hasSame(dia, "day") &&
                    elem.fecha.hasSame(dia, "month") &&
                    elem.fecha.hasSame(dia, "year")
                );
                return (
                  <td
                    key={index}
                    className={`text-center group border-1 border-neutral-300 p-2 ${
                      mes !== dia.month && "bg-neutral-100"
                    }`}
                  >
                    <div className="text-label-large">{dia.toFormat("dd")}</div>
                    <div className="grid-cols-3">
                      {virtualCitasMedicas.map((cM, index) => (
                        <CitaCardDot key={index} citaMedica={cM} />
                      ))}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CalendarioMensual;
