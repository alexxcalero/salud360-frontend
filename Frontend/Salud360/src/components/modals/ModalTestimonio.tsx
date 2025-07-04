import InputLabel from "@/components/InputLabel";
import Button from "@/components/Button";
import useTestimonioForm from "@/hooks/useTestimonioForm";
import { useEffect, useState } from "react";
import ErrorModal from "@/components/modals/errorModal";

interface Props {
  onClose: () => void;
  onSubmit: (comentario: string, calificacion: number) => void;
  defaultValues?: {
    comentario: string;
    calificacion: number;
  };
}


function ModalTestimonio({ onClose, onSubmit, defaultValues}: Props) {
  const { comentario, setComentario, calificacion, setCalificacion} = useTestimonioForm();
  const [showError, setShowError] = useState(false);
  const [mensajeValidacion, setMensajeValidacion] = useState("");

  useEffect(() => {
    if (defaultValues) {
      setComentario(defaultValues.comentario);
      setCalificacion(defaultValues.calificacion);
    }
  }, [defaultValues]);

  return (
    <>
      {/* fondo oscuro */}
      <div className="fixed inset-0 bg-black/60 z-40" onClick={onClose} />
      
      {/* modal centrado */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl w-[500px] p-8 flex flex-col gap-6">
          <h2 className="text-2xl font-bold">Agregar Testimonio</h2>
          <p className="text-gray-600">Comparte tu experiencia con la comunidad</p>

          <div className="flex flex-col gap-4">
            <InputLabel
              type="textarea"
              label="Comentario"
              placeholder="Escribe tu comentario..."
              htmlFor="comentario"
              value={comentario}
              required
              onChange={(e) => setComentario(e.target.value)}
            />
            {mensajeValidacion && (
              <p className="text-red-500 text-sm -mt-2">{mensajeValidacion}</p>
            )}

            <label className="text-sm font-semibold">Calificación</label>
            <select
              value={calificacion}
              onChange={(e) => setCalificacion(Number(e.target.value))}
              className="border p-2 rounded w-full"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <Button variant="white" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                if (!comentario.trim()) {
                  setMensajeValidacion("El comentario no puede estar vacío.");
                  setShowError(true);
                  return;
                }
                if (comentario.length > 255) {
                  setMensajeValidacion("El comentario no puede tener más de 255 caracteres.");
                  return;
                }

                setMensajeValidacion(""); // limpia el mensaje si todo está ok
                onSubmit(comentario, calificacion);
              }}
            >
              Enviar
            </Button>
          </div>
        </div>
      </div>
      <ErrorModal
        open={showError}
        setOpen={setShowError}
        title="Comentario inválido"
        description="Por favor ingresa un comentario válido antes de enviarlo."
      />
    </>
  );
}

export default ModalTestimonio;
