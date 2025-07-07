
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import InfoCard from "@/components/Infocard";
import ButtonIcon from "@/components/ButtonIcon";
import BlueBullet from "@/components/BlueBullet";
import { Pencil } from "lucide-react";
import { baseAPI } from "@/services/baseAPI";


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
    baseAPI.get("/reglas", {
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
    <div className="w-full px-8 py-8 text-left">
      <title>Configuración General</title>
      <h1 className="text-4xl font-bold mb-2">Configuración General</h1>
      <h2 className="text-lg text-gray-700 mb-6">Valores configurables aplicados en los procesos del sistema.</h2>

      <div className="flex justify-start my-6">
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
          title="Máxima cantidad de reservas posibles por usuario"
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