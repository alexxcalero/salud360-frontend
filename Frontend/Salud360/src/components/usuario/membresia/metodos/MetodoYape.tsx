import Input from "@/components/input/Input";
import Progression from "../Progression";
import Button from "@/components/Button";
import { IComunidad } from "@/models/comunidad";
import { IMembresia } from "@/models/membresia";
import { useNavigate } from "react-router";
import { Copy, Info, Menu, ShoppingCart } from "lucide-react";
import { FormEvent } from "react";

const MetodoYape = ({
  membresia,
  comunidad,
}: {
  comunidad: IComunidad;
  membresia: IMembresia;
}) => {
  const navigate = useNavigate();

  const submitHanlder = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div>
      <Progression currentStep={1} steps={3} />

      <form onSubmit={submitHanlder} className="flex flex-col gap-4 mt-4">
        <div className="bg-purple-50 p-4 rounded-md">
          <p className="text-left">
            <span className="font-normal text-neutral-600">Paga con tu</span>
            <br />
            <span className="font-semibold text-neutral-600">
              Código de aprobación
            </span>
          </p>
          <ol className="flex flex-col gap-2 my-4">
            <li className="flex gap-2 items-center">
              <Menu className="text-purple-800" size={16} />{" "}
              <span className="text-neutral-600">
                Encuéntralo en el menú de tu app Yape
              </span>
            </li>
            <li className="flex gap-2 items-center">
              <Copy className="text-purple-800" size={16} />{" "}
              <span className="text-neutral-600">Cópialo y pégalo abajo</span>
            </li>
            <li className="flex gap-2 items-center">
              <Info
                className="rounded-full text-emerald-500"
                size={16}
                strokeWidth={3}
              />{" "}
              <span className="text-neutral-600 text-left">
                <span>El monto límite para pagos a través de</span>
                <span>Yape es de S/ 2,000</span>
              </span>
            </li>
          </ol>
        </div>

        <Input
          name="telefono"
          label="Ingresa tu celular YAPE"
          required={true}
        />
        <Input name="codigo" label="Código de aprobación" required={true} />

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

export default MetodoYape;
