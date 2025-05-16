import { NavLink } from "react-router";
import {
  CreditCard,
  LogOut,
  Settings,
  UserRoundPen,
  History,
} from "lucide-react";

import colors from "tailwindcss/colors";

const ConfigUsuarioSideBar = () => {
  const paths = [
    ["/", "Mi perfil", UserRoundPen],
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
            <NavLink to={`/usuario/configuracion/${path}`}>
              {({ isActive }) =>
                isActive ? (
                  <>
                    <Icon color={colors.blue["500"]} className="inline" />{" "}
                    <span className="text-blue-500">{name as string}</span>
                  </>
                ) : (
                  <>
                    <Icon color={colors.neutral["900"]} className="inline" />{" "}
                    <span className="text-neutral-900">{name as string}</span>
                  </>
                )
              }
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ConfigUsuarioSideBar;
