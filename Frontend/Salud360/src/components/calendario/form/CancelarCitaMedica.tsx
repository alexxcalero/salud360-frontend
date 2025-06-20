import Button from "@/components/Button";
import { AuthContext } from "@/hooks/AuthContext";
import { useDialog } from "@/hooks/dialogContext";
import { useToasts } from "@/hooks/ToastContext";
import { useInternalModals } from "@/hooks/useInternalModals";
import { extenedCitaMedicaType } from "@/schemas/citaMedica";
import { Ban } from "lucide-react";
import { useContext } from "react";

const CancelarCitaMedica = ({
  citaMedica,
}: {
  citaMedica: extenedCitaMedicaType;
}) => {
  const { callErrorDialog, callAlertDialog } = useDialog();
  const { createToast } = useToasts();
  const { reload } = useInternalModals();
  const { usuario } = useContext(AuthContext);

  const handleDescargarArchivo = async () => {
    try {
      if (!citaMedica.nombreArchivo) return;
      const res = await fetch(`/api/archivo/${citaMedica.nombreArchivo}`);
      if (!res.ok) throw new Error("Error al obtener el archivo");
      const data = await res.json();
      window.open(data.url, "_blank");
    } catch (e) {
      console.error("Error al obtener el archivo:", e);
      callErrorDialog({ title: "No se pudo abrir el archivo." });
    }
  };

  return (
    <div className="p-2 flex flex-col gap-2">
      {/* Mostrar descripción si existe */}
      {citaMedica.descripcion && (
        <p className="mb-2 text-sm text-gray-700">
          <strong>Descripción médica:</strong> {citaMedica.descripcion}
        </p>
      )}
      <p className="mb-2 text-sm text-gray-700">
        <strong>Descripción xxxx:</strong> {citaMedica.descripcion}
      </p>
      <p className="mb-2 text-sm text-gray-700">
        <strong>Descripción asdasd:</strong> {citaMedica.nombreArchivo}
      </p>
      {/* Botón para descargar archivo médico */}
      {citaMedica.nombreArchivo ? (
        <Button onClick={handleDescargarArchivo}>
          Descargar archivo médico
        </Button>
      ) : (
        <p className="text-sm text-gray-600">
          No se adjuntó ningún archivo médico.
        </p>
      )}
      <Button
        variant="danger"
        onClick={() => {
          callAlertDialog({
            title: "¿Quieres cancelar esta reserva?",
            description: `${citaMedica.horaInicio?.toFormat(
              "T"
            )} - ${citaMedica.horaFin?.toFormat("T")}`,
            buttonLabel: "Cancelar",
            onConfirm: async () => {
              if (!usuario) {
                createToast("error", {
                  title: "Mal envio de datos",
                });
                return true;
              }
              reload();
              // const result = await deleteReservaAPI(citaMedica.);

              // if (result)
              //   callSuccessDialog({
              //     title: "Cita reservada correctamente",
              //   });
              // else
              //   callErrorDialog({
              //     title: "la cita no pudo ser reservada correctamente",
              //   });
              return false;
            },
          });
        }}
      >
        <Ban /> Cancelar Reserva
      </Button>
    </div>
  );
};

export default CancelarCitaMedica;
