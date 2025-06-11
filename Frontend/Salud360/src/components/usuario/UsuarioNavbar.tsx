import { Link, NavLink } from "react-router";
import logo from "@/assets/logo.png";
import NotificationIcon from "./NotificationIcon";
import ProfileIcon from "./ProfileIcon";

function UsuarioNavbar() {
  const paths = [
    [" ", "Inicio"],
    ["configuracion", "Perfil"],
    ["comunidades", "Comunidades"],
    ["calendarioYReservas", "Calendario y Reservas"],
  ];
  
  return (
    <header className="sticky top-0 left-0 w-full bg-[#2A86FF] py-5 z-100"> {/*El z-10 es para que nada le pase por encima. Puede ser cualquier número alto.*/}
          <nav>
              <div className="grid grid-cols-12 gap-6 items-center">
                  <div className="col-span-3 px-8">
                      <Link to="/"><img src={logo} alt="Logo" className="cursor-pointer"/></Link>
                  </div>
                  <div className="flex gap-12 justify-center text-white font-semibold align-center col-span-6">
                      {paths.map(([path, name], index) => (
                        <NavLink
                          key={index}
                          to={`/usuario/${path}`}
                          className={({ isActive }) =>
                            `text-white hover:text-blue-200 mx-[10px] text-[18px] ${
                              isActive && "font-bold text-emerald-300"
                            }`
                          }
                        >
                          {name}
                        </NavLink>
                      ))}
                  </div>
                  <div className="flex justify-end col-span-3 px-8 gap-6">
                          <>
                          <div className="mt-3 flex flex-row justify-between gap-6">
                              <NotificationIcon/>
                              <ProfileIcon/>
                          </div>
                          </>
                      
                  </div>
              </div>            
          </nav>
      </header>
  );
}

export default UsuarioNavbar;

/* 
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


*/