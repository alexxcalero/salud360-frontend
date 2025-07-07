import { useNavigate } from "react-router";
import Progression from "./Progression";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import MassterCardIcon from "@/assets/method-mastercard.svg";
import VisaIcon from "@/assets/method-visa.svg";
import Button from "@/components/Button";
import { cn } from "@/lib/utils";
import SelectLabel from "@/components/SelectLabel";
import { useFetchHandler } from "@/hooks/useFetchHandler";
import { CircleCheck, Wallet } from "lucide-react";
import { IComunidad } from "@/models/comunidad";
import { IMembresia } from "@/models/membresia";
import { getAllMediosDePagosByUsuarioAPI } from "@/services/medioDePago.service";
import { AuthContext } from "@/hooks/AuthContext";
import { IMedioDePago } from "@/models/medioDePago";
import { clearPendingMembership } from "@/lib/pendingMembership";

const SeleccionarMetodo = ({
  comunidad,
  membresia,
}: {
  comunidad: IComunidad;
  membresia: IMembresia;
}) => {
  const [tipoDePago, setTipoDePago] = useState<
    "tarjeta" | "plin" | "yape" | "efectivo" | undefined
  >("tarjeta");
  const navigate = useNavigate();

  const [activeOption, setActiveOption] = useState<"nuevo" | "guardado">(
    "guardado"
  );

  const [mediosDePago, setMediosDePago] = useState<IMedioDePago[]>([]);
  const [selectedMedioDePagoInput, setSelectedMedioDePagoInput] =
    useState<string>();
  const selectedMedioDePago = useMemo(
    () =>
      mediosDePago.find(
        (m) => m.idMedioDePago?.toString() === selectedMedioDePagoInput
      ),
    [selectedMedioDePagoInput, mediosDePago]
  );

  const { fetch } = useFetchHandler();
  const { usuario } = useContext(AuthContext);
  useEffect(() => {
    fetch(async () => {
      clearPendingMembership();
      const mediosDePagos = await getAllMediosDePagosByUsuarioAPI(
        usuario.idCliente
      );
      setMediosDePago(mediosDePagos);
    });
  }, []);

  return (
    <div className="grow-2 px-10 flex flex-col gap-4 items-start">
      <Progression currentStep={0} steps={3} />
      <h1>Seleccione su método de pago</h1>

      <p>
        Puedes escoger un método ya guardado{" "}
        {activeOption === "guardado" && (
          <CircleCheck className="inline-block text-blue-500" size={14} />
        )}
      </p>
      <div
        className={cn(
          "p-4 border-1 border-neutral-400 rounded-md w-full",
          activeOption !== "guardado" &&
            "grayscale bg-neutral-200  hover:bg-neutral-300 transition-all duration-500 ease-out cursor-pointer"
        )}
        onClick={() => setActiveOption("guardado")}
      >
        <h2 className="text-left text-body-medium mb-2">Tarjetas guardadas</h2>

        <SelectLabel
          label="Seleccione uno de sus medios de pagos guardados"
          placeholder="Seleccione una opción"
          value={selectedMedioDePagoInput}
          onChange={setSelectedMedioDePagoInput}
          options={mediosDePago.map((m) => ({
            value: m.idMedioDePago?.toString() ?? "",
            content: `**** **** **** ${m.ncuenta?.toString().slice(-4)}`,
          }))}
          htmlFor=""
          disabled={activeOption !== "guardado"}
        />
      </div>

      <p>
        Ó un nuevo método{" "}
        {activeOption === "nuevo" && (
          <CircleCheck className="inline-block text-blue-500" size={14} />
        )}
      </p>
      <form
        action=""
        className={cn(
          "p-4 border-1 border-neutral-400 rounded-md w-full",
          activeOption !== "nuevo" &&
            "grayscale bg-neutral-200 hover:bg-neutral-300 transition-all duration-500 ease-out cursor-pointer"
        )}
        onClick={() => setActiveOption("nuevo")}
      >
        <h2 className="text-left text-body-medium">Usar un método nuevo</h2>
        <div className="flex items-center gap-2">
          <input
            type="radio"
            name="tipoDePago"
            id="metodo-tarjeta"
            value="tarjeta"
            checked={tipoDePago === "tarjeta"}
            onChange={(e) => setTipoDePago(e.target.value as any)}
            className="flex-none"
          />
          <label htmlFor="metodo-tarjeta">
            <img
              src={VisaIcon}
              alt=""
              className="aspect-1/1 h-8 inline-block mr-2"
            />
            <img
              src={MassterCardIcon}
              alt=""
              className="aspect-1/1 h-8 inline-block mr-2"
            />
            Tarjeta
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="radio"
            name="tipoDePago"
            id="metodo-efectivo"
            value="efectivo"
            checked={tipoDePago === "efectivo"}
            onChange={(e) => setTipoDePago(e.target.value as any)}
            className="flex-none"
          />
          <label htmlFor="metodo-efectivo" className="flex gap-1">
            <Wallet />
            Efectivo
          </label>
        </div>
        {/* <div className="flex items-center gap-2">
          <input
            type="radio"
            name="tipoDePago"
            id="metodo-plin"
            value="plin"
            className="inline-block"
            onChange={() => (tipoDePago.current = "plin")}
          />
          <label htmlFor="metodo-plin">
            <img
              src={PlinIcon}
              alt=""
              className="aspect-1/1 h-8 inline-block mr-2"
            />{" "}
            Plin
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="radio"
            name="tipoDePago"
            value="yape"
            id="metodo-yape"
            onChange={() => (tipoDePago.current = "yape")}
          />
          <label htmlFor="metodo-yape">
            <img
              src={YapeIcon}
              alt=""
              className="aspect-1/1 h-8 inline-block mr-2"
            />
            Yape
          </label>
        </div> */}
      </form>

      <div className="flex gap-4 justify-center w-full">
        <Button variant="outline" onClick={() => navigate(-1)}>
          Cancelar
        </Button>
        <Button
          type="button"
          disabled={
            tipoDePago && !selectedMedioDePago && activeOption === "guardado"
          }
          onClick={() => {
            if (!tipoDePago && !selectedMedioDePago) return;
            if (
              tipoDePago &&
              !selectedMedioDePago &&
              activeOption === "guardado"
            )
              return;

            navigate(`/usuario/pasarela-pagos/pago`, {
              state: {
                tipo: activeOption,
                comunidad,
                membresia,
                metodo: tipoDePago,
                mediosDePagoSeleccionado: selectedMedioDePago,
              },
            });
          }}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
};

export default SeleccionarMetodo;
