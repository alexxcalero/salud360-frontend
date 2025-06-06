import Button from "@/components/Button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useInternalModals } from "@/hooks/useInternalModals";
import { Filter } from "lucide-react";
import { ReactNode } from "react";

const FiltrarCalendario = ({ children }: { children?: ReactNode }) => {
  const { reload } = useInternalModals();
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Filter className="hover:text-neutral-300 transition-colors duration-150 ease-out" />
        </PopoverTrigger>
        <PopoverContent className="w-72">
          <strong>Filtros</strong>
          <div>{children}</div>
          <Button className="mt-4" onClick={() => reload()}>
            Filtrar
          </Button>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default FiltrarCalendario;
