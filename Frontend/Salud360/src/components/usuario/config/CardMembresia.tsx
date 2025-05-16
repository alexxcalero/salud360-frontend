import Button from "@/components/Button";
import { Ban, CircleMinus, Info, Plus } from "lucide-react";

const CardMembresia = ({
  comunidad,
  precio,
  fechaRenovacion,
  state,
  selected = false,
}: {
  comunidad: string;
  precio: number;
  fechaRenovacion: string;
  state: "idle" | "suspended" | "canceled";
  selected?: boolean;
}) => {
  return (
    <div
      data-state={state}
      className={`group rounded-md shadow-md p-4 bg-white data-[state='canceled']:bg-neutral-200 flex items-center justify-between ${
        selected && "border-1 border-blue-500"
      }
      `}
    >
      <div>
        <span className="text-neutral-800 mr-2 group-data-[state='canceled']:text-neutral-500">
          {comunidad}
        </span>
        <span className="bg-blue-500 group-data-[state='canceled']:bg-neutral-600 text-white px-2 py-[2px] rounded-full use-label-large mr-2">
          s/.{" "}
          {precio.toLocaleString("es-PE", {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })}
        </span>
        <div className="inline-block">
          {state === "idle" && (
            <span className="bg-green-500 text-white px-2 py-[2px] rounded-full use-label-large">
              Activa
            </span>
          )}
          {state === "suspended" && (
            <span className="bg-yellow-500 text-white px-2 py-[2px] rounded-full use-label-large">
              Suspendida
            </span>
          )}
          {state === "canceled" && (
            <span className="bg-red-500 text-white px-2 py-[2px] rounded-full use-label-large">
              Cancelada
            </span>
          )}
        </div>
        <span className="text-left text-sm text-neutral-600 group-data-[state='canceled']:text-neutral-400 block mt-2">
          Fecha de renovación:{" "}
          <time
            dateTime={fechaRenovacion}
            className="text-neutral-800 group-data-[state='canceled']:text-neutral-500"
          >
            {fechaRenovacion}
          </time>
        </span>
      </div>

      <div>
        {state === "idle" && (
          <>
            <Button size="sm" className="mr-2 rounded-full">
              <Info />
              Detalles
            </Button>
            <Button variant="danger" size="sm" className="mr-2 rounded-full">
              <CircleMinus />
              Suspender
            </Button>
            <Button variant="danger" size="sm" className="mr-2 rounded-full">
              <Ban />
              Cancelar
            </Button>
          </>
        )}
        {state === "suspended" && (
          <>
            <Button size="sm" className="mr-2 rounded-full">
              <Info />
              Detalles
            </Button>
            <Button size="sm" className="mr-2 rounded-full">
              <Plus />
              Reactivar
            </Button>
            <Button variant="danger" size="sm" className="mr-2 rounded-full">
              <Ban />
              Cancelar
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default CardMembresia;
