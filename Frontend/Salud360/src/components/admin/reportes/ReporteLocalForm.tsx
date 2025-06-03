import InputIconLabelEdit from "@/components/InputIconLabelEdit"
import SelectIconLabel from "@/components/SelectIconLabel"
import { Calendar, Shield } from "lucide-react"
import { FaHandHoldingUsd } from "react-icons/fa";
import Button from "@/components/Button";
import axios from "axios";

interface Props {
  data: {
    fechaInicio: string;
    fechaFin: string;
    servicio: string;
    descripcion: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function ReporteLocalForm({ data, onChange }: Props) {
  const handleGenerarReporte = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/reportes/locales", {
        descripcion: data.descripcion,
        fechaInicio: data.fechaInicio,
        fechaFin: data.fechaFin,
        servicio: data.servicio
      }, {
        auth: {
          username: "admin",
          password: "admin123"
        },
        responseType: "blob"
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "reporte-locales.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (error) {
      console.error("Error al generar reporte de locales:", error);
      alert("Hubo un error al generar el reporte.");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InputIconLabelEdit
        icon={<Calendar className="w-5 h-5" />} htmlFor="fechaInicio"
        type="date" label="Fecha inicio"
        value={data.fechaInicio} onChange={onChange}
      />
      <InputIconLabelEdit
        icon={<Calendar className="w-5 h-5" />} htmlFor="fechaFin"
        type="date" label="Fecha fin"
        value={data.fechaFin} onChange={onChange}
      />
      <SelectIconLabel
        icon={<FaHandHoldingUsd className="w-5 h-5" />} htmlFor="servicio"
        label="Servicio"
        value={data.servicio} onChange={onChange}
        options={[{ value: "", label: "Elige una opcion" }]}
      />
      <div className="col-span-2 flex justify-end mt-4">
        <Button type="button" onClick={handleGenerarReporte}>
          Generar reporte
        </Button>
      </div>
    </div>
  )
}
