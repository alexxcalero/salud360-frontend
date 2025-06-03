import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Check } from "lucide-react";
import Button from "../Button";

interface Props {
  title?: string;
  description?: string;
  onConfirm?: () => void;
  open: boolean;
  setOpen: (_: boolean) => void;
}

function SuccessModal({
  title = "",
  description = "",
  onConfirm,
  open,
  setOpen,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <div className="max-w-md w-full text-center">
          {/* Círculo con check */}
          <div className="flex justify-center mb-4">
            <div className="bg-green-500 rounded-full w-16 h-16 flex items-center justify-center">
              <Check color="white" size={36} strokeWidth={4} />
            </div>
          </div>

          {/* Título */}
          <h2 className="text-2xl font-bold mb-2">{title}</h2>

          {/* Subtítulo */}
          <p className="mb-6">{description}</p>

          {/* Botón */}
          <Button
            onClick={() => {
              onConfirm?.();
              setOpen(false);
            }}
          >
            Aceptar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SuccessModal;
