import Button from "@/components/Button";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog";
import { useFetchHandler } from "@/hooks/useFetchHandler";
import { DialogDescription } from "@radix-ui/react-dialog";
import { TriangleAlert } from "lucide-react";

interface Props {
  title?: string;
  description?: string;
  buttonLabel?: string;
  onConfirm?: () => Promise<any>;
  onCancel?: () => void;
  open: boolean;
  setOpen: (_: boolean) => void;
}

function AlertModal({
  title = "",
  description = "",
  buttonLabel = "Eliminar",
  onConfirm,
  onCancel,
  open,
  setOpen,
}: Props) {
  const { fetch } = useFetchHandler();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <div className="max-w-md w-full text-center">
          {/* Icono de advertencia */}
          <div className="flex justify-center mb-4">
            <div className="bg-yellow-500 rounded-full w-16 h-16 flex items-center justify-center">
              <TriangleAlert color="white" size={36} strokeWidth={2} />
            </div>
          </div>

          {/* Mensaje principal */}
          <DialogTitle className="text-2xl font-bold mb-2">{title}</DialogTitle>

          {/* Detalle del elemento */}
          <DialogDescription className="mb-6">{description}</DialogDescription>

          {/* Botones */}
          <div className="flex space-x-3 justify-center">
            <DialogClose asChild>
              <Button
                variant="outline"
                onClick={() => {
                  onCancel?.();
                }}
              >
                Volver
              </Button>
            </DialogClose>
            <Button
              variant="danger"
              onClick={async () => {
                await fetch(async () => onConfirm?.());
                setOpen(false);
              }}
            >
              {buttonLabel}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AlertModal;
