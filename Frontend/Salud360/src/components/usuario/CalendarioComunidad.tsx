import Calendario from "../calendario/Calendario";
import { comunidadHorarioType } from "@/schemas/mutation/claseCitaMedica";
import {
  getAllCitasMedicasByComunityAPI,
  getAllClasesByComunityAPI,
} from "@/services/comunidadServices.service";
import { ComunidadCitaMedicaCard } from "../calendario/ComunidadCitaMedicaCard";
import { ComunidadClaseCard } from "../calendario/ComunidadClaseCard";

const CalendarioComunidad = ({
  id,
  filtrosAdicionales,
}: {
  id: number;
  filtrosAdicionales: [(d: comunidadHorarioType) => boolean];
}) => {
  return (
    <>
      <Calendario<comunidadHorarioType>
        getDateFromData={(d) => d.fecha ?? undefined}
        getHourRangeFromData={(d) =>
          d.horaInicio && d.horaFin ? [d.horaInicio, d.horaFin] : undefined
        }
        cards={{
          day: (d) => (
            <>
              {d.tipo === "citaMedica" && (
                <ComunidadCitaMedicaCard citaMedica={d} />
              )}
              {d.tipo === "clase" && <ComunidadClaseCard clase={d} />}
            </>
          ),
          week: (d) => (
            <>
              {d.tipo === "citaMedica" && (
                <ComunidadCitaMedicaCard citaMedica={d} />
              )}
              {d.tipo === "clase" && <ComunidadClaseCard clase={d} />}
            </>
          ),
          month: (d) => (
            <>
              {d.tipo === "citaMedica" && <>{d.medico?.nombres}</>}
              {d.tipo === "clase" && <ComunidadClaseCard clase={d} />}
            </>
          ),
        }}
        filterFuncs={[...filtrosAdicionales]}
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
