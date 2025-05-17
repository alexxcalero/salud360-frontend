// components/ModalConfirmacionLogout.tsx


interface Props {
  onConfirm: () => void;
  onCancel: () => void;
}

function ModalConfirmacionLogout({ onConfirm, onCancel }: Props) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-md max-w-md w-full text-center">
      <div className="flex justify-center mb-4">
        <div className="bg-red-500 rounded-full w-16 h-16 flex items-center justify-center">
          <span className="text-white text-3xl font-bold">!</span>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-2">¿Cerrar sesión?</h2>
      <p className="mb-6">Se cerrará tu sesión actual y volverás al inicio.</p>

      <div className="flex gap-4 justify-center">
        <button
          className="bg-gray-300 hover:bg-gray-400 text-black font-semibold px-4 py-2 rounded"
          onClick={onCancel}
        >
          Cancelar
        </button>
        <button
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded"
          onClick={onConfirm}
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}

export default ModalConfirmacionLogout;
