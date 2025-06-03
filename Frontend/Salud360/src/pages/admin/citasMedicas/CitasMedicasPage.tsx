import GeneradorTabla from "@/components/admin/table/Tabla";
import Button from "@/components/Button";
import { citaMedicaType } from "@/schemas/citaMedica";
import { CalendarPlus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

function CitasMedicasPage() {
  const [citasMedicasData, setCitasMedicasData] = useState<citaMedicaType[]>(
    []
  );
  const navigate = useNavigate();
  const Tabla = GeneradorTabla<citaMedicaType>({
    idKey: "idCitaMedica",
    columns: {
      idCitaMedica: { label: "id", type: "text" },
      estado: { label: "Estado", type: "text" },
      fecha: { label: "Fecha", type: "date" },
      horaInicio: { label: "Hora de inicio", type: "time" },
      horaFin: { label: "Hora de fin", type: "time" },
      activo: { label: "Activo", type: "boolean" },
    },
    actionButton: (
      <Button onClick={() => navigate("/admin/citasMedicas/crear")}>
        <CalendarPlus /> Agregar cita
      </Button>
    ),
  });
  return (
    <>
      <div className="p-4">
        <Tabla rows={citasMedicasData} />
      </div>
    </>
  );
}

export default CitasMedicasPage;
