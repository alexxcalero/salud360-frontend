import { AdminClaseCard } from "@/components/calendario/AdminClaseCard";
import AdminClaseDot from "@/components/calendario/AdminClaseDot";
import Calendario from "@/components/calendario/Calendario";
import RegistrarClaseModalForm from "@/components/calendario/modals/registrarClaseModalForm";
import SelectLabel from "@/components/SelectLabel";
import { Switch } from "@/components/ui/switch";
import { useFetchHandler } from "@/hooks/useFetchHandler";
import {
  InternalModalsProvider,
  useInternalModals,
} from "@/hooks/useInternalModals";
import { claseDTOType } from "@/schemas/clase";
import { localType } from "@/schemas/local";
import { getAllClasesAPI } from "@/services/clasesAdmin.service";
import { getAllLocalesAPI } from "@/services/locales.service";
import { CircleDot } from "lucide-react";
import { DateTime } from "luxon";
import { useEffect, useMemo, useState } from "react";
import colors from "tailwindcss/colors";

export default function ClasesPage() {
  return (
    <InternalModalsProvider>
      <ClasesPageWrapped />
    </InternalModalsProvider>
  );
}

const ClasesPageWrapped = () => {
  const [locales, setLocales] = useState<localType[]>([]);
  const [localInput, setLocalInput] = useState("");

  const localSeleccionado = useMemo(
    () => locales.find(({ idLocal }) => idLocal?.toString() === localInput),
    [localInput, locales]
  );

  const [createDate, setCreateDate] = useState<DateTime | undefined>();
  const { fetch } = useFetchHandler();
  const { activeModal, setActiveModal, reloadState, reload } =
    useInternalModals();

  const [data, setData] = useState<claseDTOType[]>([]);

  const [showDeactivated, setShowDeactivated] = useState(false);

  useEffect(() => {
    fetch(async () => {
      const data = await getAllLocalesAPI();
      setLocales(data);
    });
  }, []);

  useEffect(() => {
    fetch(async () => {
      const data = await getAllClasesAPI();
      setData(
        data?.filter(
          ({ local }) =>
            local?.idLocal === localSeleccionado?.idLocal &&
            local?.idLocal !== undefined
        ) ?? []
      );
    });
  }, [localSeleccionado, reloadState]);

  return (
    <>
      <div>
        <div className="p-4 flex flex-col items-start gap-3 border-b-1 border-neutral-500">
          <h1>Clases</h1>
          <p className="self-stretch text-left">
            Escoja un local primero, en el cual se realizaràn las clases
          </p>
          <div className="self-stretch">
            <SelectLabel
              htmlFor="local"
              label="Seleccione un local"
              placeholder="Seleccione un local"
              value={localInput}
              onChange={setLocalInput}
              options={locales.map(({ idLocal, nombre, direccion }) => ({
                value: idLocal?.toString() ?? "",
                content: `${nombre} - ${direccion}`,
              }))}
            />
          </div>
        </div>

        {localSeleccionado !== undefined ? (
          <>
            <Calendario<claseDTOType>
              data={data}
              rangeDaysFilterFunc={(initial, final, d) =>
                d.fecha !== undefined &&
                d.fecha !== null &&
                initial <= d.fecha &&
                d.fecha <= final
              }
              metadata={{
                day: {
                  card: (d) => <AdminClaseCard clase={d} />,
                  equalFunc: (data: claseDTOType, fecha: DateTime) =>
                    Boolean(
                      data.fecha?.hasSame(fecha, "day") &&
                        data.fecha?.hasSame(fecha, "month") &&
                        data.fecha?.hasSame(fecha, "year") &&
                        data.horaInicio?.hasSame(fecha, "hour")
                    ),
                },
                week: {
                  card: (d) => <AdminClaseCard clase={d} />,
                  equalFunc: (data: claseDTOType, fecha: DateTime) =>
                    Boolean(
                      data.fecha?.hasSame(fecha, "day") &&
                        data.fecha?.hasSame(fecha, "month") &&
                        data.fecha?.hasSame(fecha, "year") &&
                        (data.horaInicio?.hour ?? Infinity) >= fecha.hour &&
                        (data.horaInicio?.hour ?? Infinity) < fecha.hour + 1
                    ),
                },
                month: {
                  card: (d) => <AdminClaseDot clase={d} />,
                  equalFunc: (data: claseDTOType, fecha: DateTime) =>
                    Boolean(
                      data.fecha?.hasSame(fecha, "day") &&
                        data.fecha?.hasSame(fecha, "month") &&
                        data.fecha?.hasSame(fecha, "year")
                    ),
                },
              }}
              blankTileAction={(date) => {
                setCreateDate(date);
                setActiveModal?.("registrarClase");
              }}
              filterContent={
                <div>
                  <div>
                    <span className="mr-4">Mostrar desactivados</span>
                    <Switch
                      checked={showDeactivated}
                      onCheckedChange={() => {
                        setShowDeactivated((prev) => !prev);
                        reload();
                      }}
                    />
                  </div>
                </div>
              }
              filterFuncs={[
                (d) => (showDeactivated ? true : Boolean(d.activo)),
              ]}
            />
            {localSeleccionado !== undefined && createDate !== undefined && (
              <RegistrarClaseModalForm
                key={createDate.toISO()}
                open={activeModal === "registrarClase"}
                setOpen={(b) =>
                  b ? setActiveModal?.("registrarClase") : setActiveModal?.("")
                }
                date={createDate}
                local={localSeleccionado}
              />
            )}
          </>
        ) : (
          <>
            <div className="mt-30 flex items-center flex-col gap-4">
              <CircleDot color={colors.blue["500"]} size={48} />
              <p className="text-2xl max-w-88">
                Seleccione un local para poder realizar cambios o ver los datos
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
};
