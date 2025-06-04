import GeneradorTabla from "@/components/admin/table/Tabla";
import Button from "@/components/Button";
import { useLoading } from "@/hooks/LoadingContext";
import { useToasts } from "@/hooks/ToastContext";
import { extenedCitaMedicaType } from "@/schemas/citaMedica";
import { getAllCitasMedicasAPI } from "@/services/citasMedicasAdmin.service";
import { CalendarPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function CitasMedicasPage() {
  const [citasMedicasData, setCitasMedicasData] = useState<
    extenedCitaMedicaType[]
  >([]);
  const navigate = useNavigate();
  const Tabla = GeneradorTabla<extenedCitaMedicaType>({
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

  const { setLoading } = useLoading();
  const { createToast } = useToasts();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await getAllCitasMedicasAPI();
        setCitasMedicasData(data ?? []);
      } catch (error) {
        createToast("error", { title: "Error p" });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <div className="p-4">
        <Tabla rows={citasMedicasData} />
      </div>
    </>
  );
}

export default CitasMedicasPage;
