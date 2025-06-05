import Button from "@/components/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";

interface Props {
  title?: string;
  description?: string;
  onCancel?: () => void;
  open: boolean;
  setOpen: (_: boolean) => void;
}

function ErrorModal({
  title = "",
  description = "",
  onCancel,
  open,
  setOpen,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <div className="max-w-md w-full text-center">
          {/* Icono de advertencia */}
          <div className="flex justify-center mb-4">
            <div className="bg-red-500 rounded-full w-16 h-16 flex items-center justify-center">
              <span className="text-white text-3xl font-bold">!</span>
            </div>
          </div>

          {/* Mensaje principal */}
          <DialogTitle className="text-2xl font-bold mb-2">{title}</DialogTitle>

          {/* Detalle del elemento */}
          <DialogDescription className="mb-6">{description}</DialogDescription>

          {/* Botones */}
          <div className="flex justify-center space-y-3">
            <Button
              onClick={() => {
                onCancel?.();
                setOpen(false);
              }}
            >
              Volver
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ErrorModal;
