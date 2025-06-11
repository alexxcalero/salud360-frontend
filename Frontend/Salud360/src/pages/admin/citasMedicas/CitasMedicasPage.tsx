import { AdminCitaMedicaCard } from "@/components/calendario/AdminCitaMedica";
import Calendario from "@/components/calendario/Calendario";
import ActualizarCitaModalForm from "@/components/calendario/modals/actualizarCitaModalForm";
import RegistrarCitaModalForm from "@/components/calendario/modals/registrarCitaModalForm";
import SelectLabel from "@/components/SelectLabel";
import { useFetchHandler } from "@/hooks/useFetchHandler";
import { citaMedicaType } from "@/schemas/citaMedica";
import { medicoType } from "@/schemas/medico";
import { getAllCitasMedicasAPI } from "@/services/citasMedicasAdmin.service";
import { getMedicos } from "@/services/medico.service";
import { CircleDot } from "lucide-react";
import { DateTime } from "luxon";
import { useCallback, useEffect, useMemo, useState } from "react";
import colors from "tailwindcss/colors";

export default function RegistrarCitaMedicasPage() {
  const [medicos, setMedicos] = useState<medicoType[]>([]);
  const [medicoInput, setMedicoInput] = useState("");
  const medicoSeleccionado = useMemo(
    () => medicos.find(({ idMedico }) => idMedico?.toString() === medicoInput),
    [medicoInput, medicos]
  );

  const { fetch } = useFetchHandler();

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
      medicoSeleccionado && (
        <RegistrarCitaModalForm
          open={open}
          setOpen={setOpen}
          date={date}
          medico={medicoSeleccionado}
        />
      ),
    [medicoSeleccionado]
  );

  const actualizar = useCallback(
    ({
      open,
      setOpen,
      data,
    }: {
      open: boolean;
      setOpen: (_: boolean) => void;
      data: citaMedicaType;
    }) => (
      <ActualizarCitaModalForm
        open={open}
        setOpen={setOpen}
        citaMedica={data}
      />
    ),
    []
  );

  // const [showDeactivated, setShowDeactivated] = useState(false);

  useEffect(() => {
    fetch(async () => {
      const data = await getMedicos();
      setMedicos(data);
    });
  }, []);

  return (
    <>
      <title>Citas médicas</title>
      <div className="grid grid-rows-[auto_1fr] min-h-0 min-w-0 gap-2">
        <div className="w-full flex flex-col gap-4 px-8 py-8 text-left">
          <div>
            <h1 className="text-4xl font-bold mb-2">Citas médicas</h1>
            <h2 className="text-lg text-gray-700 mb-2">
              Seleccione un médico para crear y editar citas
            </h2>
          </div>
          <div className="self-stretch">
            <SelectLabel
              htmlFor="medico"
              label="Médico"
              placeholder="Seleccione un médico"
              value={medicoInput}
              onChange={setMedicoInput}
              options={medicos.map(
                ({ idMedico, nombres, apellidos, especialidad }) => ({
                  value: idMedico?.toString() ?? "",
                  content: `${nombres} ${apellidos} - ${especialidad}`,
                })
              )}
            />
          </div>
          <hr className="border mt-4" />
        </div>

        {medicoSeleccionado !== undefined ? (
          <div className="px-8 min-h-0 min-w-0">
            <Calendario<citaMedicaType>
              getRangeDateFromData={(d) =>
                d.horaInicio && d.horaFin && d.fecha
                  ? [
                      d.fecha.set({
                        hour: d.horaInicio.hour,
                        minute: d.horaInicio.minute,
                      }),
                      d.fecha.set({
                        hour: d.horaFin.hour,
                        minute: d.horaFin.minute,
                      }),
                    ]
                  : undefined
              }
              fetchData={async () =>
                (await getAllCitasMedicasAPI())?.filter(
                  ({ medico }) =>
                    medico?.idMedico === medicoSeleccionado?.idMedico &&
                    medico?.idMedico !== undefined
                ) ?? []
              }
              fetchDataDependences={[medicoSeleccionado]}
              cards={{
                day: (d) => <AdminCitaMedicaCard citaMedica={d} />,
                week: (d) => <AdminCitaMedicaCard citaMedica={d} />,
                month: (d) => (
                  <AdminCitaMedicaCard collapsed={true} citaMedica={d} />
                ),
              }}
              // filterContent={
              //   <div>
              //     <div>
              //       <span className="mr-4">Mostrar desactivados</span>
              //       <Switch
              //         checked={showDeactivated}
              //         onCheckedChange={() => {
              //           setShowDeactivated((prev) => !prev);
              //         }}
              //       />
              //     </div>
              //   </div>
              // }
              filterFuncs={[(d) => Boolean(d.activo)]}
              RegisterForm={registrar}
              ActualizarForm={actualizar}
            />
          </div>
        ) : (
          <>
            <div className="mt-30 flex items-center flex-col gap-4">
              <CircleDot color={colors.blue["500"]} size={48} />
              <p className="text-2xl max-w-88">
                Seleccione un médico para comenzar.
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
