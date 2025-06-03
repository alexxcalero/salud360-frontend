import InputIconLabelEdit from "@/components/InputIconLabelEdit"
import SelectIconLabel from "@/components/SelectIconLabel"
import { Mail, Calendar, Shield } from "lucide-react"
import { FaBuilding } from "react-icons/fa";
import { FaHandHoldingUsd } from "react-icons/fa";
import Button from "@/components/Button";
import axios from "axios";
import { useEffect, useState } from "react";

interface Props {
  data: {
    fechaInicio: string;
    fechaFin: string;
    servicio: string;
    local: string;
    descripcion: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}
export default function ReporteUsuarioForm({ data, onChange }: Props) {
  const [servicios, setServicios] = useState<{ value: string; label: string }[]>([]);
  const [locales, setLocales] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/servicios", {
          auth: { username: "admin", password: "admin123" }
        });
        const opciones = res.data.map((s: any) => ({ value: s.idServicio, label: s.nombre }));
        setServicios([{ value: "", label: "Elige una opcion" }, ...opciones]);
      } catch (err) {
        console.error("Error cargando servicios", err);
      }
    };

    const fetchLocales = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/locales", {
          auth: { username: "admin", password: "admin123" }
        });
        const opciones = res.data.map((l: any) => ({ value: l.idLocal, label: l.nombre }));
        setLocales([{ value: "", label: "Elige una opcion" }, ...opciones]);
      } catch (err) {
        console.error("Error cargando locales", err);
      }
    };

    fetchServicios();
    fetchLocales();
  }, []);


  const handleGenerarReporte = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/reportes/usuarios", {
        descripcion: data.descripcion,
        fechaInicio: data.fechaInicio,
        fechaFin: data.fechaFin,
        servicio: data.servicio,
        local: data.local
      }, {
        auth: {
          username: "admin",
          password: "admin123"
        },
        responseType: "blob" // importante si tu backend devuelve un PDF
      });

      // Descarga del PDF
      const url = window.URL.createObjectURL(new Blob([response.data]));
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
        icon={<FaHandHoldingUsd className="w-5 h-5" />} htmlFor="Servicio"
        label="Servicio"
        value={data.servicio} onChange={onChange}
        options={servicios}
      />
      <SelectIconLabel
        icon={<FaBuilding className="w-5 h-5" />} htmlFor="Local"
        label="Local"
        value={data.local} onChange={onChange}
        options={locales}
      />
      <div className="col-span-2 flex justify-end mt-4">
        <Button type="button" onClick={handleGenerarReporte}>
          Generar reporte
        </Button>
      </div>
    </div>
  )
}
