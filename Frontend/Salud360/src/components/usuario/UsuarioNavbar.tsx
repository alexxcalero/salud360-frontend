import { NavLink } from "react-router";
import NotificationIcon from "./NotificationIcon";
import ProfileIcon from "./ProfileIcon";

function UsuarioNavbar({ activeElement = 0 }: { activeElement?: number }) {
  const paths = [
    ["/usuario", "Inicio"],
    ["/usuario/perfil", "perfil"],
    ["/usuario/comunidades", "Comunidades"],
    ["/usuario/calendario", "Calendario y reservas"],
    ["/usuario/citas", "Citas médicas"],
    ["/usuario/historial", "Historial médico"],
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
            to={path}
            className={`text-white hover:text-blue-200 mx-[10px] text-[18px] ${
              activeElement === index ? "font-bold" : ""
            }`}
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
