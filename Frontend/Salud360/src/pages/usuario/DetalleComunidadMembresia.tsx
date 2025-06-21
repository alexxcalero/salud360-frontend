import { useFetchHandler } from "@/hooks/useFetchHandler";
import { IComunidad } from "@/models/comunidad";
import { getComunidadByIdAPI } from "@/services/comunidades.service";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

function DetalleComunidadMembresia() {
  const [_comunidad, setComunidad] = useState<IComunidad>();
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
        <h1>Membresía actual</h1>
      </div>
    </section>
  );
}

export default DetalleComunidadMembresia;
