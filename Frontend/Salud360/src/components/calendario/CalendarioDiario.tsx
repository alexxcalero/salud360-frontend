import { DateTime } from "luxon";
import { ReactNode, useMemo } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface Props<Data> {
  dia: DateTime;
  blankTileAction?: (_: DateTime) => void;
  metadata: {
    card: (_: Data) => ReactNode;
    equalFunc: (_: Data, _2: DateTime) => boolean;
  };
  data: Data[];
}

function CalendarioDiario<Data>({
  dia,
  blankTileAction,
  metadata,
  data,
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
          {horasDelDia.map((hora, index) => {
            const virtual = data.filter((elem) =>
              metadata.equalFunc(elem, hora)
            );
            return (
              <tr key={index} className="grid grid-cols-subgrid col-span-full">
                <td className="border-1 border-neutral-300 text-right text-label-medium flex items-end justify-end pr-1">
                  {hora.toFormat("h a")}
                </td>
                <td className="text-center group border-1 border-neutral-300">
                  {virtual.length !== 0 ? (
                    <div className="p-2 max-w-full max-h-full flex gap-1">
                      {virtual.map((d, index) => (
                        <div key={index}>{metadata.card(d)}</div>
                      ))}
                    </div>
                  ) : (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          className="w-full h-full"
                          onClick={() => {
                            blankTileAction?.(hora);
                          }}
                        ></button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Haz click para registrar cita</p>
                      </TooltipContent>
                    </Tooltip>
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
}

export default CalendarioDiario;
