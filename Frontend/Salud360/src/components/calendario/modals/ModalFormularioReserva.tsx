import Button from "@/components/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";
import { UploadCloud } from "lucide-react";
import { useDialog } from "@/hooks/dialogContext";
import { useNavigate, useParams } from "react-router";

const ModalFormularioReserva = ({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (descripcion: string, archivo?: File) => Promise<void>;
}) => {
  const [descripcion, setDescripcion] = useState("");
  const [archivo, setArchivo] = useState<File | undefined>();

  const { callErrorDialog } = useDialog();

  const { id } = useParams();
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) setArchivo(selected);
  };

  const handleDragDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) setArchivo(dropped);
  };

  const validarCampos = (): boolean => {
    if (!descripcion || descripcion.trim() === "") {
      callErrorDialog({
        title: "Error en el formulario",
        description: "La descripción no puede estar vacía.",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validarCampos()) return;

    try {
      await onSubmit(descripcion, archivo);
      navigate(`/usuario/comunidades/detalle/${id}/reservas`);
    } catch (e) {
      callErrorDialog({
        title: "Error en el formulario",
        description: "Hubo un error al enviar el archivo. Intenta de nuevo.",
      });
    }
  };

  return (
    <>
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Formulario de carga de documentos médicos
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 pt-2">
            <label className="block">
              <span className="text-sm font-medium text-neutral-700">
                Descripción *
              </span>
              <textarea
                className="w-full border border-neutral-300 rounded-md p-2 mt-1 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe tu motivo de consulta..."
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                rows={4}
              />
            </label>

            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDragDrop}
              className="w-full border-2 border-dashed border-neutral-300 rounded-md p-4 text-center text-sm text-neutral-500 hover:border-blue-400 transition-colors"
            >
              <UploadCloud className="mx-auto mb-2 text-blue-500" size={100} />
              {archivo ? (
                <p className="text-neutral-700 font-medium">{archivo.name}</p>
              ) : (
                <p>Arrastra los archivos o</p>
              )}
              <label className="inline-block mt-2 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600">
                Buscar archivos
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            <p className="text-xs text-neutral-500 mt-1">
              El envío de los documentos es opcional. En caso no se envíe ningún
              archivo, se enviará un enlace por correo para adjuntarlos luego.
            </p>
          </div>

          <DialogFooter className="pt-4 gap-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="w-full sm:w-auto"
            >
              Cancelar
            </Button>
            <Button onClick={handleSubmit} className="w-full sm:w-auto">
              Continuar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ModalFormularioReserva;
