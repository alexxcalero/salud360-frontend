//import React from "react";
//import Button from "./Button";

interface Props{
  modulo?: string;
  detalle?: string;
  onConfirm: () => void;
  onCancel: () => void;
}
//rb onConfirm,
function ModalError({modulo="", detalle="",  onCancel}: Props) {
  return (
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-md w-full text-center">
        {/* Icono de advertencia */}
        <div className="flex justify-center mb-4">
          <div className="bg-yellow-300 rounded-full w-16 h-16 flex items-center justify-center">
            <span className="text-white text-3xl font-bold">!</span>
          </div>
        </div>

        {/* Mensaje principal */}
        <h2 className="text-2xl font-bold mb-2">Datos ingresados incorrectos</h2>

        {/* Detalle del elemento */}
        <p className="mb-6">{modulo} {detalle}</p>

        {/* Botones */}
        <div className="flex flex-col space-y-3">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded" onClick={onCancel}>
            Ok
          </button>
        </div>
      </div>
  );
}

export default ModalError;