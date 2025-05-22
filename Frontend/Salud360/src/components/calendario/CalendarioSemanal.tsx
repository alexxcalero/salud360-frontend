import { DateTime } from "luxon";

interface Props {
  inicioSemana: DateTime;
}

const CalendarioSemanal = ({ inicioSemana }: Props) => {
  const dias = Array.from({ length: 7 }, (_, i) =>
    inicioSemana.plus({ days: i })
  );
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
        <tbody className="grid grid-cols-subgrid col-span-full grid-rows-[25px_68px] auto-rows-[68px]">
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
          {Array.from({ length: 24 }, (_, i) => (
            <tr key={i} className="grid grid-cols-subgrid col-span-full">
              <td className="border-1 border-neutral-300 text-right text-label-medium flex items-end justify-end pr-1">
                {DateTime.fromObject({ hour: i }).toFormat("h a")}
              </td>
              {dias.map((dia, index) => (
                <td
                  key={index}
                  className="text-center group border-1 border-neutral-300 p-2"
                ></td>
              ))}
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
};

export default CalendarioSemanal;
