// Añadir validaciones (max y min para numbers). Quizas sea necesario crear un Input para validacion de numeros sin type=number
// HAcer el fondo mas gris para que se note la diferencia entre las cards
// Añadir la funcion de consulta

import Button from "@/components/Button";
import Input from "@/components/input/Input";
import { useDialog } from "@/hooks/dialogContext";
import { useLoading } from "@/hooks/LoadingContext";
import { DateTime } from "luxon";
import { FormEvent, ReactNode, useEffect, useState } from "react";
import TarjetaSkeleton from "./metodos/TarjetaSkeleton";
import { cn } from "@/lib/utils";
import MastercardIcon from "@/assets/method-mastercard.svg";
import VisaIcon from "@/assets/method-visa.svg";

interface ICardForm {
  method: "mastercard" | "visa";
  numero: string;
  nombreTitular: string;
  fechaVencimiento: string;
  cvv: string;
}

interface Props {
  defaultValues?: ICardForm;
  submitHandler: (formData: ICardForm) => void;
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

  const [newCard, setNewCard] = useState<ICardForm>(
    defaultValues ?? {
      method: "mastercard", // Default method
      numero: "",
      nombreTitular: "",
      fechaVencimiento: "",
      cvv: "",
    }
  );

  const [displayNumeroTarjeta, setDisplayNumeroTarjeta] = useState<string>();
  const [mesInput, setMesInput] = useState<string>("");
  const [anioInput, setAnioInput] = useState<string>("");

  useEffect(() => {
    setNewCard({
      ...newCard,
      fechaVencimiento: DateTime.fromObject({
        month: Number(mesInput) ?? 0,
        year: Number(anioInput) ?? 0,
      }).toFormat("y-LL"),
    });
  }, [mesInput, anioInput]);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true); // Establece el estado de carga

    try {
      // const vencimientoISO = new Date(
      //   `${newCard.fechaVencimiento}-01`
      // ).toISOString();

      // const data = {
      //   tipo: newCard.method,
      //   ncuenta: newCard.numero,
      //   cvv: newCard.cvv,
      //   vencimiento: vencimientoISO, // Usa la fecha convertida
      //   id_cliente: id,
      //   fechaDesactivacion: null, // Si es necesario
      //   usuario: {
      //     idUsuario: id, // Usamos el idCliente como idUsuario
      //     correo: usuario.correo, // Correo del usuario
      //     rol: {
      //       idRol: 1073741824, // Asumiendo que este es el rol
      //       nombre: "cliente", // El nombre del rol
      //       descripcion: "Rol de cliente", // Descripción del rol
      //     },
      //   },
      // };

      // await axios.post("http://localhost:8080/api/mediosDePago", data, {
      //   auth: { username: "admin", password: "admin123" },
      //   headers: { "Content-Type": "application/json" },
      // });
      submitHandlerParam(newCard);

      callSuccessDialog({ title: "Método de pago agregado correctamente" });

      // Limpiar los campos del formulario después de agregar el método de pago
      setNewCard({
        method: "mastercard", // Reset method to default
        numero: "",
        nombreTitular: "",
        fechaVencimiento: "",
        cvv: "",
      });
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
          numero={newCard.numero}
          exp={DateTime.fromFormat(newCard.fechaVencimiento, "y-LL")}
          nombre={newCard.nombreTitular}
        />
      </div>

      <form className="flex flex-col gap-4" onSubmit={submitHandler}>
        <label className="text-left">Tipo de tarjeta:</label>

        <div className="flex gap-2 justify-center">
          <input
            type="radio"
            name="metodo"
            id="metodo-mastercard"
            checked={newCard.method === "mastercard"}
            value="mastercard"
            onChange={(e) =>
              setNewCard({
                ...newCard,
                method: e.target.value as "mastercard" | "visa",
              })
            }
            className="hidden"
          />
          <input
            type="radio"
            name="metodo"
            id="metodo-visa"
            checked={newCard.method === "visa"}
            value="visa"
            onChange={(e) =>
              setNewCard({
                ...newCard,
                method: e.target.value as "mastercard" | "visa",
              })
            }
            className="hidden"
          />

          <label htmlFor="metodo-mastercard">
            <img
              className={cn(
                "aspect-auto h-8 transition-all duration-150 ease-out hover:scale-120 cursor-pointer",
                newCard.method !== "mastercard" && "grayscale brightness-85"
              )}
              src={MastercardIcon}
              alt="Opción de mastercard"
            />
          </label>
          <label htmlFor="metodo-visa">
            <img
              className={cn(
                "aspect-auto h-8 transition-all duration-150 ease-out hover:scale-120 cursor-pointer",
                newCard.method !== "visa" && "grayscale brightness-85"
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
          onChange={(e) => {
            const input = e.target.value;
            const numericValue = input.replace(/\D/g, "");
            const formatted = numericValue.match(/.{1,4}/g)?.join("-") ?? "";
            setDisplayNumeroTarjeta(formatted);
            setNewCard({ ...newCard, numero: numericValue });
          }}
          required={true}
          placeholder="5555-4444-3333-2222"
          maxLength={19}
        />
        <Input
          name="nombre-titular"
          label="Nombre del titular"
          required={true}
          value={newCard.nombreTitular}
          onChange={(e) =>
            setNewCard({ ...newCard, nombreTitular: e.target.value })
          }
          placeholder="Jhon Doe"
        />

        <div className="grid grid-cols-2 gap-4 items-end">
          <div className="flex gap-2 items-end">
            <Input
              name="fecha-vencimiento-mes"
              label="Fecha de vencimiento"
              type="number"
              required={true}
              value={mesInput}
              onChange={(e) => setMesInput(e.target.value)}
              placeholder="MM"
            />
            <p>/</p>
            <Input
              name="fecha-vencimiento-anio"
              type="number"
              required={true}
              value={anioInput}
              onChange={(e) => setAnioInput(e.target.value)}
              placeholder="AA"
            />
          </div>
          <Input
            name="cvv"
            label="CVV"
            type="number"
            placeholder="CVV"
            value={newCard.cvv}
            onChange={(e) => setNewCard({ ...newCard, cvv: e.target.value })}
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
