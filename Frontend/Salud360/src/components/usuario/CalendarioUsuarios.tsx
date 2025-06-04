import { InternalModalsProvider } from "@/hooks/useInternalModals";
import Calendario from "../calendario/Calendario";
import { reservaType } from "@/schemas/reserva";
import { DateTime } from "luxon";
import { useContext, useEffect, useState } from "react";
import { useFetchHandler } from "@/hooks/useFetchHandler";
import { getAllUserReservas } from "@/services/reservas.service";
import { AuthContext } from "@/hooks/AuthContext";

const CalendarioUsuarios = () => {
  return (
    <>
      <InternalModalsProvider>
        <CalendarioUsuariosWrapped />
      </InternalModalsProvider>
    </>
  );
};

const CalendarioUsuariosWrapped = () => {
  const [reservas, setReservas] = useState<reservaType[]>([]);
  const { fetch } = useFetchHandler();
  const useAuthContext = useContext(AuthContext);

  useEffect(() => {
    fetch(async () => {
      if (useAuthContext === null) return;
      const data = await getAllUserReservas(useAuthContext.usuario.idCliente);
      setReservas(data);
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
        data={reservas}
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

export default CalendarioUsuarios;
