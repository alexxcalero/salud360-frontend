//import React from "react";
//import Button from "./Button";

interface Props{
  modulo?: string;
  detalle?: string;
  detalle2?: string;
  buttonConfirm?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function ModalError({modulo="", detalle="", detalle2="", buttonConfirm="Eliminar", onConfirm, onCancel}: Props) {
  return (
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-md w-full text-center">
        {/* Icono de advertencia */}
        <div className="flex justify-center mb-4">
          <div className="bg-yellow-300 rounded-full w-16 h-16 flex items-center justify-center">
            <span className="text-white text-3xl font-bold">!</span>
          </div>
        </div>

        {/* Mensaje principal */}
        <h2 className="text-2xl font-bold mb-2">{modulo}</h2>

        {/* Detalle del elemento */}
        <p className="mb-6">{detalle}</p>

        <p className="text-sm mb-6">{detalle2}</p>

        {/* Botones */}
        <div className="flex flex-col space-y-3">
          <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded" onClick={onConfirm}>
            {buttonConfirm}
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded" onClick={onCancel}>
            Volver
          </button>
        </div>
      </div>
  );
}

export default ModalError;