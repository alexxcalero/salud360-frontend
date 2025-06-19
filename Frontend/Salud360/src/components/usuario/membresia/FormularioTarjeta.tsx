// Añadir validaciones (max y min para numbers). Quizas sea necesario crear un Input para validacion de numeros sin type=number
// HAcer el fondo mas gris para que se note la diferencia entre las cards
// Añadir la funcion de consulta

import Button from "@/components/Button";
import Input from "@/components/input/Input";
import { useDialog } from "@/hooks/dialogContext";
import { useLoading } from "@/hooks/LoadingContext";
import { DateTime } from "luxon";
import { FormEvent, ReactNode, useContext, useMemo, useState } from "react";
import TarjetaSkeleton from "./metodos/TarjetaSkeleton";
import { cn } from "@/lib/utils";
import MastercardIcon from "@/assets/method-mastercard.svg";
import VisaIcon from "@/assets/method-visa.svg";
import { AuthContext } from "@/hooks/AuthContext";

interface Props {
  defaultValues?: IMedioDePago;
  submitHandler: (formData: IMedioDePago) => void;
  cancelHandler: () => void;
  submitBtnContent: ReactNode;
}

const FormularioTarjeta = ({
  defaultValues,
  submitHandler: submitHandlerParam,
  cancelHandler,
  submitBtnContent,
}: Props) => {
  const { setLoading } = useLoading();
  const { callSuccessDialog, callErrorDialog } = useDialog();

  // const [displayTipo, setDisplayTipo] = useState<string>(
  //   defaultValues?.tipo ?? ""
  // );
  const [displayNumeroTarjeta, setDisplayNumeroTarjeta] = useState<string>(
    defaultValues?.ncuenta
      ?.toString()
      .match(/.{1,4}/g)
      ?.join("-") ?? ""
  );
  const [mesInput, setMesInput] = useState<string>(
    defaultValues?.vencimiento
      ? DateTime.fromFormat(defaultValues?.vencimiento, "yyyy-LL").toFormat(
          "LL"
        )
      : ""
  );
  const [anioInput, setAnioInput] = useState<string>(
    defaultValues?.vencimiento
      ? DateTime.fromFormat(defaultValues?.vencimiento, "yyyy-LL").toFormat(
          "yyyy"
        )
      : ""
  );

  const [cvvDisplay, setCvvDisplay] = useState(
    defaultValues?.cvv?.toString() ?? ""
  );

  const displayTipo = useMemo(
    () =>
      /^(5[1-5]|2(22[1-9]|2[3-9]|[3-6]|7[01]|720))/.test(
        displayNumeroTarjeta.replace(/\D/g, "")
      )
        ? "mastercard"
        : /^4/.test(displayNumeroTarjeta.replace(/\D/g, ""))
        ? "visa"
        : "",
    [displayNumeroTarjeta]
  );

  const { usuario } = useContext(AuthContext);

  const newCard = useMemo<IMedioDePago>(
    () => ({
      tipo: displayTipo,
      ncuenta: Number(displayNumeroTarjeta.replace(/\D/g, "")),
      cvv: Number(cvvDisplay),
      vencimiento: DateTime.fromObject({
        month: Number(mesInput) ?? 0,
        year: Number(anioInput) ?? 0,
      }).toFormat("y-LL"),
    }),
    [displayNumeroTarjeta, cvvDisplay, mesInput, anioInput, displayTipo]
  );

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true); // Establece el estado de carga

    try {
      submitHandlerParam(newCard);

      callSuccessDialog({ title: "Método de pago agregado correctamente" });

      // Limpiar los campos del formulario después de agregar el método de pago
      // setDisplayTipo("mastercard");
      setDisplayNumeroTarjeta("");
      setCvvDisplay("");
      setMesInput("");
      setAnioInput("");
    } catch (err) {
      console.error("Error al agregar el método de pago", err);
      callErrorDialog({ title: "Error al agregar el método de pago" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-center">
        <TarjetaSkeleton
          tipoTarjeta={displayTipo}
          numero={newCard.ncuenta?.toString() ?? ""}
          exp={DateTime.fromFormat(newCard.vencimiento ?? "", "yyyy-LL")}
          nombre={`${usuario.nombres} ${usuario.apellidos}`}
        />
      </div>

      <form className="flex flex-col gap-4" onSubmit={submitHandler}>
        <label className="text-left">Tipo de tarjeta:</label>

        <div className="flex gap-2 justify-center">
          <input
            type="radio"
            name="metodo"
            id="metodo-mastercard"
            checked={displayTipo === "mastercard"}
            value="mastercard"
            // onChange={(e) => setDisplayTipo(e.target.value)}
            className="hidden"
          />
          <input
            type="radio"
            name="metodo"
            id="metodo-visa"
            checked={displayTipo === "visa"}
            value="visa"
            // onChange={(e) => setDisplayTipo(e.target.value)}
            className="hidden"
          />

          <label htmlFor="metodo-mastercard">
            <img
              className={cn(
                "aspect-auto h-8 transition-all duration-150 ease-out hover:scale-120 cursor-pointer",
                displayTipo !== "mastercard" && "grayscale brightness-85"
              )}
              src={MastercardIcon}
              alt="Opción de mastercard"
            />
          </label>
          <label htmlFor="metodo-visa">
            <img
              className={cn(
                "aspect-auto h-8 transition-all duration-150 ease-out hover:scale-120 cursor-pointer",
                displayTipo !== "visa" && "grayscale brightness-85"
              )}
              src={VisaIcon}
              alt="Opción de visa"
            />
          </label>
        </div>

        <Input
          name="numero-tarjeta"
          label="Número de tarjeta"
          value={displayNumeroTarjeta}
          setValue={(val) => {
            const numericValue = val.replace(/\D/g, "");
            const formatted = numericValue.match(/.{1,4}/g)?.join("-") ?? "";
            setDisplayNumeroTarjeta(formatted);
          }}
          required={true}
          placeholder="5555-4444-3333-2222"
          maxLength={19}
        />
        <Input
          name="nombre-titular"
          label="Nombre del titular"
          required={true}
          defaultValue={`${usuario.nombres} ${usuario.apellidos}`}
          // onChange={(e) =>
          //   setNewCard({ ...newCard, nombreTitular: e.target.value })
          // }
          placeholder="Jhon Doe"
          disabled={true}
        />

        <div className="grid grid-cols-2 gap-4 items-end">
          <div className="flex gap-2 items-end">
            <Input
              name="fecha-vencimiento-mes"
              label="Fecha de vencimiento"
              type="number"
              required={true}
              value={mesInput}
              setValue={setMesInput}
              placeholder="MM"
            />
            <p>/</p>
            <Input
              name="fecha-vencimiento-anio"
              type="number"
              required={true}
              value={anioInput}
              setValue={setAnioInput}
              placeholder="AA"
            />
          </div>
          <Input
            name="cvv"
            label="CVV"
            type="number"
            placeholder="CVV"
            value={cvvDisplay}
            setValue={setCvvDisplay}
          />
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button type="button" variant="outline" onClick={cancelHandler}>
            Cancelar
          </Button>
          <Button type="submit">{submitBtnContent}</Button>
        </div>
      </form>
    </div>
  );
};

export default FormularioTarjeta;
