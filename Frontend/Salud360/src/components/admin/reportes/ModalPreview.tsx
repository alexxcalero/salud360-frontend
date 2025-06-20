import React from "react";
import { Dialog } from "@headlessui/react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  titulo: string;
  imagenPreview: string;
  contenido: React.ReactNode;
}

export default function ModalPreview({
  isOpen,
  onClose,
  onConfirm,
  titulo,
  contenido,
  imagenPreview
}: Props) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <Dialog.Panel className="bg-white rounded-lg shadow-xl p-6 w-full max-w-3xl">
          <Dialog.Title className="text-xl font-bold mb-6">{titulo}</Dialog.Title>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Columna izquierda: contenido + pregunta + botones */}
            <div className="text-justify">
              <div className="mb-6">{contenido}</div>
              <p className="mb-4 text-gray-700">¿Desea generar el reporte?</p>
              <div className="flex justify-start gap-4">
                <button className="px-4 py-2 rounded bg-gray-200" onClick={onClose}>Cancelar</button>
                <button className="px-4 py-2 rounded bg-blue-600 text-white" onClick={onConfirm}>Generar</button>
              </div>
            </div>

            {/* Columna derecha: imagen */}
            <div className="flex justify-center items-start h-full">
              <img
                src={imagenPreview}
                alt="Vista previa del reporte"
                className="h-full max-h-[450px] w-auto rounded shadow border object-contain"
              />
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
