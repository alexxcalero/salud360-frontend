import Button from "@/components/Button";
import { Info, Upload } from "lucide-react";

const CardHistorialPago = ({
  identificadorTransaccion,
  nombreComunidad,
  precio,
  fechaPago,
}: {
  identificadorTransaccion: string;
  nombreComunidad: string;
  precio: number;
  fechaPago: string;
}) => {
  return (
    <div className="rounded-md shadow-md p-4 bg-white flex items-center justify-between">
      <div>
        <span className="text-neutral-800 mr-2">
          {identificadorTransaccion} - {nombreComunidad}
        </span>
        <span className="bg-blue-500 text-white px-2 py-[2px] rounded-full use-label-large mr-2">
          s/.{" "}
          {precio.toLocaleString("es-PE", {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })}
        </span>

        <span className="text-sm text-left text-neutral-600 block mt-2">
          Fecha de renovación:{" "}
          <time dateTime={fechaPago} className="text-neutral-800">
            {fechaPago}
          </time>
        </span>
      </div>

      <div>
        <Button size="sm" className="mr-2 rounded-full">
          <Info />
          Detalles
        </Button>
        <Button size="sm" className="mr-2 rounded-full">
          <Upload />
          Descargar
        </Button>
      </div>
    </div>
  );
};

export default CardHistorialPago;
