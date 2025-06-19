import Button from "@/components/Button";
import { Ticket } from "lucide-react";

const ReservarCitaMedica = ({
  setMostrarFormulario,
}: {
  setMostrarFormulario: (_: boolean) => void;
}) => {
  return (
    <Button onClick={() => setMostrarFormulario(true)}>
      <Ticket /> Reservar
    </Button>
  );
};

export default ReservarCitaMedica;
