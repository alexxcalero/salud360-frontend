import DetallesMembresia from "@/components/usuario/membresia/DetallesMembresia";
import MetodoPlin from "@/components/usuario/membresia/metodos/MetodoPlin";
import MetodoTarjeta from "@/components/usuario/membresia/metodos/MetodoTarjeta";
import MetodoYape from "@/components/usuario/membresia/metodos/MetodoYape";
import { IComunidad } from "@/models/comunidad";
import { IMembresia } from "@/models/membresia";
import { useState } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";

const PasarelaPagoPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  if (!location.state) {
    navigate("/usuario");
    return;
  }

  const {
    comunidad,
    membresia: membresiaParam,
    metodo,
    mediosDePagoSeleccionado,
    tipo,
  } = location.state as {
    tipo: "nuevo" | "guardado";
    comunidad?: IComunidad;
    membresia?: IMembresia;
    metodo?: string;
    mediosDePagoSeleccionado?: IMedioDePago;
  };

  if (!comunidad || !membresiaParam || (!metodo && !mediosDePagoSeleccionado)) {
    navigate("/usuario");
    return;
  }

  const [membresia, setMembresia] = useState(membresiaParam);
  console.log(mediosDePagoSeleccionado);

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

        {tipo === "guardado" && (
          <MetodoTarjeta
            comunidad={comunidad}
            membresia={membresia}
            medioDePago={mediosDePagoSeleccionado}
          />
        )}
        {metodo === "tarjeta" && tipo === "nuevo" && (
          <MetodoTarjeta comunidad={comunidad} membresia={membresia} />
        )}
        {metodo === "plin" && (
          <MetodoPlin comunidad={comunidad} membresia={membresia} />
        )}
        {metodo === "yape" && (
          <MetodoYape comunidad={comunidad} membresia={membresia} />
        )}
      </div>
    </div>
  );
};

export default PasarelaPagoPage;
