import Calendario from "../calendario/Calendario";
import { reservaType } from "@/schemas/reserva";
import { DateTime } from "luxon";
import { ReservaCard } from "../calendario/reservaCard";
import { useContext } from "react";
import { AuthContext } from "@/hooks/AuthContext";
import { getAllClienteReservasAPI } from "@/services/cliente.service";

const CalendarioUsuarios = () => {
  const { usuario } = useContext(AuthContext);
  return (
    <>
      <Calendario<reservaType>
        getDateFromData={(d) => d.clase?.fecha ?? d.citaMedica?.fecha}
        getHourRangeFromData={(d) =>
          d.clase
            ? ([d.clase.horaInicio, d.clase.horaFin] as [DateTime, DateTime])
            : d.citaMedica
            ? ([d.citaMedica.horaInicio, d.citaMedica.horaFin] as [
                DateTime,
                DateTime
              ])
            : undefined
        }
        cards={{
          day: (d) => <ReservaCard reserva={d} />,
          week: (d) => <ReservaCard reserva={d} />,
          month: (d) => <ReservaCard reserva={d} />,
        }}
        fetchData={async () => {
          const reservas = await getAllClienteReservasAPI(
            usuario.idCliente as number
          );
          return reservas ?? [];
        }}
      />
    </>
  );
};

export default CalendarioUsuarios;
