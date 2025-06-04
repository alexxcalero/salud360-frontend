import { DateTime } from "luxon";
import { ReactNode, useMemo } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { cn } from "@/lib/utils";

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
            const futuro = hora >= DateTime.now();
            return (
              <tr key={index} className="grid grid-cols-subgrid col-span-full">
                <td className="border-1 border-neutral-300 text-right text-label-medium flex items-end justify-end pr-1">
                  {hora.toFormat("h a")}
                </td>
                <td className="text-center group border-1 border-neutral-300">
                  <div
                    className={cn(
                      "w-full h-full relative",
                      !futuro && "bg-neutral-50"
                    )}
                  >
                    {virtual.length !== 0 ? (
                      <div className="flex max-w-full max-h-full p-2 relative">
                        {virtual.map((d, index) => (
                          <div
                            key={index}
                            className="absolute top-2 left-2 right-2 bottom-2"
                          >
                            {metadata.card(d)}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <>
                        {futuro && (
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
                              <p>Haz click para registrar</p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </>
                    )}
                  </div>
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
