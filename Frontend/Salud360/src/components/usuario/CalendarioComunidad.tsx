import { InternalModalsProvider } from "@/hooks/useInternalModals";
import Calendario from "../calendario/Calendario";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { reservaType } from "@/schemas/reserva";
import { useFetchHandler } from "@/hooks/useFetchHandler";
import { getAllCommunityReservasAPI } from "@/services/reservas.service";

const CalendarioComunidad = ({ idComunidad }: { idComunidad: number }) => {
  return (
    <>
      <InternalModalsProvider>
        <CalendarioComunidadWrapped idComunidad={idComunidad} />
      </InternalModalsProvider>
    </>
  );
};

const CalendarioComunidadWrapped = ({
  idComunidad,
}: {
  idComunidad: number;
}) => {
  const [data, setData] = useState<reservaType[]>([]);
  const { fetch } = useFetchHandler();

  useEffect(() => {
    fetch(async () => {
      const data = await getAllCommunityReservasAPI(idComunidad);
      setData(data);
    });
  }, []);

  return (
    <>
      <Calendario<reservaType>
        rangeDaysFilterFunc={(d0: DateTime, df: DateTime, r) =>
          Boolean(
            (r.citaMedica !== undefined &&
              r.citaMedica !== null &&
              r.citaMedica.fecha !== undefined &&
              r.citaMedica.fecha !== null &&
              d0 <= r.citaMedica.fecha &&
              r.citaMedica.fecha <= df) ||
              (r.clase !== undefined &&
                r.clase !== null &&
                r.clase.fecha !== undefined &&
                r.clase.fecha !== null &&
                d0 <= r.clase.fecha &&
                r.clase.fecha <= df)
          )
        }
        data={data}
        metadata={{
          day: {
            card: (d) => (
              <div>
                {d.comunidad?.nombre}
                {d.citaMedica && (
                  <div>
                    {d.citaMedica.medico?.nombres}{" "}
                    {d.citaMedica.medico?.apellidos} -{" "}
                    {d.citaMedica.medico?.especialidad}
                  </div>
                )}
                {d.clase && (
                  <div>
                    {d.clase.nombre} - {d.clase.capacidad}
                  </div>
                )}
              </div>
            ),
            equalFunc: (data, fecha: DateTime) =>
              Boolean(
                data.clase &&
                  data.clase.fecha?.hasSame(fecha, "day") &&
                  data.clase.fecha?.hasSame(fecha, "month") &&
                  data.clase.fecha?.hasSame(fecha, "year") &&
                  data.clase.horaInicio?.hasSame(fecha, "hour")
              ) ||
              Boolean(
                data.citaMedica &&
                  data.citaMedica.fecha?.hasSame(fecha, "day") &&
                  data.citaMedica.fecha?.hasSame(fecha, "month") &&
                  data.citaMedica.fecha?.hasSame(fecha, "year") &&
                  data.citaMedica.horaInicio?.hasSame(fecha, "hour")
              ),
          },
          week: {
            card: (d) => (
              <div>
                {d.comunidad?.nombre}
                {d.citaMedica && (
                  <div>
                    {d.citaMedica.medico?.nombres}{" "}
                    {d.citaMedica.medico?.apellidos} -{" "}
                    {d.citaMedica.medico?.especialidad}
                  </div>
                )}
                {d.clase && (
                  <div>
                    {d.clase.nombre} - {d.clase.capacidad}
                  </div>
                )}
              </div>
            ),
            equalFunc: (data, fecha: DateTime) =>
              Boolean(
                data.clase &&
                  data.clase.fecha?.hasSame(fecha, "day") &&
                  data.clase.fecha?.hasSame(fecha, "month") &&
                  data.clase.fecha?.hasSame(fecha, "year") &&
                  (data.clase.horaInicio?.hour ?? Infinity) >= fecha.hour &&
                  (data.clase.horaInicio?.hour ?? Infinity) < fecha.hour + 1
              ) ||
              Boolean(
                data.citaMedica &&
                  data.citaMedica.fecha?.hasSame(fecha, "day") &&
                  data.citaMedica.fecha?.hasSame(fecha, "month") &&
                  data.citaMedica.fecha?.hasSame(fecha, "year") &&
                  (data.citaMedica.horaInicio?.hour ?? Infinity) >=
                    fecha.hour &&
                  (data.citaMedica.horaInicio?.hour ?? Infinity) <
                    fecha.hour + 1
              ),
          },
          month: {
            card: (d) => (
              <div>
                {d.comunidad?.nombre}
                {d.citaMedica && (
                  <div>
                    {d.citaMedica.medico?.nombres}{" "}
                    {d.citaMedica.medico?.apellidos} -{" "}
                    {d.citaMedica.medico?.especialidad}
                  </div>
                )}
                {d.clase && (
                  <div>
                    {d.clase.nombre} - {d.clase.capacidad}
                  </div>
                )}
              </div>
            ),
            equalFunc: (data, fecha: DateTime) =>
              Boolean(
                data.clase &&
                  data.clase.fecha?.hasSame(fecha, "day") &&
                  data.clase.fecha?.hasSame(fecha, "month") &&
                  data.clase.fecha?.hasSame(fecha, "year")
              ) ||
              Boolean(
                data.citaMedica &&
                  data.citaMedica.fecha?.hasSame(fecha, "day") &&
                  data.citaMedica.fecha?.hasSame(fecha, "month") &&
                  data.citaMedica.fecha?.hasSame(fecha, "year")
              ),
          },
        }}
      />
    </>
  );
};

export default CalendarioComunidad;
