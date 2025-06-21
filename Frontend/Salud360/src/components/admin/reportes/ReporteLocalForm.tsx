import InputIconLabelEdit from "@/components/InputIconLabelEdit"
//import SelectIconLabel from "@/components/SelectIconLabel"
import SelectIconLabelNum from "@/components/SelectIconLabelNum"
//, Shield 
import { Calendar } from "lucide-react"
import { FaHandHoldingUsd } from "react-icons/fa";
import Button from "@/components/Button";
import { useEffect, useState } from "react";
import ModalPreview from "@/components/admin/reportes/ModalPreview";
import previewLocal from "@/assets/previewLocal.png"; 
import { baseAPI } from "@/services/baseAPI";


interface Props {
  data: {
    fechaInicio: string;
    fechaFin: string;
    idservicio: number;
    descripcion: string;
    idlocal?: number;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function ReporteLocalForm({ data, onChange }: Props) {
  const [servicios, setServicios] = useState<{ value: number; content: string }[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const res = await baseAPI.get("/servicios", {
          auth: { username: "admin", password: "admin123" }
        });
        const opciones = res.data.map((s: any) => ({ value: s.idServicio, content: s.nombre }));
        setServicios([{ value: "", content: "Elige una opción" }, ...opciones]);
      } catch (err) {
        console.error("Error cargando servicios", err);
      }
    }
    fetchServicios();
  }, []);
  
  const descargarReporte = async () => {
    try {
      const response = await baseAPI.post("/reportes/locales", {     
        fechaInicio: data.fechaInicio,
        descripcion: data.descripcion,
        fechaFin: data.fechaFin,
        servicio: data.idservicio
      }, {
        auth: {
          username: "admin",
          password: "admin123"
        }
      });

      const base64 = response.data.pdf;
      const byteCharacters = atob(base64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });

      const url = window.URL.createObjectURL(blob);
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


  const handleGenerarReporte = () => {
    setShowPreview(true); // esto muestra el pop-up
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
      <div className="col-span-2 flex justify-end mt-4">
        <Button type="button" onClick={handleGenerarReporte}>
          Generar reporte
        </Button>
      </div>
      <ModalPreview
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        onConfirm={() => {
          setShowPreview(false);
          descargarReporte();
        }}
        titulo="Vista previa del Reporte de Locales"
        imagenPreview={previewLocal} 
        contenido={
          <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed text-justify">
            {data.descripcion}
            <br /><br />
            <strong>Rango seleccionado:</strong><br />
            Desde: {data.fechaInicio || "No seleccionado"}<br />
            Hasta: {data.fechaFin || "No seleccionado"}
          </div>
        }
      />
    </div>
  )
}
