import Calendario from "../calendario/Calendario";
import { comunidadHorarioType } from "@/schemas/mutation/claseCitaMedica";
import {
  getAllCitasMedicasByComunityAPI,
  getAllClasesByComunityAPI,
  getAllUserReservasByComunity,
} from "@/services/comunidadServices.service";
import { ComunidadCitaMedicaCard } from "../calendario/ComunidadCitaMedicaCard";
import { ComunidadClaseCard } from "../calendario/ComunidadClaseCard";
import { useContext } from "react";
import { AuthContext } from "@/hooks/AuthContext";
import { ReservaCard } from "../calendario/reservaCard";

const CalendarioComunidad = ({
  id,
  filtrosAdicionales,
}: {
  id: number;
  filtrosAdicionales: [(d: comunidadHorarioType) => boolean];
}) => {
  const { usuario } = useContext(AuthContext);
  return (
    <>
      <Calendario<comunidadHorarioType>
        getRangeDateFromData={(d) =>
          (d.tipo === "citaMedica" || d.tipo === "clase") &&
          d.fecha &&
          d.horaInicio &&
          d.horaFin
            ? [
                d.fecha.set({
                  hour: d.horaInicio.hour,
                  minute: d.horaInicio.minute,
                }),
                d.fecha.set({
                  hour: d.horaFin.hour,
                  minute: d.horaFin.minute,
                }),
              ]
            : d.tipo === "reserva" &&
              d.citaMedica &&
              d.citaMedica.fecha &&
              d.citaMedica.horaInicio &&
              d.citaMedica.horaFin
            ? [
                d.citaMedica.fecha.set({
                  hour: d.citaMedica.horaInicio.hour,
                  minute: d.citaMedica.horaInicio.minute,
                }),
                d.citaMedica.fecha.set({
                  hour: d.citaMedica.horaFin.hour,
                  minute: d.citaMedica.horaFin.minute,
                }),
              ]
            : d.tipo === "reserva" &&
              d.clase &&
              d.clase.fecha &&
              d.clase.horaInicio &&
              d.clase.horaFin
            ? [
                d.clase.fecha.set({
                  hour: d.clase.horaInicio.hour,
                  minute: d.clase.horaInicio.minute,
                }),
                d.clase.fecha.set({
                  hour: d.clase.horaFin.hour,
                  minute: d.clase.horaFin.minute,
                }),
              ]
            : undefined
        }
        cards={{
          day: (d) => (
            <>
              {d.tipo === "citaMedica" && (
                <ComunidadCitaMedicaCard citaMedica={d} />
              )}
              {d.tipo === "clase" && <ComunidadClaseCard clase={d} />}
              {d.tipo === "reserva" && <ReservaCard reserva={d} />}
            </>
          ),
          week: (d) => (
            <>
              {d.tipo === "citaMedica" && (
                <ComunidadCitaMedicaCard citaMedica={d} />
              )}
              {d.tipo === "clase" && <ComunidadClaseCard clase={d} />}
              {d.tipo === "reserva" && <ReservaCard reserva={d} />}
            </>
          ),
          month: (d) => (
            <>
              {d.tipo === "citaMedica" && (
                <ComunidadCitaMedicaCard citaMedica={d} collapsed={true} />
              )}
              {d.tipo === "clase" && (
                <ComunidadClaseCard clase={d} collapsed={true} />
              )}
              {d.tipo === "reserva" && (
                <ReservaCard reserva={d} collapsed={true} />
              )}
            </>
          ),
        }}
        filterFuncs={[...filtrosAdicionales]}
        fetchData={async () => {
          const citasMedicas = await getAllCitasMedicasByComunityAPI(
            Number(id) ?? 0
          );
          const clases = await getAllClasesByComunityAPI(Number(id) ?? 0);
          const reservas = await getAllUserReservasByComunity(
            usuario.idCliente,
            Number(id)
          );

          if (!citasMedicas || !clases || !reservas)
            throw new Error("Error al obtener los datos");

          const data = [...citasMedicas, ...clases, ...reservas];

          return data;
        }}
      />
    </>
  );
};

export default CalendarioComunidad;
