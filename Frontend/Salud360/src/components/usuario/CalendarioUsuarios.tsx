import Calendario from "../calendario/Calendario";
import {
  comunidadHorarioSchema,
  comunidadHorarioType,
} from "@/schemas/mutation/claseCitaMedica";
import {
  getAllCitasMedicasByComunityAPI,
  getAllClasesByComunityAPI,
} from "@/services/comunidadServices.service";
import { z } from "zod";

const CalendarioUsuarios = ({ id }: { id: number }) => {
  return (
    <>
      <Calendario<comunidadHorarioType>
        getDateFromData={(d) => d.fecha ?? undefined}
        getHourRangeFromData={(d) =>
          d.horaInicio && d.horaFin ? [d.horaInicio, d.horaFin] : undefined
        }
        cards={{
          day: (d) => (
            <div>
              {d.tipo === "citaMedica" && <>{d.medico?.nombres}</>}
              {d.tipo === "clase" && <>{d.nombre}</>}
            </div>
          ),
          week: (d) => (
            <div>
              {d.tipo === "citaMedica" && <>{d.medico?.nombres}</>}
              {d.tipo === "clase" && <>{d.nombre}</>}
            </div>
          ),
          month: (d) => (
            <div>
              {d.tipo === "citaMedica" && <>{d.medico?.nombres}</>}
              {d.tipo === "clase" && <>{d.nombre}</>}
            </div>
          ),
        }}
        fetchData={async () => {
          const citasMedicas = await getAllCitasMedicasByComunityAPI(
            Number(id) ?? 0
          );
          const clases = await getAllClasesByComunityAPI(Number(id) ?? 0);

          if (!citasMedicas || !clases) throw new Error("Webadas");

          console.log(citasMedicas);
          const data = z
            .array(comunidadHorarioSchema)
            .parse([
              ...citasMedicas.map((c) => ({ ...c, tipo: "citaMedica" })),
              ...clases.map((c) => ({ ...c, tipo: "clase" })),
            ]);

          console.log(data);
          return data;
        }}
      />
    </>
  );
};

export default CalendarioUsuarios;
