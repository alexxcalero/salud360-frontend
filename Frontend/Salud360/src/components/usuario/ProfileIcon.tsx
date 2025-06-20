import { LogOut, User } from "lucide-react";
import { NavLink } from "react-router";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
//import { useUsuario } from "@/hooks/useUsuario";
import { AuthContext } from "@/hooks/AuthContext";
import { useContext } from "react";

const ProfileIcon = () => {
  const { usuario, logout, loading } = useContext(AuthContext);

  if (loading || !usuario) return null;

  const nombres = usuario.nombres;
  const apellidos = usuario.apellidos;
  const fotoPerfil = usuario.fotoPerfil;
  const idRol = usuario.rol.idRol;

  /*const {
    datos: { nombres, apellidos, fotoPerfil },
  } = useUsuario();*/
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <div className="cursor-pointer">
            <User color="white" />
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex gap-2 border-b-2 border-neutral-200 py-2 items-center">
            {fotoPerfil ? (
              <img
              src={`http://localhost:8080/api/archivo/${fotoPerfil}`}
              alt="Foto de perfil"
              className="aspect-1/1 h-[32px] rounded-full object-cover"
            />
            ) : (
              <User color="black" />
            )}

            <span>
              {nombres} {apellidos}
              <br />
              {idRol == 1 ? (
                <>
                  <NavLink
                    to="/admin/"
                    className="use-label-large text-blue-500"
                  >
                    Ver panel de Admin
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    to="/usuario/"
                    className="use-label-large text-blue-500"
                  >
                    Ver perfil
                  </NavLink>
                </>
              )}
              <br />
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
