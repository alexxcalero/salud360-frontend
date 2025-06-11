import Spinner from "@/components/Spinner";
import CardMembresia from "@/components/usuario/config/CardMembresia";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";

interface MembresiaFake {
  comunidad: string;
  precio: number;
  fechaRenovacion: string;
  state: "idle" | "suspended" | "canceled";
  selected: boolean;
}

const Membresias = () => {
  const _dataExample: MembresiaFake[] = [
    {
      comunidad: "Comunidad 1",
      precio: 100,
      fechaRenovacion: "2023-10-01",
      state: "idle",
      selected: false,
    },
    {
      comunidad: "Comunidad 1",
      precio: 100,
      fechaRenovacion: "2023-10-01",
      state: "idle",
      selected: false,
    },
    {
      comunidad: "Comunidad 1",
      precio: 100,
      fechaRenovacion: "2023-10-01",
      state: "idle",
      selected: false,
    },
    {
      comunidad: "Comunidad 1",
      precio: 100,
      fechaRenovacion: "2023-10-01",
      state: "idle",
      selected: false,
    },
    {
      comunidad: "Comunidad 1",
      precio: 100,
      fechaRenovacion: "2023-10-01",
      state: "idle",
      selected: false,
    },
    {
      comunidad: "Comunidad 1",
      precio: 100,
      fechaRenovacion: "2023-10-01",
      state: "idle",
      selected: false,
    },
    {
      comunidad: "Comunidad 1",
      precio: 100,
      fechaRenovacion: "2023-10-01",
      state: "idle",
      selected: false,
    },
    {
      comunidad: "Comunidad 1",
      precio: 100,
      fechaRenovacion: "2023-10-01",
      state: "suspended",
      selected: false,
    },
    {
      comunidad: "Comunidad 1",
      precio: 100,
      fechaRenovacion: "2023-10-01",
      state: "idle",
      selected: false,
    },
    {
      comunidad: "Comunidad 1",
      precio: 100,
      fechaRenovacion: "2023-10-01",
      state: "canceled",
      selected: false,
    },
  ];

  const { items } = useInfiniteScroll<MembresiaFake>(_dataExample, async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return _dataExample;
  });

  return (
    <div className="p-8">
      <title>Membresías</title>
      <h1 className="text-left mb-4">Membresías</h1>
      <ul className="flex flex-col gap-4">
        {items.map(
          ({ comunidad, precio, fechaRenovacion, state, selected }, index) => (
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
      <div className="mt-4 w-full flex justify-center">
        <Spinner />
      </div>
    </div>
  );
};

export default Membresias;
