//import React from "react";

import { Check } from "lucide-react";

interface Props{
  modulo?: string;
  detalle?: string;
  onConfirm: () => void;
}

function ModalExito({modulo="", detalle="", onConfirm}: Props) {
  return (
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-md w-full text-center">
        {/* Círculo con check */}
        <div className="flex justify-center mb-4">
          <div className="bg-green-500 rounded-full w-16 h-16 flex items-center justify-center">
            <Check color="white" size={38} />
          </div>
        </div>

        

        {/* Título */}
        <h2 className="text-2xl font-bold mb-2">{modulo}</h2>

        {/* Subtítulo */}
        <p className="mb-6">{detalle}</p>

        {/* Botón */}
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded" onClick={onConfirm}>
          Aceptar
        </button>
      </div>
  );
}

export default ModalExito;