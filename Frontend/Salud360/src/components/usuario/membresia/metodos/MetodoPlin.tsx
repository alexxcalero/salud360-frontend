import Progression from "../Progression";
import PlinIcon from "@/assets/plin.svg";
import Button from "@/components/Button";
import { IComunidad } from "@/models/comunidad";
import { IMembresia } from "@/models/membresia";
import { ShoppingCart } from "lucide-react";
import QRCode from "react-qr-code";
import { useNavigate } from "react-router";

const MetodoPlin = ({
  comunidad,
  membresia,
}: {
  comunidad: IComunidad;
  membresia: IMembresia;
}) => {
  const navigate = useNavigate();
  return (
    <div>
      <Progression currentStep={1} steps={3} />
      <form action="" className="my-4">
        <div className="flex flex-col items-center">
          <img src={PlinIcon} alt="ÍCono de Plin" className="aspect-1/1 h-10" />
          <span className="mt-2">Erasmo Cueva Flores Yrirgoyen</span>
        </div>

        <div className="flex justify-center my-4">
          <QRCode
            value="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            size={200}
            bgColor="#fff"
            fgColor="#000"
          />
        </div>

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
      </form>
    </div>
  );
};

export default MetodoPlin;
