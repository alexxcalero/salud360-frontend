import React from "react";

function ModalExito() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-md w-full text-center">
        {/* Círculo con check */}
        <div className="flex justify-center mb-4">
          <div className="bg-green-500 rounded-full w-16 h-16 flex items-center justify-center">
            <span className="text-white text-3xl font-bold">✔</span>
          </div>
        </div>

        {/* Título */}
        <h2 className="text-2xl font-bold mb-2">¡Rol creado correctamente!</h2>

        {/* Subtítulo */}
        <p className="mb-6">El rol fue creado correctamente</p>

        {/* Botón */}
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded">
          Volver
        </button>
      </div>
    </div>
  );
}

export default ModalExito;