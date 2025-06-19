//import React from "react";
import { createPortal } from "react-dom";

interface Props {
  titulo?: string;
  mensaje?: string;
  textoBoton?: string;
  onClose: () => void;
}

function ModalValidacion({ titulo = "Validación", mensaje = "", textoBoton = "Entendido", onClose }: Props) {
  return createPortal(
    //PARA QUE NO SE CLICKEEN COSAS DEL FONDO DENTRO DEL FORM
    <div
      className="fixed inset-0 z-[9999] bg-black/60 flex items-center justify-center"
      style={{ pointerEvents: "auto" }}
    >
      <div
        className="bg-white p-8 rounded-2xl shadow-md max-w-md w-full text-center z-[10000]"
        onClick={(e) => e.stopPropagation()}
      >
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
    </div>,
    document.body
  );
}

export default ModalValidacion;

//Version sin portal pq se loquea con el form de reserva:
/*
return (
    <div className="bg-white p-8 rounded-2xl shadow-md max-w-md w-full text-center">
      {/Ícono informativo}
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

*/