import Calendario from "../calendario/Calendario";
import { comunidadHorarioType } from "@/schemas/mutation/claseCitaMedica";
import {
  getAllCitasMedicasByComunityAPI,
  getAllClasesByComunityAPI,
} from "@/services/comunidadServices.service";

const CalendarioComunidad = ({ id }: { id: number }) => {
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

          if (!citasMedicas || !clases)
            throw new Error("Error al obtener los datos");

          const data = [...citasMedicas, ...clases];

          return data;
        }}
      />
    </>
  );
};

export default CalendarioComunidad;
