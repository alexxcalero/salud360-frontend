import InputIconLabelEdit from "@/components/InputIconLabelEdit"
import SelectIconLabel from "@/components/SelectIconLabel"
import SelectIconLabelNum from "@/components/SelectIconLabelNum"
import { Calendar } from "lucide-react"
import { FaBuilding } from "react-icons/fa";
import Button from "@/components/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import ModalPreview from "@/components/admin/reportes/ModalPreview";
import previewServicio from "@/assets/previewServicio.png";


interface Props {
  data: {
    fechaInicio: string;
    fechaFin: string;
    idlocal: number;
    descripcion: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function ReporteServicioForm({ data, onChange }: Props) {
  const [locales, setLocales] = useState<{ value: number; label: string }[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const fetchLocales = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/locales", {
          auth: { username: "admin", password: "admin123" }
        });
        const opciones = res.data.map((l: any) => ({ value: l.idLocal, content: l.nombre }));
        setLocales([{ value: "", content: "Elige una opción" }, ...opciones]);
      } catch (err) {
        console.error("Error cargando locales", err);
      }
    };
    fetchLocales();
  }, []);

  const descargarReporte = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/reportes/servicios", {
        fechaInicio: data.fechaInicio,
        fechaFin: data.fechaFin,
        descripcion: data.descripcion,
        local: data.idlocal, // o servicio según el caso
      }, {
        auth: { username: "admin", password: "admin123" }
      });

      const base64 = response.data.pdf;
      const byteCharacters = atob(base64);
      const byteArray = new Uint8Array([...byteCharacters].map(c => c.charCodeAt(0)));
      const blob = new Blob([byteArray], { type: "application/pdf" });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "reporte-servicios.pdf"); // cambia nombre según formulario
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Error al generar el reporte:", err);
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
        titulo="Vista previa del Reporte de Servicios" // o Locales
        imagenPreview={previewServicio} // o previewLocal
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
