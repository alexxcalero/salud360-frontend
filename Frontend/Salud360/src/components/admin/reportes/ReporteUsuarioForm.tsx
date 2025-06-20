import InputIconLabelEdit from "@/components/InputIconLabelEdit"
//import SelectIconLabel from "@/components/SelectIconLabel"
import { Calendar } from "lucide-react"
//import { FaBuilding } from "react-icons/fa";
//import { FaHandHoldingUsd } from "react-icons/fa";
import Button from "@/components/Button";
import { useEffect, useState } from "react";
import ModalPreview from "@/components/admin/reportes/ModalPreview"; 
import previewUsuario from "@/assets/previewUsuario.png";
import { baseAPI } from "@/services/baseAPI";


interface Props {
  data: {
    fechaInicio: string;
    fechaFin: string;
    descripcion: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}
export default function ReporteUsuarioForm({ data, onChange }: Props) {
  const [showPreview, setShowPreview] = useState(false);
  
  const descargarReporte = async () => {
    try {
      const response = await baseAPI.post("/reportes/usuarios", {
        fechaInicio: data.fechaInicio,
        descripcion: data.descripcion,
        fechaFin: data.fechaFin,
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
      link.setAttribute("download", "reporte-usuarios.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (error) {
      console.error("Error al generar reporte de usuarios:", error);
      alert("Hubo un error al generar el reporte.");
    }
  };

  const handleGenerarReporte = () => {
    setShowPreview(true); // esto muestra el pop-up
  };


  return (
    <>
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
      </div>

      <ModalPreview
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        onConfirm={() => {
          setShowPreview(false);
          descargarReporte();
        }}
        titulo="Vista previa del Reporte de Usuarios"
        imagenPreview={previewUsuario}
        contenido={
          <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
            {data.descripcion}
            <br /><br />
            <strong>Rango seleccionado:</strong><br />
            Desde: {data.fechaInicio || "No seleccionado"}<br />
            Hasta: {data.fechaFin || "No seleccionado"}
          </div>
        }
      />
    </>
  );

}
