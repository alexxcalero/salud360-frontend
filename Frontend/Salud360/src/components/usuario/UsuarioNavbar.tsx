import { NavLink } from "react-router";
import NotificationIcon from "./NotificationIcon";
import ProfileIcon from "./ProfileIcon";

function UsuarioNavbar() {
  const paths = [
    ["/", "Inicio"],
    ["configuracion", "perfil"],
    ["comunidades", "Comunidades"],
    ["calendario", "Calendario y reservas"],
    ["citas", "Citas médicas"],
    ["historial", "Historial médico"],
  ];
  return (
    <header className="flex justify-between items-center bg-blue-500 shadow-md px-[40px] py-[10px] text-white">
      <NavLink to="/">
        <figure className="flex items-center">
          <img
            src="/img/logo/logo.png"
            alt="Logo"
            className="w-[50px] rounded-full"
          />
        </figure>
      </NavLink>

      <nav>
        {paths.map(([path, name], index) => (
          <NavLink
            key={index}
            to={`/usuario/${path}`}
            className={({ isActive }) =>
              `text-white hover:text-blue-200 mx-[10px] text-[18px] ${
                isActive && "font-bold"
              }`
            }
          >
            {name}
          </NavLink>
        ))}
      </nav>

      <div className="flex items-center gap-[20px]">
        <NotificationIcon />
        <ProfileIcon />
      </div>
    </header>
  );
}

export default UsuarioNavbar;
