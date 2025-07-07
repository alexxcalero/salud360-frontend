import { useState } from "react";
import mastercard from "@/assets/method-mastercard.svg";
import visa from "@/assets/method-visa.svg";
import { Trash } from "lucide-react";
import colors from "tailwindcss/colors";
import ModalError from "@/components/ModalError";
import ModalExito from "@/components/ModalExito";
import { baseAPI } from "@/services/baseAPI";

const CardMetodoPago = ({
  method,
  numero,
  id, // Asumiendo que el método tiene un `id` único
  fetchMetodoPago // Función para actualizar los métodos de pago en el componente padre
}: {
  method: "mastercard" | "visa";
  numero: string;
  id: number;
  fetchMetodoPago: () => void; // Se pasa como prop
}) => {
  const [showModalError, setShowModalError] = useState(false);
  const [showModalExito, setShowModalExito] = useState(false);

  // Verificar que el número de tarjeta tenga al menos 16 caracteres
  const displayNumber = numero ? `**** **** **** ${numero.substring(numero.length - 4)}` : "Número no disponible";

  // Función para eliminar el método de pago
  const eliminarMetodoPago = () => {
    //console.log(id);  // Verifica el valor de id aquí
    baseAPI.delete(`/mediosDePago/${id}`, {
        auth: { username: "admin", password: "admin123" }
    })
    .then(() => {
      setShowModalExito(true);
      setShowModalError(false);
    })
    .catch((err) => {
      console.error("Error eliminando el método de pago:", err);
    });
  };

  return (
    <div className="rounded-md shadow-md p-4 bg-white flex items-center justify-between">
      <div>
        <img
          src={method === "mastercard" ? mastercard : visa}
          alt=""
          className="h-[24px] inline mr-4"
        />
        <span className="text-sm text-neutral-700">{displayNumber}</span>
      </div>

      <div>
        <button onClick={() => setShowModalError(true)}>
          <Trash color={colors.red["500"]} />
        </button>
      </div>

      {/* Modal de confirmación */}
      {showModalError && (
        <div className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
            <ModalError
              modulo="¿Estás seguro de que quieres eliminar este método de pago?"
              detalle={`Método: ${method} - ${displayNumber}`}
              onConfirm={eliminarMetodoPago} // Eliminar método de pago
              onCancel={() => setShowModalError(false)} // Cerrar el modal sin hacer nada
            />
          </div>
        </div>
      )}

      {showModalExito && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40" />
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <ModalExito
              modulo="Método de Pago eliminado correctamente!"
              detalle="El Método de Pago fue eliminado correctamente"
              onConfirm={() => {
                setShowModalExito(false);
                fetchMetodoPago(); // Actualiza los métodos de pago
              }}
            />
          </div>
        </>
      )}

    </div>
  );
};

export default CardMetodoPago;