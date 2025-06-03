import Calendario from "@/components/calendario/Calendario";
import RegistrarCitaModalForm from "@/components/calendario/modals/registrarCitaModalForm";
import SelectLabel from "@/components/SelectLabel";
import { DialogContent, Dialog } from "@/components/ui/dialog";
import { useLoading } from "@/hooks/LoadingContext";
import { useToasts } from "@/hooks/ToastContext";
import { medicoType } from "@/schemas/medico";
import { ArrowLeft, CircleDot } from "lucide-react";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import colors from "tailwindcss/colors";

const RegistrarCitaMedicasPage = () => {
  const navigate = useNavigate();
  const [medicos, setMedicos] = useState<medicoType[]>([]);
  const [medicoSeleccionado, setMedicoSeleccionado] = useState<
    medicoType | undefined
  >();
  const [openCreate, setOpenCreate] = useState(false);
  const [createDate, setCreateDate] = useState<DateTime | undefined>();
  const { setLoading } = useLoading();
  const { createToast } = useToasts();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        setMedicos([
          {
            idUsuario: 102,
            nombres: "Luis",
            apellidos: "García",
            numeroDocumento: "87654321",
            correo: "luis.garcia@hospital.com",
            especialidad: "Pediatría",
            descripcion: "Experto en cuidado infantil.",
          },
        ]);
      } catch (error) {
        createToast("error", { title: "error" });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div>
        <div className="p-4 flex flex-col items-start gap-3">
          <button onClick={() => navigate("/admin/citasMedicas")}>
            <ArrowLeft />
          </button>
          <h1>Registro de clases</h1>
          <p className="self-stretch text-left">
            Escoja un local primero, en el cual se realizarà la clase
          </p>
          <div className="self-stretch">
            <SelectLabel
              htmlFor="medico"
              label="Seleccione el mèdico a quien asignar *"
              placeholder="Seleccione un mèdico"
              onChange={(val: string) =>
                setMedicoSeleccionado(
                  medicos.find(({ idUsuario }) => idUsuario.toString() === val)
                )
              }
              options={medicos.map(
                ({ idUsuario, nombres, apellidos, especialidad }) => ({
                  value: idUsuario.toString(),
                  content: `${nombres} ${apellidos} - ${especialidad}`,
                })
              )}
            />
          </div>
        </div>

        {medicoSeleccionado !== undefined ? (
          <>
            <Calendario
              blankTileAction={(date) => {
                setCreateDate(date);
                setOpenCreate(true);
              }}
            />
            {medicoSeleccionado !== undefined && createDate !== undefined && (
              <RegistrarCitaModalForm
                open={openCreate}
                setOpen={setOpenCreate}
                date={createDate}
                medico={medicoSeleccionado}
              />
            )}
          </>
        ) : (
          <>
            <div className="mt-30 flex items-center flex-col gap-4">
              <CircleDot color={colors.blue["500"]} size={48} />
              <p>Seleccione un mèdico</p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default RegistrarCitaMedicasPage;
