import mastercard from "@/assets/method-mastercard.svg";
import visa from "@/assets/method-visa.svg";
import { Edit2, Trash } from "lucide-react";
import colors from "tailwindcss/colors";

const CardMetodoPago = ({
  method,
  numero,
}: {
  method: "mastercard" | "visa";
  numero: string;
}) => {
  return (
    <div className="rounded-md shadow-md p-4 bg-white flex items-center justify-between">
      <div>
        <img
          src={method === "mastercard" ? mastercard : visa}
          alt=""
          className="h-[24px] inline mr-4"
        />
        <span className="text-sm text-neutral-700">
          **** **** **** {numero.substring(12, 16)}
        </span>
      </div>

      <div>
        <button className="mr-2">
          <Edit2 color={colors.blue["500"]} />
        </button>
        <button>
          <Trash color={colors.red["500"]} />
        </button>
      </div>
    </div>
  );
};

export default CardMetodoPago;
