import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { extenedCitaMedicaType } from "@/schemas/citaMedica";

const ReservarCitaModalForm = ({
  open,
  setOpen,
  citaMedica,
}: {
  open: boolean;
  setOpen: (_: boolean) => void;
  citaMedica: extenedCitaMedicaType;
  onCreate?: () => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <form action="">
          <DialogTitle>Reservar </DialogTitle>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReservarCitaModalForm;
