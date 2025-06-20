import Sidebar from "@/components/admin/Sidebar";
import { AuthContext } from "@/hooks/AuthContext";
import { useContext } from "react";
import { Outlet, useLocation } from "react-router";

const routeToIndex: Record<string, number> = {
  dashboard: 0,
  configuracion: 1,
  //roles: 2,
  //membresias: 3,
  comunidades: 2,
  servicios: 3,
  locales: 4,
  usuarios: 5,
  personalMedico: 6,
  testimonios: 7,
  auditorias: 8,
  reportes: 9,
  clases: 10,
  citasMedicas: 11,
};

// Active: Es el índice del elemento del sidebar que será activo
function AdminLayout() {
  // Nota personal: Usar esto con context
  // Fabián dice: Vamos a usar useLocation para que dependiendo de la URL se ilumine dinamicamente el modulo correspondiente

  const location = useLocation();
  const URLContent = location.pathname.split("/");
  const module = URLContent[2];

  //console.log("El location es:", location);
  //console.log("El URLContent es:", URLContent);
  //console.log("El módulo es:", module);

  const active = routeToIndex[module] ?? 0; //Si lo encuentra, lo asigna. Si no encuentra el modulo, el valor predeterminado será 0
  //mbl
  const { usuario } = useContext(AuthContext);
  console.log("En admin, el usuario es:", usuario);

  //REALICÉ UN CAMBIO PARA EL QUE FONDO ESTÉ MEJOR
  return (
    <div className="max-w-full max-h-full grid grid-cols-[350px_minmax(0,1fr)] grid-rows-1 bg-white place-items-stretch">
      <Sidebar active={active} />
      <Outlet />
    </div>
  );
}

export default AdminLayout;
