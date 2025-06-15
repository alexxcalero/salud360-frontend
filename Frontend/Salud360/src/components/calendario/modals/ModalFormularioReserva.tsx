import Button from "@/components/Button";
import {Dialog,DialogContent,DialogHeader,DialogTitle,DialogFooter,} from "@/components/ui/dialog";
import { useState } from "react";
import { UploadCloud } from "lucide-react";
import ModalValidacion from "@/components/ModalValidacion";

const ModalFormularioReserva = ({onClose,  onSubmit,}: {
  onClose: () => void;
  onSubmit: (descripcion: string, archivo?: File) => void;
}) => {
  const [descripcion, setDescripcion] = useState("");
  const [archivo, setArchivo] = useState<File | undefined>();

  const [showModalValidacion, setShowModalValidacion] = useState(false);
  const [mensajeValidacion, setMensajeValidacion] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) setArchivo(selected);
  };

  const handleDragDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) setArchivo(dropped);
  };

  const validarCampos = (): boolean => {
    if (!descripcion || descripcion.trim() === "") {
      setMensajeValidacion("La descripción no puede estar vacía.");
      setShowModalValidacion(true);
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validarCampos()) return;

    try {
      onSubmit(descripcion, archivo);
    } catch (e) {
      setMensajeValidacion("Hubo un error al enviar el archivo. Intenta de nuevo.");
      setShowModalValidacion(true);
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
              El envío de los documentos es opcional. En caso no se envíe ningún archivo, se enviará un enlace por correo para adjuntarlos luego.
            </p>
          </div>

          <DialogFooter className="pt-4 gap-2">
            <Button
              variant="secondary"
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

      {/* Portal porque se loqueaba el modal de validacion */}
      {showModalValidacion && (
        <ModalValidacion
          titulo="Error en el formulario"
          mensaje={mensajeValidacion}
          textoBoton="Entendido"
          onClose={() => setShowModalValidacion(false)}
        />
      )}
    </>
  );
};

export default ModalFormularioReserva;