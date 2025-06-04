const CambiarPeriodos = ({
  setDay,
  setWeek,
  setMonth,
  periodo,
}: {
  setDay: () => void;
  setWeek: () => void;
  setMonth: () => void;
  periodo: "day" | "week" | "month";
}) => {
  return (
    <>
      <div className="flex border-1 border-neutral-300 rounded-full overflow-hidden">
        <button
          data-active={periodo === "day"}
          className="border-r-1 border-neutral-300 py-1 px-4 hover:bg-neutral-200 transition-colors duration-200 ease-in-out data-[active=true]:bg-blue-500 data-[active=true]:text-white"
          onClick={setDay}
        >
          Día
        </button>
        <button
          data-active={periodo === "week"}
          className="border-r-1 border-neutral-300 py-1 px-4 hover:bg-neutral-200 transition-colors duration-200 ease-in-out data-[active=true]:bg-blue-500 data-[active=true]:text-white"
          onClick={setWeek}
        >
          Semana
        </button>
        <button
          data-active={periodo === "month"}
          className="py-1 px-4 hover:bg-neutral-200 transition-colors duration-200 ease-in-out data-[active=true]:bg-blue-500 data-[active=true]:text-white"
          onClick={setMonth}
        >
          Mes
        </button>
      </div>
    </>
  );
};

export default CambiarPeriodos;
