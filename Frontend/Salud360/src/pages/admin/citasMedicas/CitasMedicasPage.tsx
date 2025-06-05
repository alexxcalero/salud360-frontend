import { AdminCitaMedicaCard } from "@/components/calendario/AdminCitaMedica";
import AdminCitaMedicaDot from "@/components/calendario/AdminCitaMedicaDot";
import Calendario from "@/components/calendario/Calendario";
import RegistrarCitaModalForm from "@/components/calendario/modals/registrarCitaModalForm";
import SelectLabel from "@/components/SelectLabel";
import { Switch } from "@/components/ui/switch";
import { useFetchHandler } from "@/hooks/useFetchHandler";
import {
  InternalModalsProvider,
  useInternalModals,
} from "@/hooks/useInternalModals";
import { citaMedicaType } from "@/schemas/citaMedica";
import { medicoType } from "@/schemas/medico";
import { getAllCitasMedicasAPI } from "@/services/citasMedicasAdmin.service";
import { getMedicos } from "@/services/medico.service";
import { CircleDot } from "lucide-react";
import { DateTime } from "luxon";
import { useEffect, useMemo, useState } from "react";
import colors from "tailwindcss/colors";

export default function RegistrarCitaMedicasPage() {
  return (
    <InternalModalsProvider>
      <RegistrarCitaMedicasPageWrapped />
    </InternalModalsProvider>
  );
}

const RegistrarCitaMedicasPageWrapped = () => {
  const [medicos, setMedicos] = useState<medicoType[]>([]);
  const [medicoInput, setMedicoInput] = useState("");
  const medicoSeleccionado = useMemo(
    () => medicos.find(({ idMedico }) => idMedico?.toString() === medicoInput),
    [medicoInput, medicos]
  );

  const [createDate, setCreateDate] = useState<DateTime | undefined>();
  const { fetch } = useFetchHandler();
  const { activeModal, setActiveModal, reloadState, reload } =
    useInternalModals();

  const [data, setData] = useState<citaMedicaType[]>([]);

  const [showDeactivated, setShowDeactivated] = useState(false);

  useEffect(() => {
    fetch(async () => {
      const data = await getMedicos();
      setMedicos(data);
    });
  }, []);

  useEffect(() => {
    fetch(async () => {
      const data = await getAllCitasMedicasAPI();
      setData(
        data?.filter(
          ({ medico }) =>
            medico?.idMedico === medicoSeleccionado?.idMedico &&
            medico?.idMedico !== undefined
        ) ?? []
      );
    });
  }, [medicoSeleccionado, reloadState]);

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="w-full px-8 py-8 text-left">
          <h1 className="text-4xl font-bold mb-2">Citas médicas</h1>
          <h2 className="text-lg text-gray-700 mb-6">
            Seleccione un médico para ver y crear citas.
          </h2>
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
          <hr className="mt-16 border"/>
        </div>

        {medicoSeleccionado !== undefined ? (

          <div className="w-full px-8">
            <Calendario<citaMedicaType>
              data={data}
              rangeDaysFilterFunc={(initial, final, d) =>
                d.fecha !== undefined && initial <= d.fecha && d.fecha <= final
              }
              metadata={{
                day: {
                  card: (d) => <AdminCitaMedicaCard citaMedica={d} />,
                  equalFunc: (data: citaMedicaType, fecha: DateTime) =>
                    Boolean(
                      data.fecha?.hasSame(fecha, "day") &&
                        data.fecha?.hasSame(fecha, "month") &&
                        data.fecha?.hasSame(fecha, "year") &&
                        data.horaInicio?.hasSame(fecha, "hour")
                    ),
                },
                week: {
                  card: (d) => <AdminCitaMedicaCard citaMedica={d} />,
                  equalFunc: (data: citaMedicaType, fecha: DateTime) =>
                    Boolean(
                      data.fecha?.hasSame(fecha, "day") &&
                        data.fecha?.hasSame(fecha, "month") &&
                        data.fecha?.hasSame(fecha, "year") &&
                        (data.horaInicio?.hour ?? Infinity) >= fecha.hour &&
                        (data.horaInicio?.hour ?? Infinity) < fecha.hour + 1
                    ),
                },
                month: {
                  card: (d) => <AdminCitaMedicaDot citaMedica={d} />,
                  equalFunc: (data: citaMedicaType, fecha: DateTime) =>
                    Boolean(
                      data.fecha?.hasSame(fecha, "day") &&
                        data.fecha?.hasSame(fecha, "month") &&
                        data.fecha?.hasSame(fecha, "year")
                    ),
                },
              }}
              blankTileAction={(date) => {
                setCreateDate(date);
                setActiveModal?.("registrarCita");
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
            {medicoSeleccionado !== undefined && createDate !== undefined && (
              <RegistrarCitaModalForm
                key={createDate.toISO()}
                open={activeModal === "registrarCita"}
                setOpen={(b) =>
                  b ? setActiveModal?.("registrarCita") : setActiveModal?.("")
                }
                date={createDate}
                medico={medicoSeleccionado}
              />
            )}
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
};
