import CardHistorialPago from "@/components/usuario/config/CardHistorialPago";

const HistorialPagos = () => {
  const _dataExample = [
    ["123456789012345678", "Comunidad de Salud360", 100, "2023-10-01"],
    ["123456789012345678", "Comunidad de Salud360", 100, "2023-10-01"],
    ["123456789012345678", "Comunidad de Salud360", 100, "2023-10-01"],
    ["123456789012345678", "Comunidad de Salud360", 100, "2023-10-01"],
    ["123456789012345678", "Comunidad de Salud360", 100, "2023-10-01"],
  ];
  return (
    <div className="p-8">
      <h1 className="text-left mb-4">Historial de pagos</h1>
      <ul className="flex flex-col gap-4">
        {_dataExample.map(([id, nombre, precio, fecha], index) => (
          <li key={index}>
            <CardHistorialPago
              identificadorTransaccion={id as string}
              nombreComunidad={nombre as string}
              precio={precio as number}
              fechaPago={fecha as string}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistorialPagos;
