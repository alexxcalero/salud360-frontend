import { DateTime } from "luxon";
import { ReactNode, useMemo } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props<Data> {
  inicioSemana: DateTime;
  blankTileAction?: (_: DateTime) => void;
  metadata: {
    card: (_: Data) => ReactNode;
    equalFunc: (_: Data, _2: DateTime) => boolean;
  };
  data: Data[];
}

function CalendarioSemanal<Data>({
  inicioSemana,
  blankTileAction,
  metadata,
  data,
}: Props<Data>) {
  const dias = Array.from({ length: 7 }, (_, i) =>
    inicioSemana.plus({ days: i })
  );
  const horasSemana = useMemo<DateTime[][]>(() => {
    const tmp = [];
    for (let h = 0; h < 24; h++) {
      const filaHora: DateTime[] = [];

      for (let d = 0; d < 7; d++) {
        const fecha = inicioSemana
          .startOf("week")
          .startOf("day")
          .plus({ days: d, hours: h });

        filaHora.push(fecha);
      }

      tmp.push(filaHora);
    }

    return tmp;
  }, []);

  return (
    <>
      <table className="w-full grid grid-cols-[50px_repeat(7,1fr)_50px] border-collapse">
        <thead className="border-b-1 border-neutral-400 py-3 grid grid-cols-subgrid col-span-full">
          <tr className="grid grid-cols-subgrid col-span-full">
            <th></th>
            {dias.map((dia, index) => (
              <th
                key={index}
                className="text-center group"
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
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody className="grid grid-cols-subgrid col-span-full grid-rows-[25px] auto-rows-[120px]">
          <tr className="grid grid-cols-subgrid col-span-full">
            <td className="border-1 border-neutral-300 "></td>
            <td className="border-1 border-neutral-300 "></td>
            <td className="border-1 border-neutral-300 "></td>
            <td className="border-1 border-neutral-300 "></td>
            <td className="border-1 border-neutral-300 "></td>
            <td className="border-1 border-neutral-300 "></td>
            <td className="border-1 border-neutral-300 "></td>
            <td className="border-1 border-neutral-300 "></td>
            <td className="border-1 border-neutral-300 "></td>
          </tr>
          {/* Recorrer por horas */}
          {horasSemana.map((horaDias, index) => (
            <tr key={index} className="grid grid-cols-subgrid col-span-full">
              <td className="border-1 border-neutral-300 text-right text-label-medium flex items-start justify-end pr-1">
                {horaDias[0].toFormat("h a")}
              </td>
              {/* Recorrer por dìas de la semana */}
              {horaDias.map((dia, index) => {
                const virtualElems = data.filter((elem) =>
                  metadata.equalFunc(elem, dia)
                );
                // const virtualClases = clases.filter(
                //   (elem) =>
                //     elem.fecha.hasSame(dia, "day") &&
                //     elem.fecha.hasSame(dia, "month") &&
                //     elem.fecha.hasSame(dia, "year") &&
                //     elem.horaInicio.hour <= hora &&
                //     hora <= elem.horaFin.hour
                // );
                return (
                  <td
                    key={index}
                    className="text-center group border-1 border-neutral-300"
                  >
                    <div className="max-w-full max-h-full relative">
                      {virtualElems.length !== 0 ? (
                        <div className="flex max-w-full max-h-full p-2 relative">
                          {virtualElems.map((d, index) => (
                            <div
                              key={index}
                              className="absolute top-2 left-2 right-2 bottom-2"
                            >
                              {metadata.card(d)}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <Tooltip key={index}>
                          <TooltipTrigger asChild>
                            <button
                              className="w-full h-full"
                              onClick={() => {
                                blankTileAction?.(dia);
                              }}
                            ></button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Haz click para registrar cita</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                  </td>
                );
              })}
              <td className="border-1 border-neutral-300"></td>
            </tr>
          ))}
        </tbody>
        <tfoot className="grid grid-cols-subgrid col-span-full grid-rows-[25px]">
          <tr className="grid grid-cols-subgrid col-span-full">
            <td className="border-1 border-neutral-300 "></td>
            <td className="border-1 border-neutral-300 "></td>
            <td className="border-1 border-neutral-300 "></td>
            <td className="border-1 border-neutral-300 "></td>
            <td className="border-1 border-neutral-300 "></td>
            <td className="border-1 border-neutral-300 "></td>
            <td className="border-1 border-neutral-300 "></td>
            <td className="border-1 border-neutral-300 "></td>
            <td className="border-1 border-neutral-300 "></td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}

export default CalendarioSemanal;
