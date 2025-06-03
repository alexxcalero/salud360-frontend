import ReportePanel from "@/components/admin/reportes/ReportePanel"
import { Navigate } from "react-router";
import { AuthContext } from "@/hooks/AuthContext";
import { useContext, useEffect } from "react"

export default function ReportesPage() {
  return (
    <div className="px-10 py-6 w-full">
      <h1 className="text-3xl font-bold mb-2">Panel de Reportes</h1>
      <p className="text-lg text-gray-600 mb-6">
        Seleccione el tema del reporte a generar
      </p>
      <ReportePanel/>
    </div>
  )
}
