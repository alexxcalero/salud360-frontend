import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CalendarCheck, CalendarPlus, CalendarX, Clock } from "lucide-react";

interface Props {
  variant: "blue" | "yellow" | "pink";
  nombreServicio: string;
  titulo: string;
  showBadge?: boolean;
  state?: "available" | "full" | "suscribed" | "soon";
  totalCapacity?: number;
  currentCapacity?: number;
}

export const DefaultCard = ({
  variant,
  nombreServicio,
  titulo,
  state,
  totalCapacity,
  currentCapacity,
  showBadge = true,
}: Props) => {
  return (
    <Dialog>
      <DialogTrigger
        className="group p-2 gap-3 flex flex-col border-l-6 rounded-sm border-blue-500 data-[variant='yellow']:bg-yellow-700/10 data-[variant='pink']:bg-fuchsia-700/10 data-[variant='yellow']:border-yellow-500 data-[variant='pink']:border-fuchsia-500 data-[state='full']:border-neutral-500 bg-blue-700/10 data-[state='full']:bg-neutral-700/10 text-blue-700 data-[variant='yellow']:text-yellow-700 data-[variant='pink']:text-fuchsia-700 data-[state='full']:text-neutral-700"
        data-state={state}
        data-variant={variant}
      >
        <div className="flex items-center justify-between">
          <span className="use-label-large font-semibold">
            {nombreServicio}
          </span>
          {showBadge && (
            <div className="py-1 px-2 rounded-full bg-blue-500 group-data-[variant='yellow']:group-data-[state='available']:bg-yellow-500 group-data-[variant='pink']:group-data-[state='available']:bg-fuchsia-500 group-data-[state='suscribed']:bg-green-500 group-data-[state='full']:bg-neutral-500 group-data-[state='soon']:bg-red-500 flex text-[9px] text-white font-semibold items-center">
              {state === "available" && (
                <>
                  <CalendarPlus color="white" size={14} strokeWidth={3} />{" "}
                  <span className="ml-1">
                    {totalCapacity} / {currentCapacity}
                  </span>
                </>
              )}
              {state === "full" && (
                <>
                  <CalendarX color="white" size={14} strokeWidth={3} />{" "}
                  <span className="ml-1">FULL</span>
                </>
              )}
              {state === "suscribed" && (
                <>
                  <CalendarCheck color="white" size={14} strokeWidth={3} />{" "}
                  <span className="ml-1">IN</span>
                </>
              )}
              {state === "soon" && (
                <>
                  <Clock color="white" size={14} strokeWidth={3} />{" "}
                  <span className="ml-1">PROX.</span>
                </>
              )}
            </div>
          )}
        </div>
        <span className="use-label-large font-semibold">{titulo}</span>
      </DialogTrigger>
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
  );
};
