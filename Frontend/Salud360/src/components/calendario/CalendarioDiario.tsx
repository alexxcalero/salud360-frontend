import { citaMedicaType } from "@/schemas/citaMedica";
import { DateTime } from "luxon";
import { claseType } from "@/schemas/clase";
import { CitaMedicaCard } from "./CitaMedicoCard";
import { ClaseCard } from "./ClaseCard";

interface Props {
  dia: DateTime;
  blankTileAction?: (_: DateTime) => void;
  citasMedicas?: citaMedicaType[];
  clases?: claseType[];
}

const CalendarioDiario = ({
  dia,
  blankTileAction,
  citasMedicas = new Array(),
  clases = new Array(),
}: Props) => {
  return (
    <>
      <table className="w-full grid grid-cols-[50px_1fr_50px] border-collapse">
        <thead className="border-b-1 border-neutral-400 py-3 grid grid-cols-subgrid col-span-full">
          <tr className="grid grid-cols-subgrid col-span-full">
            <th></th>
            <th
              className="text-center group place-self-start px-4"
              data-active={dia.hasSame(DateTime.now(), "day")}
            >
              <span className="text-label-large font-normal text-neutral-700">
                {dia.toFormat("ccc", { locale: "es" }).toUpperCase()}
              </span>
              <br />
              <div className="p-1 mx-auto w-[2rem] h-[2rem] text-body-medium text-neutral-900 font-medium group-data-[active=true]:text-white group-data-[active=true]:bg-blue-500 rounded-full aspect-1/1">
                {dia.toFormat("dd")}
              </div>
            </th>

            <th></th>
          </tr>
        </thead>
        <tbody className="grid grid-cols-subgrid col-span-full grid-rows-[25px_120px] auto-rows-[120px]">
          <tr className="grid grid-cols-subgrid col-span-full">
            <td className="border-1 border-neutral-300 "></td>
            <td className="border-1 border-neutral-300 "></td>
            <td className="border-1 border-neutral-300 "></td>
          </tr>
          {Array.from({ length: 24 }, (_, hora) => {
            const virtualCitasMedicas = citasMedicas.filter(
              (elem) =>
                elem.fecha.hasSame(dia, "day") &&
                elem.fecha.hasSame(dia, "month") &&
                elem.fecha.hasSame(dia, "year") &&
                elem.horaInicio.hour === hora
            );
            const virtualClases = clases.filter(
              (elem) =>
                elem.fecha.hasSame(dia, "day") &&
                elem.fecha.hasSame(dia, "month") &&
                elem.fecha.hasSame(dia, "year") &&
                elem.horaInicio.hour <= hora &&
                hora <= elem.horaFin.hour
            );
            return (
              <tr key={hora} className="grid grid-cols-subgrid col-span-full">
                <td className="border-1 border-neutral-300 text-right text-label-medium flex items-end justify-end pr-1">
                  {DateTime.fromObject({ hour: hora }).toFormat("h a")}
                </td>
                <td className="text-center group border-1 border-neutral-300">
                  {virtualCitasMedicas.length !== 0 ||
                  virtualClases.length !== 0 ? (
                    <div className="p-2 max-w-full max-h-full flex gap-1">
                      {virtualCitasMedicas.map((cM, index) => (
                        <CitaMedicaCard key={index} citaMedica={cM} />
                      ))}
                      {virtualClases.map((cM, index) => (
                        <ClaseCard key={index} clase={cM} />
                      ))}
                    </div>
                  ) : (
                    <button
                      onClick={() =>
                        blankTileAction?.(
                          DateTime.fromObject({
                            year: dia.year,
                            month: dia.month,
                            day: dia.day,
                            hour: hora,
                          })
                        )
                      }
                    ></button>
                  )}
                </td>
                <td className="border-1 border-neutral-300"></td>
              </tr>
            );
          })}
        </tbody>
        <tfoot className="grid grid-cols-subgrid col-span-full grid-rows-[25px]">
          <tr className="grid grid-cols-subgrid col-span-full">
            <td className="border-1 border-neutral-300 "></td>
            <td className="border-1 border-neutral-300 "></td>
            <td className="border-1 border-neutral-300 "></td>
          </tr>
        </tfoot>
      </table>
    </>
  );
};

export default CalendarioDiario;
