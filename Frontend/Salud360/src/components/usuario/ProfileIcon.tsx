import { LogOut, User } from "lucide-react";
import { NavLink } from "react-router";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useUsuario } from "@/hooks/useUsuario";
import { AuthContext } from "@/hooks/AuthContext";
import { useContext } from "react";

const ProfileIcon = () => {
  
  const {usuario, logout} = useContext(AuthContext)
  
  const nombres = usuario.nombres;
  const apellidos = usuario.apellidos; 
  const fotoPerfil = usuario.fotoPerfil;


  /*const {
    datos: { nombres, apellidos, fotoPerfil },
  } = useUsuario();*/
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <User color="white" />
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex gap-2 border-b-2 border-neutral-200 py-2 items-center">

            {fotoPerfil ? (
              <img
                src={fotoPerfil}
                alt=""
                className="aspect-1/1 h-[32px] rounded-full"
              />
            ):
              <User color="black" />
            }

            
            <span>
              {nombres} {apellidos}
              <br />
              <NavLink
                to="/usuario/configuracion/"
                className="use-label-large text-blue-500"
              >
                Ver perfil
              </NavLink>
            </span>
          </div>
          <div className="pt-2 cursor-pointer" onClick={logout}>
            <LogOut className="inline mr-2" />
            <span>Cerrar sesión</span>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default ProfileIcon;
