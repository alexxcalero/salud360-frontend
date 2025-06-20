import Spinner from "@/components/Spinner";
import CardHistorialPago from "@/components/usuario/config/CardHistorialPago";
import { AuthContext } from "@/hooks/AuthContext";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import axios from "axios";
import { AlertTriangle } from "lucide-react";
import { useContext, useEffect, useState } from "react";

interface HistorialPagoFake {
  identificadorTransaccion: string;
  nombreComunidad: string;
  precio: number;
  fechaPago: string;
}

const HistorialPagos = () => {

  const [pagos, setPagos] = useState([]);
  const [waiting, setWaiting] = useState(true);

  const {usuario, logout, loading} = useContext(AuthContext);

  if (loading || !usuario) return null;

  const id = usuario.idCliente;

  const fetchPagos = async () => {
    try {
      console.log("El id del usuario es:", id)
      const res = await axios.get(`http://localhost:8080/api/cliente/${id}/pagos-cliente`, {
        auth: {
          username: "admin",
          password: "admin123",
        },
      });
      console.log("Pagos del Usuario:", res.data)
      setPagos(res.data);
    } catch (error) {
      console.error("Error cargando Pagos", error);
    } finally {
      setWaiting(false);
    }
  };

  useEffect(() => {
    fetchPagos();
  }, []);

  const tienePagos = !waiting && pagos.length > 0;
  //const tienePagos = !waiting && pagos !== undefined;



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


  console.log("tienePagos es:", tienePagos)

  return (
    <div className="p-8">
      <title>Historial de pagos</title>
      <h1 className="text-left mb-4">Historial de pagos</h1>

      {!waiting &&
        <>
          {(tienePagos) ? (
            <>

              <div className="bg-gray-50 p-4 border rounded mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Resumen de pagos por método</h4>
                <div className="text-sm text-gray-800 space-y-1">
                  <div className="flex justify-between">
                    <span>VISA •••• 5678</span>
                    <span className="font-semibold">S/ 350.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Yape</span>
                    <span className="font-semibold">S/ 120.00</span>
                  </div>
                </div>
              </div>


              <ul className="flex flex-col gap-4">
                {pagos.map(
                  (pago: any, index) => (
                    <li key={index}>
                      <CardHistorialPago
                        identificadorTransaccion={pago.idPago as string}
                        nombreComunidad={"Messi"}
                        precio={pago.monto as number}
                        fechaPago={formatFechaMasUnMes(pago.fechaPago) as string}
                      />
                    </li>
                  )
                )}
              </ul>
              <div className="mt-4 w-full flex justify-center">
                <Spinner />
              </div>

            </>
          ) : (
            <div className="text-center flex flex-col items-center gap-4 mt-32">
              <AlertTriangle className="text-red-500 w-32 h-32" />
              <h1>NO HAZ REALIZADO NINGÚN PAGO.</h1>
              <h3>Tus pagos aparecerán aquí cada vez que compres una membresía.</h3>
            </div>
          )}

        </>
      }


    </div>
  );
};

export default HistorialPagos;

/*
{pagos.map(
              (pagos: any, index) => (
                <li key={index}>
                  <CardHistorialPago
                    identificadorTransaccion={identificadorTransaccion as string}
                    nombreComunidad={nombreComunidad as string}
                    precio={pago.monto as number}
                    fechaPago={formatFechaMasUnMes(pagos.fechaPago) as string}
                  />
                </li>
              )
            )}
          </ul>

*/