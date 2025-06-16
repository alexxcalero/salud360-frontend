import { DateTime } from "luxon";
import Progression from "../Progression";
import TarjetaSkeleton from "./TarjetaSkeleton";
import { useState } from "react";
import { IComunidad } from "@/models/comunidad";
import { IMembresia } from "@/models/membresia";
import Button from "@/components/Button";
import { useNavigate } from "react-router";
import { ShoppingCart } from "lucide-react";

const MetodoTarjeta = ({
  comunidad,
  membresia,
}: {
  comunidad: IComunidad;
  membresia: IMembresia;
}) => {
  const [tarjeta, setTarjeta] = useState("");
  const navigate = useNavigate();
  return (
    <div>
      <Progression currentStep={1} steps={3} />
      <TarjetaSkeleton numero={tarjeta} exp={DateTime.now()} />
      <input
        type="text"
        name=""
        id=""
        value={tarjeta}
        maxLength={16}
        onChange={(e) => setTarjeta(e.target.value)}
      />

      <div className="flex gap-4 justify-center w-full">
        <Button
          variant="outline"
          type="button"
          onClick={() => {
            navigate("/usuario/pasarela-pagos/", {
              state: { comunidad, membresia },
            });
          }}
        >
          Volver
        </Button>
        <Button type="submit">
          <ShoppingCart size={16} /> Comprar
        </Button>
      </div>
    </div>
  );
};

export default MetodoTarjeta;
