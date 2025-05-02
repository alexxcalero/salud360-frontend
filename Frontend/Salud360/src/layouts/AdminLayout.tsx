import Sidebar from "@/components/admin/Sidebar";
import { Outlet } from "react-router";

// Active: Es el índice del elemento del sidebar que será activo
function AdminLayout({ active = 0 }: { active?: number }) {
  // Nota personal: Usar esto con context
  return (
    <div className="min-w-[100dvw] min-h-[100dvh] grid grid-cols-[350px_1fr] bg-gray-200">
      <Sidebar active={active} />
      <Outlet />
    </div>
  );
}

export default AdminLayout;
