import Button from "@/components/Button";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useFetchHandler } from "@/hooks/useFetchHandler";
import { Info } from "lucide-react";

interface Props {
  title?: string;
  description?: string;
  buttonLabel?: string;
  onConfirm?: () => Promise<any>;
  onCancel?: () => void;
  open: boolean;
  setOpen: (_: boolean) => void;
}

function InfoModal({
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
    <Dialog
      open={open}
      onOpenChange={setOpen}
      aria-describedby="Modal de éxito"
    >
      <DialogContent aria-describedby="Modal de información">
        <div className="max-w-md w-full text-center">
          {/* Icono de advertencia */}
          <div className="flex justify-center mb-4">
            <div className="bg-blue-500 rounded-full w-16 h-16 flex items-center justify-center">
              <Info color="white" size={36} strokeWidth={2} />
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

export default InfoModal;
