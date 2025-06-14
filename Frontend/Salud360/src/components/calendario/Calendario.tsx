import { DateTime } from "luxon";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  ReactNode,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import CalendarioSemanal from "./CalendarioSemanal";
import CalendarioMensual from "./CalendarioMensual";
import CalendarioDiario from "./CalendarioDiario";
import FiltrarCalendario from "./utils/FiltrarCalendario";
import CambiarPeriodos from "./utils/CambiarDias";
import {
  InternalModalsProvider,
  useInternalModals,
} from "@/hooks/useInternalModals";
import { useFetchHandler } from "@/hooks/useFetchHandler";
import Spinner from "../Spinner";
import { createPortal } from "react-dom";

export default function Calendario<Data>(props: Props<Data>) {
  return (
    <Suspense
      fallback={
        <div>
          <Spinner />
        </div>
      }
    >
      <InternalModalsProvider>
        <CalendarioWrapped<Data> {...props} />
      </InternalModalsProvider>
    </Suspense>
  );
}

interface Props<Data> {
  fechaSemana?: DateTime;
  cards: {
    day: (_: Data, _2?: (_: Data) => void) => ReactNode;
    week: (_: Data, _2?: (_: Data) => void) => ReactNode;
    month: (_: Data, _2?: (_: Data) => void) => ReactNode;
  };
  filterContent?: ReactNode;
  filterFuncs?: ((d: Data) => boolean)[];
  getRangeDateFromData: (d: Data) => [DateTime, DateTime] | undefined;
  RegisterForm?: (_: {
    open: boolean;
    setOpen: (_: boolean) => void;
    date?: DateTime;
  }) => ReactNode;
  ActualizarForm?: (_: {
    open: boolean;
    setOpen: (_: boolean) => void;
    data: Data;
  }) => ReactNode;
  fetchData: () => Promise<Data[]>;
  fetchDataDependences?: any[];
}

function CalendarioWrapped<Data>({
  fechaSemana = DateTime.now(),
  cards,
  filterContent,
  filterFuncs,
  getRangeDateFromData,
  RegisterForm,
  ActualizarForm,
  fetchData,
  fetchDataDependences = [],
}: Props<Data>) {
  const { activeModal, setActiveModal, reloadState } = useInternalModals();

  const [data, setData] = useState<Data[]>([]);
  const [selectionesData, setSelectionedData] = useState<Data>();

  const [periodo, setPeriodo] = useState<"week" | "day" | "month">("week");
  const [targetDay, setTargetDay] = useState<DateTime>(
    DateTime.fromObject({ day: fechaSemana.day })
  );

  const rangeDays = useMemo<{ initial: DateTime; final: DateTime }>(
    () => ({
      initial: targetDay.startOf(periodo),
      final: targetDay.endOf(periodo),
    }),
    [targetDay, periodo]
  );

  const filteredData = useMemo<Data[]>(() => {
    return data
      .map((d) => [d, getRangeDateFromData(d)] as [Data, [DateTime, DateTime]])
      .filter(([_, rango]) => rango !== undefined && rango !== null)
      .filter(
        ([_, rango]) =>
          rango[0] >= rangeDays.initial.startOf("day") &&
          rango[1] <= rangeDays.final.endOf("day")
      )
      .map(([d, _]) => d)
      .filter((d) => filterFuncs?.every((f) => f(d)) ?? true);
  }, [rangeDays, data]);

  const changeDate = useCallback(
    (step = 1) => {
      switch (periodo) {
        case "day":
          setTargetDay((prev) => prev.plus({ day: step }));
          break;
        case "week":
          setTargetDay((prev) => prev.plus({ week: step }));
          break;
        case "month":
          setTargetDay((prev) => prev.plus({ month: step }));
          break;
      }
    },
    [periodo]
  );

  const [createDate, setCreateDate] = useState<DateTime | undefined>();
  const getDate = RegisterForm
    ? useCallback((date: DateTime) => {
        setCreateDate(date);
        setActiveModal?.("registrar");
      }, [])
    : undefined;
  const getCalendarData = useCallback((data: Data) => {
    setSelectionedData(data);
    if (RegisterForm) setActiveModal?.("actualizar");
  }, []);

  const { fetch } = useFetchHandler();
  useEffect(() => {
    fetch(async () => {
      setData(await fetchData());
    });
  }, [reloadState]);

  useEffect(() => {
    fetch(async () => {
      setData(await fetchData());
    });
  }, fetchDataDependences);

  return (
    <>
      <div className="grid grid-rows-[auto_minmax(0,1fr)] min-h-0 place-items-stretch h-full">
        <div className="w-full flex justify-between items-center p-4">
          <div className="text-label-large font-semibold text-neutral-700 flex items-center gap-1">
            <button onClick={() => changeDate(-1)}>
              <ChevronLeft />
            </button>
            <p>
              {rangeDays.initial
                .toFormat("LLLL", { locale: "es" })
                .replace(/^./, (c) => c.toUpperCase())}
              {rangeDays.initial.month !== rangeDays.final.month && (
                <span>
                  {" "}
                  -{" "}
                  {rangeDays.final
                    .toFormat("LLLL", { locale: "es" })
                    .replace(/^./, (c) => c.toUpperCase())}
                </span>
              )}{" "}
            </p>
            <button onClick={() => changeDate(1)}>
              <ChevronRight />
            </button>
          </div>

          <div>
            {rangeDays.initial.toFormat("DDD", { locale: "es" })} -{" "}
            {rangeDays.initial.endOf("week").toFormat("DDD", { locale: "es" })}
          </div>

          <div className="flex gap-4 items-center">
            {filterContent && (
              <FiltrarCalendario>{filterContent}</FiltrarCalendario>
            )}

            <CambiarPeriodos
              setDay={() => setPeriodo("day")}
              setWeek={() => setPeriodo("week")}
              setMonth={() => setPeriodo("month")}
              periodo={periodo}
            />
          </div>
        </div>
        <div className="min-h-0 max-h-full min-w-0">
          {periodo === "week" && (
            <CalendarioSemanal
              key={rangeDays.initial.toISO()}
              inicioSemana={rangeDays.initial}
              card={cards.week}
              data={filteredData}
              getDate={getDate}
              getCalendarData={getCalendarData}
              getRangeDateFromData={getRangeDateFromData}
            />
          )}
          {periodo === "day" && (
            <CalendarioDiario
              key={rangeDays.initial.toISO()}
              dia={rangeDays.initial}
              card={cards.day}
              getRangeDateFromData={getRangeDateFromData}
              getDate={getDate}
              getCalendarData={getCalendarData}
              data={filteredData}
            />
          )}
          {periodo === "month" && (
            <CalendarioMensual
              key={targetDay.month}
              mes={targetDay.month}
              inicioMes={rangeDays.initial}
              finMes={rangeDays.final}
              card={cards.month}
              getRangeDateFromData={getRangeDateFromData}
              getDate={getDate}
              getCalendarData={getCalendarData}
              data={filteredData}
            />
          )}
        </div>
        {RegisterForm &&
          createPortal(
            <RegisterForm
              key={`${activeModal}-registrar`}
              open={activeModal === "registrar"}
              setOpen={useCallback(
                (b) =>
                  b ? setActiveModal?.("registrar") : setActiveModal?.(""),
                []
              )}
              date={createDate}
            />,
            document.body
          )}
        {ActualizarForm &&
          selectionesData &&
          createPortal(
            <ActualizarForm
              key={`${activeModal}-actualizar`}
              open={activeModal === "actualizar"}
              setOpen={(b) =>
                b ? setActiveModal?.("actualizar") : setActiveModal?.("")
              }
              data={selectionesData}
            />,
            document.body
          )}
      </div>
    </>
  );
}
