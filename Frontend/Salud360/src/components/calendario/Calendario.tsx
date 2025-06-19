import { DateTime } from "luxon";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, {
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
import { agruparEventosSolapados } from "@/lib/calendarOverlaping";

/*
 * ===================================
 * Tipos de datos
 * ===================================
 */

interface Props<Event> {
  fechaSemana?: DateTime;
  cards: {
    day: (_: Event) => ReactNode;
    week: (_: Event) => ReactNode;
    month: (_: Event) => ReactNode;
  };
  filterContent?: ReactNode;
  filterFuncs?: ((d: Event) => boolean)[];
  getRangeDateFromData: (d: Event) => [DateTime, DateTime] | undefined;
  RegisterForm?: React.FC<{
    open: boolean;
    setOpen: (_: boolean) => void;
    date?: DateTime;
  }>;
  ActualizarForm?: React.FC<{
    open: boolean;
    setOpen: (_: boolean) => void;
    data: Event;
  }>;
  fetchData: () => Promise<Event[]>;
  fetchDataDependences?: any[];
}

/*
 * ===================================
 * Calendar: context
 * ===================================
 */

export default function Calendario<Event>(props: Props<Event>) {
  return (
    <Suspense
      fallback={
        <div>
          <Spinner />
        </div>
      }
    >
      <InternalModalsProvider>
        <CalendarioWrapped<Event> {...props} />
      </InternalModalsProvider>
    </Suspense>
  );
}

/*
 * ===================================
 * Calendar
 * ===================================
 */

function CalendarioWrapped<Event>({
  fechaSemana = DateTime.now(),
  cards,
  filterContent,
  filterFuncs,
  getRangeDateFromData,
  RegisterForm,
  ActualizarForm,
  fetchData,
  fetchDataDependences = [],
}: Props<Event>) {
  const [events, setEvents] = useState<Event[]>([]);
  // const [selectionesData, setSelectionedData] = useState<Event>();

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

  const filteredData = useMemo<Record<string, Event[][]>>(() => {
    const filteredEvents = events
      .map((d) => [d, getRangeDateFromData(d)] as [Event, [DateTime, DateTime]])
      .filter(([_, rango]) => rango !== undefined && rango !== null)
      .filter(
        ([_, rango]) =>
          rango[0] >= rangeDays.initial.startOf("day") &&
          rango[1] <= rangeDays.final.endOf("day")
      )
      .map(([d, _]) => d)
      .filter((d) => filterFuncs?.every((f) => f(d)) ?? true);

    // @ts-ignore
    const groupedEventsByDay = Object.groupBy(
      filteredEvents,
      (event: Event) =>
        getRangeDateFromData(event)?.[0].toISODate() ?? "unknown"
    ) as Record<string, Event[]>;

    const toReturnEvents: Record<string, Event[][]> = {};
    Object.entries(groupedEventsByDay).forEach(([key, values]) => {
      toReturnEvents[key] = agruparEventosSolapados(
        values,
        getRangeDateFromData
      );
    });
    return toReturnEvents;
  }, [rangeDays, events]);

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

  // const [createDate, setCreateDate] = useState<DateTime | undefined>();
  // const getDate = RegisterForm
  //   ? useCallback((date: DateTime) => {
  //       setCreateDate(date);
  //       setActiveModal?.("registrar");
  //     }, [])
  //   : undefined;
  // const getCalendarData = useCallback((events: Event) => {
  //   setSelectionedData(events);
  //   if (RegisterForm) setActiveModal?.("actualizar");
  // }, []);

  const {
    activeModal,
    setActiveModal,
    reloadState,
    selectedData,
    selectedDateTime,
  } = useInternalModals();

  const { fetch } = useFetchHandler();
  useEffect(() => {
    fetch(async () => {
      setEvents(await fetchData());
    });
  }, [reloadState]);

  useEffect(() => {
    fetch(async () => {
      setEvents(await fetchData());
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
              events={filteredData}
              registerEnabled={Boolean(RegisterForm)}
              getRangeDateFromData={getRangeDateFromData}
            />
          )}
          {periodo === "day" && (
            <CalendarioDiario
              key={rangeDays.initial.toISO()}
              dia={rangeDays.initial}
              card={cards.day}
              getRangeDateFromData={getRangeDateFromData}
              registerEnabled={Boolean(RegisterForm)}
              events={filteredData}
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
              registerEnabled={Boolean(RegisterForm)}
              events={filteredData}
            />
          )}
        </div>
        {selectedDateTime && RegisterForm && (
          <RegisterForm
            key={`${activeModal}-registrar`}
            open={activeModal === "registrar"}
            setOpen={(b) => setActiveModal?.(b ? "registrar" : "")}
            date={selectedDateTime}
          />
        )}
        {selectedData &&
          ActualizarForm &&
          createPortal(
            <ActualizarForm
              key={`${activeModal}-actualizar`}
              open={activeModal === "actualizar"}
              setOpen={(b) => setActiveModal?.(b ? "actualizar" : "")}
              data={selectedData}
            />,
            document.body
          )}
      </div>
    </>
  );
}
