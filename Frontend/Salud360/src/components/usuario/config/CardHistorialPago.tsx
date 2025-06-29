import Button from "@/components/Button";
import { IPago } from "@/models/pago";
import { postBoletaAPI } from "@/services/reporte.service";
import { Info, Upload } from "lucide-react";

const CardHistorialPago = ({
  identificadorTransaccion,
  nombreComunidad,
  precio,
  fechaPago,
  onDetalles,
  pago,
}: {
  identificadorTransaccion: string;
  nombreComunidad: string;
  precio: number;
  fechaPago: string;
  onDetalles: () => void;
  pago?: any;
}) => {
  return (
    <div className="rounded-md shadow-md p-8 bg-white flex items-center justify-between">
      <div className="flex flex-col">
        <div className="flex flex-row items-center gap-4">
          <h3 className="text-neutral-800 mr-2">
            {identificadorTransaccion} - {nombreComunidad}
          </h3>
          <p className="bg-blue-500 text-lg font-bold text-white px-2 py-2 rounded-sm use-label-large mr-2">
            s/.{" "}
            {precio.toLocaleString("es-PE", {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })}
          </p>
        </div>

        <p className="text-left text-md text-neutral-600 block mt-2">
          Fecha de renovación:{" "}
          <time dateTime={fechaPago} className="text-neutral-800">
            {fechaPago}
          </time>
        </p>
      </div>

      <div className="flex flex-row gap-4">
        <Button size="lg" className="mr-2 rounded-sm" onClick={onDetalles}>
          <Info />
          Detalles
        </Button>
        <Button
          size="lg"
          className="mr-2 rounded-sm"
          onClick={async () => {
            const boleta = await postBoletaAPI(pago as IPago);
            const base64PDF = boleta.pdf;
            if (!base64PDF) return;
            const byteCharacters = atob(base64PDF);
            const byteNumbers = Array.from(byteCharacters, (char) =>
              char.charCodeAt(0)
            );
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: "application/pdf" });

            // Creamos un enlace para descargarlo
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "mi_archivo.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
        >
          <Upload />
          Descargar
        </Button>
      </div>
    </div>
  );
};

export default CardHistorialPago;
