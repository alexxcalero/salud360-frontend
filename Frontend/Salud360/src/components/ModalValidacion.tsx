import React from "react";

interface Props {
  titulo?: string;
  mensaje?: string;
  textoBoton?: string;
  onClose: () => void;
}

function ModalValidacion({ titulo = "Validación", mensaje = "", textoBoton = "Entendido", onClose }: Props) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-md max-w-md w-full text-center">
      {/* Ícono informativo */}
      <div className="flex justify-center mb-4">
        <div className="bg-yellow-400 rounded-full w-16 h-16 flex items-center justify-center">
          <span className="text-white text-3xl font-bold">!</span>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-2">{titulo}</h2>
      <p className="mb-6">{mensaje}</p>

      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded"
        onClick={onClose}
      >
        {textoBoton}
      </button>
    </div>
  );
}

export default ModalValidacion;