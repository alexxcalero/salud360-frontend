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
import { baseAPI } from "@/services/baseAPI"
import { useCallback, useEffect, useMemo, useState } from "react";
import colors from "tailwindcss/colors";

import ModalError from "@/components/ModalError";
import ModalExito from "@/components/ModalExito";
import ModalValidacion from "@/components/ModalValidacion";
import ButtonIcon from "@/components/ButtonIcon";
import { Filter, FolderPlus, Info, Pencil, RotateCcw, Search, Trash2, UserPlus } from "lucide-react";


export default function ClasesPage() {
  const [locales, setLocales] = useState<localType[]>([]);
  const [localInput, setLocalInput] = useState("");

  const [showModalExito, setShowModalExito] = useState(false);
  const [showModalValidacion, setShowModalValidacion] = useState(false);
    
  const [clases, setClases] = useState<claseDTOType[]>([]);

  const [forceReload, setForceReload] = useState(false);
  const [mensajeError, setMensajeError] = useState("");
  
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

  //Para la recarga luego de la carga masvia
  useEffect(() => {
    if (localSeleccionado) {
      getAllClasesAPI().then(data => {
        const clasesFiltradas = data?.filter(
          ({ local }) =>
            local?.idLocal === localSeleccionado.idLocal
        ) ?? [];
        setClases(clasesFiltradas);
      });
    }
  }, [localSeleccionado]);

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




  // PARA LA CARGA MASIVA
      const handleCSVUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;
  
      const formData = new FormData();
      formData.append("file", file);
  
      try {
          const response = await baseAPI.post("/clases/cargaMasiva", formData, {
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
        if (error.response?.status === 409 ||(mensajeBackend.includes("Cruce entre clases nuevas en el archivo CSV en la fecha")||mensajeBackend.includes("se cruza con una ya existente en la fecha"))) {
          setMensajeError(error.response.data.message); // conflicto de horario
        } else if (error.response?.status === 400 && mensajeBackend.includes("debe durar exactamente 1 hora")) {
          setMensajeError(error.response.data.message); // duración incorrecta
        } else if (error.response?.status === 400 && mensajeBackend.includes("Header name") && mensajeBackend.includes("not found")) {
          setMensajeError("El archivo CSV no tiene los encabezados esperados: nombre, descripcion, fecha, hora_inicio, hora_fin, id_local"); 
        }else if (error.response?.status === 500 && mensajeBackend.includes("Local con ID ") && mensajeBackend.includes("no encontrado")) {
          setMensajeError(error.response.data.message);
        } else {
          setMensajeError("Verifique que todos los campos del CSV estén correctamente llenados.");
          
        }
        setShowModalValidacion(true);
      }
      };



  return (
    <>
      <title>Clases</title>
      <div className="grid grid-rows-[auto_1fr] min-h-0 min-w-0 gap-2">
        <div className="w-full flex flex-col gap-4 px-8 py-8 text-left">
          <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Clases</h1>
            <h2 className="text-lg text-gray-700">
              Seleccione un local para crear y editar clases
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
                fetchDataDependences={[localSeleccionado,forceReload]}
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
                  day: (d) => <AdminClaseCard clase={d} />,
                  week: (d) => <AdminClaseCard clase={d} />,
                  month: (d) => <AdminClaseCard clase={d} collapsed={true} />,
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
