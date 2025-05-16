import CardMembresia from "@/components/usuario/config/CardMembresia";

const Membresias = () => {
  const _dataExample = [
    ["Comunidad de Salud360", 100, "2023-10-01", "idle", false],
    ["Comunidad de Salud360", 100, "2023-10-01", "suspended", false],
    ["Comunidad de Salud360", 100, "2023-10-01", "canceled", false],
    ["Comunidad de Salud360", 100, "2023-10-01", "idle", false],
    ["Comunidad de Salud360", 100, "2023-10-01", "idle", false],
  ];
  return (
    <div className="p-8">
      <h1 className="text-left mb-4">Membresías</h1>
      <ul className="flex flex-col gap-4">
        {_dataExample.map(
          ([comunidad, precio, fechaRenovacion, state, selected], index) => (
            <li key={index}>
              <CardMembresia
                comunidad={comunidad as string}
                precio={precio as number}
                fechaRenovacion={fechaRenovacion as string}
                state={state as "idle" | "suspended" | "canceled"}
                selected={selected as boolean}
              />
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default Membresias;
