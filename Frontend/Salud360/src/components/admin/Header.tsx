import { Search } from "lucide-react";
import Input from "../input/Input";
import ButtonIcon from "../ButtonIcon";
import { ReactNode } from "react";

interface Props {
  actionButton: ReactNode;
  searchPlaceholder?: string;
}

function Header({ actionButton, searchPlaceholder = "Búsqueda" }: Props) {
  return (
    <div className="grid grid-cols-12 gap-4 items-center mb-4">
      <div className="col-span-4">
        <Input
          name="busqueda"
          leftIcon={<Search className="w-5 h-5" />}
          placeholder={searchPlaceholder}
          type="search"
        />
      </div>
      <div className="col-span-6 flex gap-2">
        <ButtonIcon
          icon={<Search className="w-6 h-6" />}
          size="lg"
          variant="primary"
        >
          Buscar
        </ButtonIcon>
      </div>
      <div className="col-span-2 flex justify-end">{actionButton}</div>
    </div>
  );
}

export default Header;
