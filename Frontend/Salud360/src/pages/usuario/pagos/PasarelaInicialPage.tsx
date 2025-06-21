import DetallesMembresia from "@/components/usuario/membresia/DetallesMembresia";
import SeleccionarMetodo from "@/components/usuario/membresia/SeleccionarMetodo";
import { getPendingMembership } from "@/lib/pendingMembership";
import { IComunidad } from "@/models/comunidad";
import { IMembresia } from "@/models/membresia";
import { useState } from "react";
import { Navigate, useLocation } from "react-router";

const PasarelaInicialPage = () => {
  const location = useLocation();
  const { comunidad: comunidadArg, membresia: membresiaArg } =
    getPendingMembership();

  // const { comunidad, membresia: membresiaParam } = location.state as {
  //   comunidad: IComunidad | undefined;
  //   membresia: IMembresia | undefined;
  // };
  const comunidad =
    comunidadArg ?? (location.state.comunidad as IComunidad | null);
  const membresiaParam =
    membresiaArg ?? (location.state.membresia as IMembresia | null);

  if (!comunidad || !membresiaParam) {
    return <Navigate to={"/usuario"} />;
  }

  const [membresia, setMembresia] = useState(membresiaParam);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <title>Pasarela de pagos</title>

      <div className="grid grid-cols-[1fr_auto_2fr] bg-white shadow-md max-w-300 p-4 m-4 gap-4">
        <div className="grow-1">
          <DetallesMembresia
            comunidad={comunidad}
            membresia={membresia}
            setMembresia={setMembresia}
          />
        </div>
        <div className="w-[1px] h-full bg-neutral-300"></div>

        <SeleccionarMetodo comunidad={comunidad} membresia={membresia} />
      </div>
    </div>
  );
};

export default PasarelaInicialPage;
