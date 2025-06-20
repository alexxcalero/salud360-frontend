import { useState, useEffect } from "react";
import ReporteUsuarioForm from "@/components/admin/reportes/ReporteUsuarioForm";
import ReporteServicioForm from "@/components/admin/reportes/ReporteServicioForm";
import ReporteLocalForm from "@/components/admin/reportes/ReporteLocalForm";
//import { FileText } from "lucide-react";
//import InputIconLabelEdit from "@/components/InputIconLabelEdit";
//import InputLabel from "@/components/InputLabel";
import TextAreaInput from "@/components/input/TextAreaInput";

export default function ReportePanel() {
  const [tabActivo, setTabActivo] = useState("usuarios");

  const [formData, setFormData] = useState({
    fechaInicio: "",
    fechaFin: "",
    idservicio: 0,
    idlocal: 0,
    descripcion: ""
  });

  // Texto de descripción por defecto según pestaña activa
  const obtenerDescripcionPorDefecto = (tipo: string): string => {
    switch (tipo) {
      case "usuarios":
        return `Este reporte presenta una visión analítica de la distribución de usuarios según las comunidades en las que están registrados, con especial énfasis en el estado de sus membresías (activa, inactiva o pendiente). Su objetivo principal es ofrecer a los analistas y responsables del área una herramienta para identificar patrones de concentración de usuarios, evaluar el crecimiento por zonas específicas y detectar comunidades con alta o baja retención. La información contenida en este reporte permite orientar estrategias de fidelización, promoción o expansión, fortaleciendo la toma de decisiones basada en evidencia real.`;
      case "locales":
        return `Este reporte permite analizar de manera integral la cobertura y distribución de los servicios ofertados por cada local dentro de la organización. A través de visualizaciones y métricas clave, se evalúa cuántos y qué tipos de servicios ofrece cada local, identificando focos de especialización, cobertura desequilibrada o posibles oportunidades de expansión. Este análisis permite optimizar la asignación de recursos, mejorar la eficiencia operativa y detectar áreas donde la oferta de servicios podría ampliarse en función de la demanda existente.`;
      case "servicios":
        return `Este reporte se centra en la evaluación analítica de la distribución de locales asociados a cada tipo de servicio disponible. Aporta una perspectiva estratégica sobre qué servicios tienen mayor cobertura geográfica y cuáles se concentran en zonas específicas, permitiendo identificar desequilibrios, oportunidades de diversificación y brechas en la disponibilidad de servicios. Esta información resulta clave para la planificación de nuevas aperturas, reestructuración de la oferta y diseño de campañas enfocadas en mejorar la experiencia del usuario final.`;
      default:
        return "";
    }
  };

  // Actualiza la descripción automáticamente al cambiar la pestaña activa
  useEffect(() => {
    const nuevaDescripcion = obtenerDescripcionPorDefecto(tabActivo);
    setFormData((prev) => ({ ...prev, descripcion: nuevaDescripcion }));
  }, [tabActivo]);

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  return (
    <div>
      <div className="flex flex-col gap-16 mt-4 mb-12">
        <div className="flex flex-col gap-2 mt-4 mb-6">
          <label className="text-sm font-semibold text-gray-700">Descriptivo del reporte</label>
          <div className="bg-gray-100 text-gray-800 text-justify px-6 py-4 rounded-lg shadow-sm border border-gray-300 leading-relaxed whitespace-pre-line">
            {formData.descripcion}
          </div>
        </div>
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

