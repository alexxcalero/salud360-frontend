/*import UnderConstruction from "@/pages/UnderConstruction";

function ConfiguracionGeneralPage(){
    return <UnderConstruction/>;
}

export default ConfiguracionGeneralPage;
*/

import InfoCard from "@/components/Infocard";
import BlueBullet from "@/components/BlueBullet";
import Button from "@/components/Button";
import { useNavigate } from "react-router";

function EditarConfiguracionGeneralPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full px-6 py-4">
      <h1 className="use-title-large mb-4">Editar información de la empresa</h1>

      <div className="space-y-5">
        <InfoCard
          title="Intervalo de notificación de sistema a usuarios"
          text={
            <div className="space-y-2">
              <BlueBullet>
                <div className="flex gap-2">
                  <input type="number" defaultValue={1} className="p-2 border rounded w-20" />
                  <select className="p-2 border rounded">
                    <option>Días</option>
                    <option>Meses</option>
                  </select>
                </div>
              </BlueBullet>
            </div>
          }
        />

        <InfoCard
          title="Plazo de tolerancia para cancelar"
          text={
            <BlueBullet>
              <div className="flex gap-2">
                <input type="number" defaultValue={2} className="p-2 border rounded w-20" />
                <select className="p-2 border rounded">
                  <option>Días</option>
                </select>
              </div>
            </BlueBullet>
          }
        />

        <InfoCard
          title="Plazo de tolerancia para suspender"
          text={
            <BlueBullet>
              <div className="flex gap-2">
                <input type="number" defaultValue={10} className="p-2 border rounded w-20" />
                <select className="p-2 border rounded">
                  <option>Días</option>
                </select>
              </div>
            </BlueBullet>
          }
        />

        <InfoCard
          title="Máximas cantidad de reservas posibles por usuario"
          text={
            <BlueBullet>
              <input type="number" defaultValue={10} className="p-2 border rounded w-24" />
            </BlueBullet>
          }
        />

        <InfoCard
          title="Máxima capacidad de alumnos"
          text={
            <BlueBullet>
              <input type="number" defaultValue={30} className="p-2 border rounded w-24" />
            </BlueBullet>
          }
        />

        <InfoCard
          title="Tiempo de tolerancia de ingreso"
          text={
            <BlueBullet>
              <div className="flex gap-2">
                <input type="number" defaultValue={30} className="p-2 border rounded w-20" />
                <select className="p-2 border rounded">
                  <option>minuto(s)</option>
                </select>
              </div>
            </BlueBullet>
          }
        />
      </div>

      {/* Botones de acción */}
    <div className="flex justify-end gap-4 pt-6">
      <Button variant="outline" size="lg" onClick={() => navigate("/admin/configuracion")}>
        Cancelar
      </Button>
      <Button variant="primary" size="lg">
        Actualizar
      </Button>
    </div>
    </div>
  );
}

export default EditarConfiguracionGeneralPage;