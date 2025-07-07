import { AdminCitaMedicaCard } from "@/components/calendario/AdminCitaMedica";
import Calendario from "@/components/calendario/Calendario";
import ActualizarCitaModalForm from "@/components/calendario/modals/actualizarCitaModalForm";
import RegistrarCitaModalForm from "@/components/calendario/modals/registrarCitaModalForm";
import SelectLabel from "@/components/SelectLabel";
import { Switch } from "@/components/ui/switch";
import { useFetchHandler } from "@/hooks/useFetchHandler";
import { citaMedicaType } from "@/schemas/citaMedica";
import { medicoType } from "@/schemas/medico";
import { getAllCitasMedicasAPI } from "@/services/citasMedicasAdmin.service";
import { getMedicos } from "@/services/medico.service";
import { CircleDot } from "lucide-react";
import { DateTime } from "luxon";
import { useCallback, useEffect, useMemo, useState } from "react";
import colors from "tailwindcss/colors";

import { baseAPI } from "@/services/baseAPI"
import ModalError from "@/components/ModalError";
import ModalExito from "@/components/ModalExito";
import ModalValidacion from "@/components/ModalValidacion";
import ButtonIcon from "@/components/ButtonIcon";
import { Filter, FolderPlus, Info, Pencil, RotateCcw, Search, Trash2, UserPlus } from "lucide-react";



export default function RegistrarCitaMedicasPage() {
  const [medicos, setMedicos] = useState<medicoType[]>([]);
  const [medicoInput, setMedicoInput] = useState("");

  const [showModalExito, setShowModalExito] = useState(false);
  const [showModalValidacion, setShowModalValidacion] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  
  const [forceReload, setForceReload] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

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

  const [showDeactivated, setShowDeactivated] = useState(false);

  useEffect(() => {
    fetch(async () => {
      const data = await getMedicos();
      setMedicos(data);
    });
  }, []);


  // PARA LA CARGA MASIVA
        const handleCSVUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
    
        const formData = new FormData();
        formData.append("file", file);
    
        try {
            const response = await baseAPI.post("/citas-medicas/cargaMasiva", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            auth: {
                username: "admin",
                password: "admin123"
            }
            });
    
            setShowModalExito(true);
        } catch (error: any) {
          const mensajeBackend = error.response?.data?.message || "";
          if (error.response?.status === 409 ||(mensajeBackend.includes("Cruce entre citas nuevas en el archivo CSV en la fecha")||mensajeBackend.includes("se cruza con una ya existente en la fecha"))) {
            setMensajeError(error.response.data.message); // conflicto de horario
          } else if (error.response?.status === 400 && mensajeBackend.includes("deben durar exactamente 1 hora")) {
            setMensajeError(error.response.data.message); // duración incorrecta
          } else if (error.response?.status === 400 && mensajeBackend.includes("Header name") && mensajeBackend.includes("not found")) {
            setMensajeError("El archivo CSV no tiene los encabezados esperados: fecha, hora_inicio, hora_fin, id_medico, id_servicio"); 
          }else if (error.response?.status === 500 && mensajeBackend.includes("Médico con ID ") && mensajeBackend.includes("no encontrado")) {
            setMensajeError(error.response.data.message);
          } else if (error.response?.status === 500 && mensajeBackend.includes("Servicio con ID ") && mensajeBackend.includes("no encontrado")) {
            setMensajeError(error.response.data.message);
          }else {
            setMensajeError("Verifique que todos los campos del CSV estén correctamente llenados.");
            
          }
          setShowModalValidacion(true);
         }
        };
  



  return (
    <>
      <title>Citas Médicas</title>
      <div className="grid grid-rows-[auto_1fr] min-h-0 min-w-0 gap-2">
        <div className="w-full flex flex-col gap-4 px-8 py-8 text-left">
          <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Citas médicas</h1>
            <h2 className="text-lg text-gray-700">
              Seleccione un médico para crear y editar citas
            </h2>
          </div>

          {/* Botón de carga masiva */}
          <div className="flex items-center">
            <ButtonIcon icon={<FolderPlus className="w-6 h-6" />} size="lg" variant="primary">
              <label htmlFor="csvUpload" className="cursor-pointer">Carga masiva</label>
            </ButtonIcon>
            <input
              id="csvUpload"
              type="file"
              accept=".csv"
              onChange={handleCSVUpload}
              className="hidden"
            />
          </div>
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

        {/* Modal CARGA MASIVA */}
                {showModalExito && (
                <>
                    <div className="fixed inset-0 bg-black/60 z-40" />
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <ModalExito
                            modulo="Carga masiva correcta"
                            detalle="Se registró de manera exitosa las clases mediante el archivo CSV"
                            onConfirm={() => {
                                setShowModalExito(false);
                                setForceReload(prev => !prev);
                                
                            }}
                        />
                    </div>
                </>
            )}

            {/* Modal CARGA MASIVA */}
            {showModalValidacion && (
                <>
                    <div className="fixed inset-0 bg-black/60 z-40" />
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <ModalValidacion
                            titulo="Error en la carga masiva"
                            mensaje={mensajeError}
                            onClose={() => setShowModalValidacion(false)}
                        />
                    </div>
                </>
            )}



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
              fetchDataDependences={[medicoSeleccionado,forceReload]}
              cards={{
                day: (d) => <AdminCitaMedicaCard citaMedica={d} />,
                week: (d) => <AdminCitaMedicaCard citaMedica={d} />,
                month: (d) => (
                  <AdminCitaMedicaCard collapsed={true} citaMedica={d} />
                ),
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
              filterFuncs={[(d) => Boolean(showDeactivated || d.activo)]}
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
