import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CalendarCheck, CalendarPlus, CalendarX, Clock } from "lucide-react";
import { claseType } from "@/schemas/clase";
import { useState } from "react";

export const ClaseCard = ({
  clase: { estado, cantAsistentes, capacidad, nombre },
}: {
  clase: claseType;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        onDoubleClick={() => setOpen(true)}
        className="group p-2 gap-3 flex flex-col border-l-6 rounded-sm border-fuchsia-500 data-[state='full']:border-neutral-500 bg-fuchsia-700/10 data-[state='full']:bg-neutral-700/10 text-fuchsia-700 data-[state='full']:text-neutral-700 hover:shadow-md hover:shadow-blue-300"
        data-state={estado}
      >
        <div className="flex items-center justify-between">
          <span className="use-label-large font-semibold">Clase</span>
          <div className="py-1 px-2 rounded-full bg-fuchsia-500 group-data-[state='suscribed']:bg-green-500 group-data-[state='full']:bg-neutral-500 group-data-[state='soon']:bg-red-500 flex text-[9px] text-white font-semibold items-center">
            {estado === "available" && (
              <>
                <CalendarPlus color="white" size={14} strokeWidth={3} />{" "}
                <span className="ml-1">
                  {cantAsistentes} / {capacidad}
                </span>
              </>
            )}
            {estado === "full" && (
              <>
                <CalendarX color="white" size={14} strokeWidth={3} />{" "}
                <span className="ml-1">FULL</span>
              </>
            )}
            {estado === "suscribed" && (
              <>
                <CalendarCheck color="white" size={14} strokeWidth={3} />{" "}
                <span className="ml-1">IN</span>
              </>
            )}
            {estado === "soon" && (
              <>
                <Clock color="white" size={14} strokeWidth={3} />{" "}
                <span className="ml-1">PROX.</span>
              </>
            )}
          </div>
        </div>
        <span className="use-label-large font-medium">{nombre}</span>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
