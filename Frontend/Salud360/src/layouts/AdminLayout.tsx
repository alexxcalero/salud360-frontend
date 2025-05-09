import Sidebar from "@/components/admin/Sidebar";
import { Outlet, useLocation } from "react-router";

const routeToIndex: Record<string, number> = {
  dashboard: 0,
  configuracion: 1,
  roles: 2,
  membresias: 3,
  comunidades: 4,
  servicios: 5,
  locales: 6,
  usuarios: 7,
  personalMedico: 8,
  calificaciones: 9,
  logs: 10,
  auditorias: 11,
  reportes: 12,
}

// Active: Es el índice del elemento del sidebar que será activo
function AdminLayout() {
  // Nota personal: Usar esto con context
  // Fabián dice: Vamos a usar useLocation para que dependiendo de la URL se ilumine dinamicamente el modulo correspondiente

  const location = useLocation();
  const URLContent = location.pathname.split("/")
  const module = URLContent[2]; 

  //console.log("El location es:", location);
  //console.log("El URLContent es:", URLContent);
  //console.log("El módulo es:", module);

  const active = routeToIndex[module] ?? 0; //Si lo encuentra, lo asigna. Si no encuentra el modulo, el valor predeterminado será 0

  return (
    <div className="min-w-[100dvw] min-h-[100dvh] grid grid-cols-[350px_1fr] bg-gray-200">
      <Sidebar active={active} />
      <Outlet />
    </div>
  );
}

export default AdminLayout;
