import CardMembresia from "@/components/landing/CardMembresía";
import { useFetchHandler } from "@/hooks/useFetchHandler";
import { IComunidad } from "@/models/comunidad";
import { getComunidadByIdAPI } from "@/services/comunidades.service";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

function DetalleComunidadMembresia() {
  const [comunidad, setComunidad] = useState<IComunidad>();
  const { id } = useParams();
  const { fetch } = useFetchHandler();
  useEffect(() => {
    fetch(async () => {
      const data = await getComunidadByIdAPI(Number(id));
      setComunidad(data);
    });
  }, []);

  return (
    <section>
      <title>Membresías de comunidad</title>
      <div className="my-4">
        <h1>Membresías de comunidad</h1>
        <div className="p-4 border-yellow-700 border-1 rounded-md bg-yellow-200 text-yellow-700 mx-10 my-4">
          No cuentas con una Membresía
          <h2>Únete ya con las siguientes membresías</h2>
        </div>

        <div className="flex flex-row m-8 gap-12 justify-center">
          {/*CUANDO FUNCIONE REEMPLAZAR POR EL CODIGO DE ABAJO */}
          {comunidad?.membresias?.map((membresia: any, i: number) => (
            <div key={i}>
              <CardMembresia
                membresia={membresia}
                comunidad={comunidad}
                to="/usuario/pasarela-pagos/"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DetalleComunidadMembresia;
