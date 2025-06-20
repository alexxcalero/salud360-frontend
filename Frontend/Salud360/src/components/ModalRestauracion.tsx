//import React from "react";

interface Props {
  modulo?: string;
  detalle?: string;
  accion?: "restaurado"; // NUEVO
  onConfirm: () => void;
}

function ModalRestauracion({ modulo = "", detalle = "", accion = "restaurado", onConfirm }: Props) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-md max-w-md w-full text-center">
      {/* Círculo con check */}
      <div className="flex justify-center mb-4">
        <div className="bg-green-500 rounded-full w-16 h-16 flex items-center justify-center">
          <span className="text-white text-3xl font-bold">✔</span>
        </div>
      </div>

      {/* Título dinámico */}
      <h2 className="text-2xl font-bold mb-2">
        ¡{modulo} {accion} correctamente!
      </h2>

      {/* Subtítulo */}
      <p className="mb-6">{detalle}</p>

      {/* Botón */}
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded"
        onClick={onConfirm}
      >
        Aceptar
      </button>
    </div>
  );
}

export default ModalRestauracion;