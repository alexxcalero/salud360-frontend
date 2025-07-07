import ReportePanel from "@/components/admin/reportes/ReportePanel"
//import { Navigate } from "react-router";
//import { AuthContext } from "@/hooks/AuthContext";
//import { useContext, useEffect } from "react"

export default function ReportesPage() {
  return (
    <div className="w-full px-8 py-8 text-left">
      <title>Reportes</title>
      <h1 className="text-4xl font-bold mb-2">Panel de Reportes</h1>  
      <ReportePanel />
    </div>
  )
}
