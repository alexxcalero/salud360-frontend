/*import UnderConstruction from "@/pages/UnderConstruction";

function ConfiguracionGeneralPage(){
    return <UnderConstruction/>;
}

export default ConfiguracionGeneralPage;
*/

import { useNavigate } from "react-router";
import InfoCard from "@/components/Infocard";
import ButtonIcon from "@/components/ButtonIcon";
import BlueBullet from "@/components/BlueBullet";
import { Pencil } from "lucide-react";


function ConfiguracionGeneralPage() {
  //Damos funcionalidad al botón "Editar"
    const navigate = useNavigate();
    
  return (
    <div className="w-full px-6 py-4">
      <h1 className="use-title-large mb-4">Configuración del sistema</h1>

      {/* Botón editar alineado a la izquierda */}
      <div className="flex justify-start mb-6">
        <ButtonIcon icon={<Pencil className="w-5 h-5 text-white" />} size="lg" variant="primary" onClick={() => navigate("/admin/configuracion/editar")}>
          Editar
        </ButtonIcon>
      </div>

      {/* Lista de parámetros */}
      <div className="space-y-5">
        <InfoCard
          title="Intervalos de notificación de sistema a usuarios"
          text={<BlueBullet>1 mes</BlueBullet>}
        />
        <InfoCard
          title="Plazo de tolerancia para cancelar"
          text={<BlueBullet>2 días</BlueBullet>}
        />
        <InfoCard
          title="Plazo de tolerancia para suspender"
          text={<BlueBullet>10 días</BlueBullet>}
        />
        <InfoCard
          title="Máximas cantidad de reservas posibles por usuario"
          text={<BlueBullet>10</BlueBullet>}
        />
        <InfoCard
          title="Máxima capacidad de alumnos"
          text={<BlueBullet>30</BlueBullet>}
        />
        <InfoCard
          title="Tiempo de tolerancia de ingreso"
          text={<BlueBullet>30 min</BlueBullet>}
        />
      </div>
    </div>
  );
}

export default ConfiguracionGeneralPage;