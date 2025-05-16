import { NavLink } from "react-router";
import {
  CreditCard,
  LogOut,
  Settings,
  UserRoundPen,
  History,
} from "lucide-react";

import colors from "tailwindcss/colors";

const ConfigUsuarioSideBar = ({
  activeElement = 0,
}: {
  activeElement?: number;
}) => {
  const paths = [
    ["perfil", "Mi perfil", UserRoundPen],
    ["sistema", "Sistema", Settings],
    ["membresias", "Membresías", CreditCard],
    ["historial-pagos", "Historial de pago", History],
    ["logout", "Cerrar sesión", LogOut],
  ];
  return (
    <nav className="max-w-[300px] w-max h-full bg-white shadow-md p-[30px]">
      <ul className="flex flex-col gap-[10px] min-h-[100dvh] items-start">
        {paths.map(([path, name, Icon], index) => (
          <li key={index}>
            <NavLink to={`/usuario/configuracion/${path}`} className="nav-link">
              <Icon
                color={
                  index === activeElement
                    ? colors.blue["500"]
                    : colors.neutral["900"]
                }
                className="inline"
              />{" "}
              <span
                className={
                  index === activeElement ? "text-blue-500" : "text-neutral-900"
                }
              >
                {name as string}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ConfigUsuarioSideBar;
