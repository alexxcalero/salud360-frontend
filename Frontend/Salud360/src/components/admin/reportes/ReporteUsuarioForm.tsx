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
    descripcion: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}
export default function ReporteUsuarioForm({ data, onChange }: Props) {
  const handleGenerarReporte = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/reportes/usuarios", {   
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
    </div>
  )
}
