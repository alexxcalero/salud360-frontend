import Spinner from "@/components/Spinner";
import CardHistorialPago from "@/components/usuario/config/CardHistorialPago";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";

interface HistorialPagoFake {
  identificadorTransaccion: string;
  nombreComunidad: string;
  precio: number;
  fechaPago: string;
}

const HistorialPagos = () => {
  const _dataExample: HistorialPagoFake[] = [
    {
      identificadorTransaccion: "123456",
      nombreComunidad: "Comunidad 1",
      precio: 100,
      fechaPago: "2023-10-01",
    },
    {
      identificadorTransaccion: "123456",
      nombreComunidad: "Comunidad 1",
      precio: 100,
      fechaPago: "2023-10-01",
    },
    {
      identificadorTransaccion: "123456",
      nombreComunidad: "Comunidad 1",
      precio: 100,
      fechaPago: "2023-10-01",
    },
    {
      identificadorTransaccion: "123456",
      nombreComunidad: "Comunidad 1",
      precio: 100,
      fechaPago: "2023-10-01",
    },
    {
      identificadorTransaccion: "123456",
      nombreComunidad: "Comunidad 1",
      precio: 100,
      fechaPago: "2023-10-01",
    },
    {
      identificadorTransaccion: "123456",
      nombreComunidad: "Comunidad 1",
      precio: 100,
      fechaPago: "2023-10-01",
    },
    {
      identificadorTransaccion: "123456",
      nombreComunidad: "Comunidad 1",
      precio: 100,
      fechaPago: "2023-10-01",
    },
    {
      identificadorTransaccion: "123456",
      nombreComunidad: "Comunidad 1",
      precio: 100,
      fechaPago: "2023-10-01",
    },
    {
      identificadorTransaccion: "123456",
      nombreComunidad: "Comunidad 1",
      precio: 100,
      fechaPago: "2023-10-01",
    },
    {
      identificadorTransaccion: "123456",
      nombreComunidad: "Comunidad 1",
      precio: 100,
      fechaPago: "2023-10-01",
    },
    {
      identificadorTransaccion: "123456",
      nombreComunidad: "Comunidad 1",
      precio: 100,
      fechaPago: "2023-10-01",
    },
    {
      identificadorTransaccion: "123456",
      nombreComunidad: "Comunidad 1",
      precio: 100,
      fechaPago: "2023-10-01",
    },
    {
      identificadorTransaccion: "123456",
      nombreComunidad: "Comunidad 1",
      precio: 100,
      fechaPago: "2023-10-01",
    },
  ];

  const { items } = useInfiniteScroll<HistorialPagoFake>(
    _dataExample,
    async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return _dataExample;
    }
  );

  return (
    <div className="p-8">
      <h1 className="text-left mb-4">Historial de pagos</h1>
      <ul className="flex flex-col gap-4">
        {items.map(
          (
            { identificadorTransaccion, nombreComunidad, precio, fechaPago },
            index
          ) => (
            <li key={index}>
              <CardHistorialPago
                identificadorTransaccion={identificadorTransaccion as string}
                nombreComunidad={nombreComunidad as string}
                precio={precio as number}
                fechaPago={fechaPago as string}
              />
            </li>
          )
        )}
      </ul>
      <div className="mt-4 w-full flex justify-center">
        <Spinner />
      </div>
    </div>
  );
};

export default HistorialPagos;
