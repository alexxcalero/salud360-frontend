import Spinner from "@/components/Spinner";
import CardHistorialPago from "@/components/usuario/config/CardHistorialPago";
import DetallePagoModal from "@/components/usuario/DetallePago";
import { AuthContext } from "@/hooks/AuthContext";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { baseAPI } from "@/services/baseAPI";
import { AlertTriangle } from "lucide-react";
import { useContext, useEffect, useState } from "react";

/*interface HistorialPagoFake {
  identificadorTransaccion: string;
  nombreComunidad: string;
  precio: number;
  fechaPago: string;
}*/

const HistorialPagos = () => {
  const [pagos, setPagos] = useState<any[]>([]);
  const [waiting, setWaiting] = useState(true);

  const [pagoActual, setPagoActual] = useState([]);
  const [showDetallePago, setShowDetallePago] = useState(false);

  const { usuario, logout, loading } = useContext(AuthContext);

  if (loading || !usuario) return null;

  const id = usuario.idCliente;

  const fetchPagos = async () => {
    try {
     // console.log("El id del usuario es:", id);
      const res = await baseAPI.get(`/pagos/${id}`, {
        auth: {
          username: "admin",
          password: "admin123",
        },
      });
     // console.log("Pagos del Usuario:", res.data);
      setPagos(Array.isArray(res.data) ? res.data : [res.data]);
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

 // console.log("tienePagos es:", tienePagos);

  const handleDetalles = (pago: any) => {
    setPagoActual(pago);
    setShowDetallePago(true);
  };

  //Obtenemos el total por métodos de pago:
  const resumenPorCuenta: Record<string, { tipo: string; total: number }> = {};

  const formatearTipo = (tipo: string) => {
    const map: Record<string, string> = {
      tarjeta_credito: "Tarjeta de Crédito",
      tarjeta_debito: "Tarjeta de Débito",
      efectivo: "Efectivo",
      yape: "Yape",
      plin: "Plin",
      visa: "Visa",
      mastercard: "Mastercard",
      //Estoy agregando estos porseaca
    };

    return (
      map[tipo] ||
      tipo.charAt(0).toUpperCase() + tipo.slice(1).replace("_", " ")
    );
  };

  pagos.forEach((pago) => {
    const cuenta = pago.medioDePago?.ncuenta || "Desconocido";
    const tipoRaw = pago.medioDePago?.tipo || "Desconocido";
    const tipo = formatearTipo(tipoRaw);

    if (!resumenPorCuenta[cuenta]) {
      resumenPorCuenta[cuenta] = { tipo, total: 0 };
    }

    resumenPorCuenta[cuenta].total += pago.monto;
  });

  const ocultarCuenta = (n: string) =>
    n.length > 4 ? `**** **** **** ${n.slice(-4)}` : n;

  return (
    <div className="p-8">
      <title>Historial de pagos</title>
      <h1 className="text-left mb-4">Historial de pagos</h1>

      {!waiting && (
        <>
          {tienePagos ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {Object.entries(resumenPorCuenta).map(
                  ([cuenta, { tipo, total }]) => (
                    <div
                      key={cuenta}
                      className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex items-center justify-between hover:shadow-md transition"
                    >
                      <div>
                        <h4 className="text-sm text-gray-500 mb-1">
                          {formatearTipo(tipo)}
                        </h4>
                        <p className="text-base font-semibold text-gray-800">
                          {ocultarCuenta(cuenta)}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-gray-500">Total</span>
                        <p className="text-lg font-bold text-blue-600">
                          S/ {total.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>

              <ul className="flex flex-col gap-4">
                {pagos.map((pago: any, index) => (
                  <li key={index}>
                    <CardHistorialPago
                      identificadorTransaccion={pago.idPago as string}
                      nombreComunidad={pago.afiliacion?.comunidad?.nombre}
                      precio={pago.monto as number}
                      fechaPago={formatFechaMasUnMes(pago.fechaPago) as string}
                      onDetalles={() => handleDetalles(pago)}
                      pago={pago}
                    />
                  </li>
                ))}
              </ul>
              <div className="mt-4 w-full flex justify-center">
                <Spinner />
              </div>
            </>
          ) : (
            <div className="text-center flex flex-col items-center gap-4 mt-32">
              <AlertTriangle className="text-red-500 w-32 h-32" />
              <h1>NO HAZ REALIZADO NINGÚN PAGO.</h1>
              <h3>
                Tus pagos aparecerán aquí cada vez que compres una membresía.
              </h3>
            </div>
          )}
        </>
      )}

      {showDetallePago && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40" />
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div>
              <DetallePagoModal
                pago={pagoActual}
                onClick={() => setShowDetallePago(false)}
              />
            </div>
          </div>
        </>
      )}
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
