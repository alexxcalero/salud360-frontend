import Calendario from "../calendario/Calendario";
import { comunidadHorarioType } from "@/schemas/mutation/claseCitaMedica";
import {
  getAllCitasMedicasByComunityAPI,
  getAllClasesByComunityAPI,
} from "@/services/comunidadServices.service";
import { ComunidadCitaMedicaCard } from "../calendario/ComunidadCitaMedicaCard";
import { ComunidadClaseCard } from "../calendario/ComunidadClaseCard";
import { extenedCitaMedicaType } from "@/schemas/citaMedica";
import { claseDTOType } from "@/schemas/clase";

const CalendarioComunidad = ({ id }: { id: number }) => {
  return (
    <>
      <Calendario<comunidadHorarioType>
        getDateFromData={(d) => d.fecha ?? undefined}
        getHourRangeFromData={(d) =>
          d.horaInicio && d.horaFin ? [d.horaInicio, d.horaFin] : undefined
        }
        cards={{
          day: (d, g) => (
            <>
              {d.tipo === "citaMedica" && (
                <ComunidadCitaMedicaCard
                  citaMedica={d}
                  reservar={g as (_: extenedCitaMedicaType) => void}
                />
              )}
              {d.tipo === "clase" && (
                <ComunidadClaseCard
                  clase={d}
                  reservar={g as (_: claseDTOType) => void}
                />
              )}
            </>
          ),
          week: (d, g) => (
            <>
              {d.tipo === "citaMedica" && (
                <ComunidadCitaMedicaCard
                  citaMedica={d}
                  reservar={g as (_: extenedCitaMedicaType) => void}
                />
              )}
              {d.tipo === "clase" && (
                <ComunidadClaseCard
                  clase={d}
                  reservar={g as (_: claseDTOType) => void}
                />
              )}
            </>
          ),
          month: (d, g) => (
            <>
              {d.tipo === "citaMedica" && <>{d.medico?.nombres}</>}
              {d.tipo === "clase" && (
                <ComunidadClaseCard
                  clase={d}
                  reservar={g as (_: claseDTOType) => void}
                />
              )}
            </>
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
