import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Filter } from "lucide-react";
import { ReactNode } from "react";

const FiltrarCalendario = ({ children }: { children?: ReactNode }) => {
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Filter />
        </PopoverTrigger>
        <PopoverContent className="w-72">
          <strong>Filtros</strong>
          <div>{children}</div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default FiltrarCalendario;
