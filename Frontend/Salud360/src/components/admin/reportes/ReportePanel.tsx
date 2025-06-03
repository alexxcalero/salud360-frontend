import { useState } from "react";
import ReporteUsuarioForm from "@/components/admin/reportes/ReporteUsuarioForm";
import ReporteServicioForm from "@/components/admin/reportes/ReporteServicioForm";
import ReporteLocalForm from "@/components/admin/reportes/ReporteLocalForm";

const [formData, setFormData] = useState({
  descripcion: "",
  fechaInicio: "",
  fechaFin: "",
  correo: "",
  servicio: "",
  local: ""
});

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
};

export default function ReportePanel() {
  const [tabActivo, setTabActivo] = useState("usuarios");

  return (
    <div className="w-full px-10 py-6">
      <h1 className="text-3xl font-bold mb-2">Panel de Reportes</h1>
      <p className="text-md text-gray-600 mb-6">
        Seleccione el tema del reporte a generar
      </p>

      {/* Tabs */}
      <div className="border-b mb-6">
        <nav className="flex space-x-4">
          <button
            className={`pb-2 font-medium border-b-2 ${tabActivo === "usuarios" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500"}`}
            onClick={() => setTabActivo("usuarios")}
          >
            Reporte de usuarios
          </button>
          <button
            className={`pb-2 font-medium border-b-2 ${tabActivo === "servicios" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500"}`}
            onClick={() => setTabActivo("servicios")}
          >
            Reporte de servicios
          </button>
          <button
            className={`pb-2 font-medium border-b-2 ${tabActivo === "locales" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500"}`}
            onClick={() => setTabActivo("locales")}
          >
            Reporte de locales
          </button>
        </nav>
      </div>

      /* Contenido de tab */
        {tabActivo === "usuarios" && (
            <ReporteUsuarioForm data={formData} onChange={handleChange} />
        )}
        {tabActivo === "servicios" && (
            <ReporteServicioForm data={formData} onChange={handleChange} />
        )}
        {tabActivo === "locales" && (
            <ReporteLocalForm data={formData} onChange={handleChange} />
        )}
    </div>
  );
}
