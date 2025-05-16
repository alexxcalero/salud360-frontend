
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import InfoCard from "@/components/Infocard";
import ButtonIcon from "@/components/ButtonIcon";
import BlueBullet from "@/components/BlueBullet";
import { Pencil } from "lucide-react";


function ConfiguracionGeneralPage() {
  //Damos funcionalidad al botón "Editar"
  const navigate = useNavigate();
  const [reglas, setReglas] = useState<any>(null);

  /* PARA PRESENTACIÓN DEL TIEMPO DE CANCELACIÓN */
  const minutosAHoraLegible = (minutos: number) => {
    const horas = Math.floor(minutos / 60);
    const mins = minutos % 60;

    if (horas === 0) return `${mins} ${mins === 1 ? "minuto" : "minutos"}`;
    if (mins === 0) return `${horas} ${horas === 1 ? "hora" : "horas"}`;
    return `${horas} ${horas === 1 ? "hora" : "horas"} y ${mins} ${mins === 1 ? "minuto" : "minutos"}`;
  };

  const estandar = (cantidad: number, singular: string, plural: string) => {
    return `${cantidad} ${cantidad === 1 ? singular : plural}`;
  };


  useEffect(() => {
    axios.get("http://localhost:8080/api/reglas", {
      auth: {
        username: "admin",
        password: "admin123"
      }
    })
    .then((res) => {
      setReglas(res.data[0]); // Suponiendo que solo hay una fila de reglas
    })
    .catch((err) => console.error("Error al cargar reglas:", err));
  }, []);

  return (
    <div className="w-full px-6 py-4">
      <h1 className="use-title-large mb-4">Configuración del sistema</h1>

      <div className="flex justify-start mb-6">
        <ButtonIcon icon={<Pencil className="w-5 h-5 text-white" />} size="lg" variant="primary" onClick={() => navigate("/admin/configuracion/editar")}>
          Editar
        </ButtonIcon>
      </div>

      <div className="space-y-5">
        <InfoCard
          title="Plazo de tolerancia para cancelar"
          text={<BlueBullet>{reglas ? minutosAHoraLegible(reglas.maxTiempoCancelacion) : "Cargando..."}</BlueBullet>}
        />
        <InfoCard
          title="Plazo de tolerancia para suspender"
          text={<BlueBullet>{reglas ? estandar(reglas.maxDiasSuspension, "día", "días") : "Cargando..."}</BlueBullet>}
        />
        <InfoCard
          title="Máximas cantidad de reservas posibles por usuario"
          text={<BlueBullet>{reglas ? estandar(reglas.maxReservas, "reserva", "reservas") : "Cargando..."}</BlueBullet>}
        />
        <InfoCard
          title="Máxima capacidad de alumnos"
          text={<BlueBullet>{reglas ? estandar(reglas.maxCapacidad, "alumno", "alumnos") : "Cargando..."}</BlueBullet>}
        />
      </div>
    </div>
  );
}

export default ConfiguracionGeneralPage;