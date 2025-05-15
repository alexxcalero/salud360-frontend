import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

import InfoCard from "@/components/Infocard";
import ButtonIcon from "@/components/ButtonIcon";
import BlueBullet from "@/components/BlueBullet";
import { Pencil } from "lucide-react";

function ConfiguracionGeneralPage() {
  const navigate = useNavigate();
  const [config, setConfig] = useState<any>(null);

  useEffect(() => {
    axios.get("http://localhost:8080/api/configuracion", {
      auth: { username: "admin", password: "admin123" }
    })
    .then(res => {
      console.log("Respuesta de configuración:", res.data);
      setConfig(res.data);
    })
    .catch(err => {
      console.error("Error al cargar configuración", err);
    });
  }, []);
  
  if (!config) return <p className="p-6">Cargando configuración...</p>;

  return (
    <div className="w-full px-6 py-4">
      <h1 className="text-2xl font-bold mb-4">Configuración general</h1>

      {/* Botón de edición */}
      <div className="flex justify-start mb-6">
        <ButtonIcon
          icon={<Pencil className="w-5 h-5 text-white" />}
          size="lg"
          variant="primary"
          onClick={() => navigate("/admin/configuracion/editar")}
        >
          Editar
        </ButtonIcon>
      </div>

      {/* Lista de parámetros del sistema */}
      <div className="space-y-5">
        <InfoCard
          title="Intervalos de notificación de sistema a usuarios"
          text={<BlueBullet>{config.intervaloNotificacion} mes(es)</BlueBullet>}
        />
        <InfoCard
          title="Plazo de tolerancia para cancelar"
          text={<BlueBullet>{config.plazoCancelar} días</BlueBullet>}
        />
        <InfoCard
          title="Plazo de tolerancia para suspender"
          text={<BlueBullet>{config.plazoSuspender} días</BlueBullet>}
        />
        <InfoCard
          title="Máximas cantidad de reservas posibles por usuario"
          text={<BlueBullet>{config.maxReservas}</BlueBullet>}
        />
        <InfoCard
          title="Máxima capacidad de alumnos"
          text={<BlueBullet>{config.maxAlumnos}</BlueBullet>}
        />
        <InfoCard
          title="Tiempo de tolerancia de ingreso"
          text={<BlueBullet>{config.toleranciaIngreso} min</BlueBullet>}
        />
      </div>
    </div>
  );
}

export default ConfiguracionGeneralPage;