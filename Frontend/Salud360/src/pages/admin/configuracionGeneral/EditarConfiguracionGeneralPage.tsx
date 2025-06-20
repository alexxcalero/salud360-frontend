
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import InfoCard from "@/components/Infocard";
import BlueBullet from "@/components/BlueBullet";
import Button from "@/components/Button";
import ModalError from "@/components/ModalAlert"; // Asegúrate que el path sea correcto
import { baseAPI } from "@/services/baseAPI";

function EditarConfiguracionGeneralPage() {
  const navigate = useNavigate();
  const [reglas, setReglas] = useState<any>(null);

  const [showModalError, setShowModalError] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  useEffect(() => {
    baseAPI.get("/reglas", {
      auth: {
        username: "admin",
        password: "admin123",
      },
    })
      .then((res) => setReglas(res.data[0])) // Asumiendo solo una fila
      .catch((err) => console.error("Error al cargar reglas:", err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setReglas((prev: any) => ({
      ...prev,
      [name]: parseInt(value),
    }));
  };

  /*PARA VALIDAR LOS CAMPOS MAYORES A CERO */
  const validarCampos = () => {
    if (
      reglas.maxTiempoCancelacion <= 0 ||
      reglas.maxDiasSuspension <= 0 ||
      reglas.maxReservas <= 0 ||
      reglas.maxCapacidad <= 0
    ) {
      setMensajeError("Todos los valores deben ser mayores a cero.");
      setShowModalError(true);
      return false;
    }
    return true;
  };

  /*PARA SETEAR BONITO EL TIEMPO DE CANCELACIÓN DE CLASES*/
  const minutosAHoraString = (minutos: number) => {
    const horas = String(Math.floor(minutos / 60)).padStart(2, "0");
    const mins = String(minutos % 60).padStart(2, "0");
    return `${horas}:${mins}`;
  };
  
  
  const handleChangeHora = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [horas, minutos] = e.target.value.split(":").map(Number);
    const totalMinutos = horas * 60 + minutos;
    setReglas((prev: any) => ({
      ...prev,
      maxTiempoCancelacion: totalMinutos
    }));
  };

  const handleActualizar = () => {
    if (!validarCampos()) return;

    baseAPI
      .put(`/reglas/${reglas.idRegla}`, reglas, {
        auth: {
          username: "admin",
          password: "admin123",
        },
      })
      .then(() => navigate("/admin/configuracion"))
      .catch((err) => console.error("Error al actualizar reglas:", err));
  };

  return (
    <div className="w-full px-8 py-8 text-left">
      <h1 className="text-4xl font-bold mb-4">Editar información de la empresa</h1>

      {reglas && (
        <div className="space-y-5">
          <InfoCard
            title="Plazo de tolerancia para cancelar"
            text={
              <BlueBullet>
                <input
                  type="time"
                  value={minutosAHoraString(reglas.maxTiempoCancelacion)}
                  onChange={handleChangeHora}
                  className="p-2 border rounded w-24"
                /> minutos
              </BlueBullet>
            }
          />
          <InfoCard
            title="Plazo de tolerancia para suspender"
            text={
              <BlueBullet>
                <input
                  type="number"
                  name="maxDiasSuspension"
                  value={reglas.maxDiasSuspension}
                  onChange={handleChange}
                  className="p-2 border rounded w-24"
                />{" "}
                días
              </BlueBullet>
            }
          />
          <InfoCard
            title="Máxima cantidad de reservas posibles por usuario"
            text={
              <BlueBullet>
                <input
                  type="number"
                  name="maxReservas"
                  value={reglas.maxReservas}
                  onChange={handleChange}
                  className="p-2 border rounded w-24"
                />{" "}
                reservas
              </BlueBullet>
            }
          />
          <InfoCard
            title="Máxima capacidad de alumnos"
            text={
              <BlueBullet>
                <input
                  type="number"
                  name="maxCapacidad"
                  value={reglas.maxCapacidad}
                  onChange={handleChange}
                  className="p-2 border rounded w-24"
                />{" "}
                alumnos
              </BlueBullet>
            }
          />
        </div>
      )}

      <div className="flex justify-end gap-4 pt-6">
        <Button variant="danger" size="lg" onClick={() => navigate("/admin/configuracion")}>
          Cancelar
        </Button>
        <Button variant="primary" size="lg" onClick={handleActualizar}>
          Actualizar
        </Button>
      </div>

      {/* Modal de error */}
      {showModalError && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" />
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <ModalError
              detalle={mensajeError}
              onConfirm={() => setShowModalError(false)}
              onCancel={() => setShowModalError(false)}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default EditarConfiguracionGeneralPage;