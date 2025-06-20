import Spinner from "@/components/Spinner";
import CardMembresia from "@/components/usuario/config/CardMembresia";
import { AuthContext } from "@/hooks/AuthContext";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { baseAPI } from "@/services/baseAPI";
import { AlertTriangle } from "lucide-react";
import { useContext, useEffect, useState } from "react";

interface MembresiaFake {
  comunidad: string;
  precio: number;
  fechaRenovacion: string;
  state: "idle" | "suspended" | "canceled";
  selected: boolean;
}

const Membresias = () => {

  const [afiliaciones, setAfiliaciones] = useState([]);
  const [waiting, setWaiting] = useState(true);

  const { usuario, logout, loading } = useContext(AuthContext);

  if (loading || !usuario) return null;

  const id = usuario.idCliente;

  const fetchComunidad = async () => {
    try {
      console.log("El id del usuario es:", id)
      const res = await baseAPI.get(`/afiliaciones/${id}`, {
        auth: {
          username: "admin",
          password: "admin123",
        },
      });
      console.log("Afiliaciones del Usuario:", res.data)
      setAfiliaciones(res.data);
    } catch (error) {
      console.error("Error cargando Afiliaciones", error);
    } finally {
      setWaiting(false);
    }
  };

  useEffect(() => {
    fetchComunidad();
  }, []);

  //const tieneAfiliaciones = !waiting && afiliaciones.length > 0;
  const tieneAfiliaciones = !waiting && afiliaciones !== undefined;


  /*
  const _dataExample: MembresiaFake[] = [
    {
      comunidad: "Comunidad 1",
      precio: 100,
      fechaRenovacion: "2023-10-01",
      state: "idle",
      selected: false,
    },
    {
     */

  const formatFechaMasUnMes = (isoString: string): string => {
    const fecha = new Date(isoString);
    if (isNaN(fecha.getTime())) return "Fecha inválida";

    // Sumar 1 mes
    const nuevaFecha = new Date(fecha);
    nuevaFecha.setMonth(nuevaFecha.getMonth() + 1);

    // Formatear solo la fecha (sin hora)
    return new Intl.DateTimeFormat("es-PE", {
      dateStyle: "short",
    }).format(nuevaFecha);
  };


  console.log("tieneAfiliaciones es:", tieneAfiliaciones)


  return (
    <div className="p-8">
      <title>Membresías</title>
      <h1 className="text-left mb-4">Membresías</h1>

      {!waiting &&
        <>
          {(tieneAfiliaciones) ? (
            <>
              <ul className="flex flex-col gap-4">
                <li key={1}>
                  <CardMembresia
                    comunidad="Comunidad FAKE"
                    precio={afiliaciones.membresia?.precio as number}
                    fechaRenovacion={formatFechaMasUnMes(afiliaciones.membresia?.fechaCreacion) as string}
                    state={afiliaciones.estado as "idle" | "suspended" | "canceled"}
                  />
                </li>
              </ul>

              <div className="mt-4 w-full flex justify-center">
                <Spinner />
              </div>
            </>
          ) : (
            <div className="text-center flex flex-col items-center gap-4 mt-32">
              <AlertTriangle className="text-red-500 w-32 h-32" />
              <h1>NO TIENES NINGUNA MEMBRESÍA.</h1>
              <h3>Haz click en <span className="text-[#2A86FF] italic">Comunidades</span> para ver las comunidades que tenemos para ti.</h3>
            </div>
          )}
        </>
      }







    </div>
  );
};

export default Membresias;

/*
{afiliaciones.map(
          (afiliacion: any, index) => (
            <li key={index}>
              <CardMembresia
                comunidad="Comunidad FAKE"
                precio={afiliacion.membresia.precio as number}
                fechaRenovacion={afiliacion.membresia.fechaCreacion as string}
                state={afiliacion.estado as "idle" | "suspended" | "canceled"}
              />
            </li>
          )
        )}
*/