import Button from "@/components/Button";
import { Ban, CircleMinus, Info, Plus } from "lucide-react";

const CardMembresia = ({
  comunidad,
  precio,
  fechaRenovacion,
  state,
  selected = false,
  onDetalles,
  onCancelar,
  onSuspender,
  onReactivar
}: {
  comunidad: string;
  precio: number;
  fechaRenovacion: string;
  state: "Activado" | "Suspendido" | "Cancelado";
  selected?: boolean;
  onDetalles: () => void;
  onCancelar: () => void;
  onSuspender: () => void;
  onReactivar: () => void;
}) => {





  //console.log("Dentro del card el precio es:", precio)

  return (
    <div
      data-state={state}
      className={`group rounded-md shadow-md p-8 bg-white data-[state='canceled']:bg-neutral-200 flex items-center justify-between ${selected && "border-1 border-blue-500"
        }
      `}
    >
      <div className="flex flex-col">

        <div className="flex flex-row items-center gap-4">
          <h3 className="text-neutral-800 mr-2 group-data-[state='canceled']:text-neutral-500">
            {comunidad}
          </h3>
          <p className="bg-blue-500 group-data-[state='canceled']:bg-neutral-600 text-lg font-bold text-white px-2 py-2 rounded-sm use-label-large mr-2">
            s/.{" "}
            {precio.toLocaleString("es-PE", {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })}
          </p>
          <div className="inline-block">
            {state === "Activado" && (
              <p className="bg-green-500 text-lg font-bold text-white px-2 py-2 rounded-sm use-label-large">
                Activa
              </p>
            )}
            {state === "Suspendido" && (
              <p className="bg-yellow-500 text-lg font-bold text-white px-2 py-2 rounded-sm use-label-large">
                Suspendida
              </p>
            )}
            {state === "Cancelado" && (
              <p className="bg-red-500 text-lg font-bold text-white px-2 py-2 rounded-sm use-label-large">
                Cancelada
              </p>
            )}
          </div>
        </div>

          {state !== "Cancelado" && (
              <p className="text-left text-md text-neutral-600 group-data-[state='canceled']:text-neutral-400 block mt-2">
                Fecha de renovación:{" "}
                <time
                  dateTime={fechaRenovacion}
                  className="text-neutral-800 group-data-[state='canceled']:text-neutral-500"
                >
                  {fechaRenovacion}
                </time>
              </p>
            )}

        


      </div>

      <div className="flex flex-row gap-4">
        {state !== "Cancelado" && (
            <Button size="lg" className="mr-2 rounded-sm" onClick={onDetalles}>
              <Info />
              Detalles
            </Button>
        )}

        {state === "Activado" && (
          <>
            
            <Button variant="outlineDanger" size="lg" className="mr-2 rounded-sm" onClick={onSuspender}>
              <CircleMinus />
              Suspender
            </Button>
          </>
        )}
        {state === "Suspendido" && (
          <>
            <Button size="lg" className="mr-2 rounded-sm bg-green-600 hover:bg-green-700 text-white" onClick={onReactivar}>
              <Plus />
              Reactivar
            </Button>
          </>
        )}

        {state !== "Cancelado" && (
            <Button variant="danger" size="lg" className="mr-2 rounded-sm" onClick={onCancelar}>
              <Ban />
              Cancelar
            </Button>
        )}
      </div>
    </div>
  );
};

export default CardMembresia;
