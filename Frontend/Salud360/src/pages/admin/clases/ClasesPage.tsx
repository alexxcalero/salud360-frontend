import { AdminClaseCard } from "@/components/calendario/AdminClaseCard";
import Calendario from "@/components/calendario/Calendario";
import ActualizarClaseModalForm from "@/components/calendario/modals/actualizarClaseForm";
import RegistrarClaseModalForm from "@/components/calendario/modals/registrarClaseModalForm";
import SelectLabel from "@/components/SelectLabel";
import { Switch } from "@/components/ui/switch";
import { useFetchHandler } from "@/hooks/useFetchHandler";
import { claseDTOType } from "@/schemas/clase";
import { localType } from "@/schemas/local";
import { getAllClasesAPI } from "@/services/clasesAdmin.service";
import { getAllLocalesAPI } from "@/services/locales.service";
import { CircleDot } from "lucide-react";
import { DateTime } from "luxon";
import { useCallback, useEffect, useMemo, useState } from "react";
import colors from "tailwindcss/colors";

export default function ClasesPage() {
  const [locales, setLocales] = useState<localType[]>([]);
  const [localInput, setLocalInput] = useState("");

  const localSeleccionado = useMemo(
    () => locales.find(({ idLocal }) => idLocal?.toString() === localInput),
    [localInput, locales]
  );

  const { fetch } = useFetchHandler();

  const [showDeactivated, setShowDeactivated] = useState(false);

  useEffect(() => {
    fetch(async () => {
      const data = await getAllLocalesAPI();
      setLocales(data);
    });
  }, []);

  const registrar = useCallback(
    ({
      open,
      setOpen,
      date,
    }: {
      open: boolean;
      setOpen: (_: boolean) => void;
      date?: DateTime;
    }) =>
      localSeleccionado && (
        <RegistrarClaseModalForm
          open={open}
          setOpen={setOpen}
          date={date}
          local={localSeleccionado}
        />
      ),
    [localSeleccionado]
  );

  const actualizar = useCallback(
    ({
      open,
      setOpen,
      data,
    }: {
      open: boolean;
      setOpen: (_: boolean) => void;
      data: claseDTOType;
    }) => (
      <ActualizarClaseModalForm open={open} setOpen={setOpen} clase={data} />
    ),
    []
  );

  return (
    <>
      <div className="grid grid-rows-[auto_1fr] min-h-0 min-w-0 gap-2">
        <div className="w-full flex flex-col gap-4 px-8 py-8 text-left">
          <div>
            <h1 className="text-4xl font-bold mb-2">Clases</h1>
            <h2 className="text-lg text-gray-700 mb-2">Seleccione un local para crear y editar clases</h2>
          </div>
          <div className="self-stretch">
            <SelectLabel
              htmlFor="local"
              label="Locales"
              placeholder="Seleccione un local"
              value={localInput}
              onChange={setLocalInput}
              options={locales.map(({ idLocal, nombre, direccion }) => ({
                value: idLocal?.toString() ?? "",
                content: `${nombre} - ${direccion}`,
              }))}
            />
          </div>
          <hr className="border mt-4" />
        </div>

        <div className="px-8 min-h-0 min-w-0">
          {localSeleccionado !== undefined ? (
            <>
              <Calendario<claseDTOType>
                fetchData={async () =>
                  (await getAllClasesAPI())?.filter(
                    ({ local }) =>
                      local?.idLocal === localSeleccionado?.idLocal &&
                      local?.idLocal !== undefined
                  ) ?? []
                }
                fetchDataDependences={[localSeleccionado]}
                getRangeDateFromData={(d) =>
                  d.fecha && d.horaFin && d.horaInicio
                    ? ([
                        d.fecha.set({
                          hour: d.horaInicio.hour,
                          minute: d.horaInicio.minute,
                        }),
                        d.fecha.set({
                          hour: d.horaFin.hour,
                          minute: d.horaFin.minute,
                        }),
                      ] as [DateTime, DateTime])
                    : undefined
                }
                cards={{
                  day: (d, g) =>
                    g ? <AdminClaseCard clase={d} update={g} /> : undefined,
                  week: (d, g) =>
                    g ? <AdminClaseCard clase={d} update={g} /> : undefined,
                  month: (d, g) =>
                    g ? (
                      <AdminClaseCard clase={d} update={g} collapsed={true} />
                    ) : undefined,
                }}
                filterContent={
                  <div>
                    <div>
                      <span className="mr-4">Mostrar desactivados</span>
                      <Switch
                        checked={showDeactivated}
                        onCheckedChange={() => {
                          setShowDeactivated((prev) => !prev);
                        }}
                      />
                    </div>
                  </div>
                }
                filterFuncs={[
                  (d) => (showDeactivated ? true : Boolean(d.activo)),
                ]}
                RegisterForm={registrar}
                ActualizarForm={actualizar}
              />
            </>
          ) : (
            <div className="mt-30 flex items-center flex-col gap-4">
              <CircleDot color={colors.blue["500"]} size={48} />
              <p className="text-2xl max-w-88">
                Seleccione un local para comenzar.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
