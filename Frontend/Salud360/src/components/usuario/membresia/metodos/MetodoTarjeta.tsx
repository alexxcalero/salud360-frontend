import Progression from "../Progression";
import { IComunidad } from "@/models/comunidad";
import { IMembresia } from "@/models/membresia";
import { useNavigate } from "react-router";
import { ShoppingCart } from "lucide-react";
import FormularioTarjeta from "../FormularioTarjeta";

const MetodoTarjeta = ({
  comunidad,
  membresia,
  medioDePago,
}: {
  comunidad: IComunidad;
  membresia: IMembresia;
  medioDePago?: IMedioDePago;
}) => {
  const navigate = useNavigate();
  return (
    <div>
      <Progression currentStep={1} steps={3} />
      <div className="mt-4">
        <FormularioTarjeta
          defaultValues={medioDePago}
          submitHandler={(data) => {
            // Falta este flujo
          }}
          cancelHandler={() => {
            navigate("/usuario/pasarela-pagos/", {
              state: { comunidad, membresia },
            });
          }}
          submitBtnContent={
            <>
              <ShoppingCart size={16} /> Comprar
            </>
          }
        />
      </div>
    </div>
  );
};

export default MetodoTarjeta;
