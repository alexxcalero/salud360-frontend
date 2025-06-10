import { useState } from "react";
import ReporteUsuarioForm from "@/components/admin/reportes/ReporteUsuarioForm";
import ReporteServicioForm from "@/components/admin/reportes/ReporteServicioForm";
import ReporteLocalForm from "@/components/admin/reportes/ReporteLocalForm";
import { FileText } from "lucide-react";
import InputIconLabelEdit from "@/components/InputIconLabelEdit";
import InputLabel from "@/components/InputLabel";
import TextAreaInput from "@/components/input/TextAreaInput";

export default function ReportePanel() {
  const [tabActivo, setTabActivo] = useState("usuarios");
  const [descripcion, setDescripcion] = useState("");
  const readOnly = false; 

  const [formData, setFormData] = useState({
    fechaInicio: "",
    fechaFin: "",
    servicio: "",
    local: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="">
      <div className="flex flex-col gap-16 mt-4 mb-12">
        <TextAreaInput required={true} name="text" label="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} disabled={readOnly} reserveSpace={true} placeholder="Ingrese la descripción" />
        </div>
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

      {/* Contenido de tab */}
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
