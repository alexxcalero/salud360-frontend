import { useEffect, useState } from "react";
import { UserPlus, Pencil, Trash2, Info, Search, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router";

import InputIcon from "@/components/InputIcon";
import ButtonIcon from "@/components/ButtonIcon";
import TableHeader from "@/components/admin/TableHeader";
import TableBody from "@/components/admin/TableBody";
import ModalExito from "@/components/ModalExito";
import ModalError from "@/components/ModalError";
import ModalRestauracion from "@/components/ModalRestauracion";
import { baseAPI } from "@/services/baseAPI";

function RolesPage() {
  const [selectAll, setSelectAll] = useState(false);
  const [roles, setRoles] = useState<any[]>([]);
  const [rolSeleccionado, setRolSeleccionado] = useState<any>();
  const [showModalExito, setShowModalExito] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [showModalRestauracion, setShowModalRestauracion] = useState(false);

  const navigate = useNavigate();

  const fetchRoles = () => {
    baseAPI.get("/roles", {
      auth: { username: "admin", password: "admin123" }
    })
    .then(res => setRoles(res.data))
    .catch(err => console.error("Error cargando roles", err));
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleSelectAll = () => setSelectAll(!selectAll);

  const handleEliminarRol = () => {
    baseAPI.delete(`/roles/${rolSeleccionado.id}`)
      .then(() => {
        setShowModalExito(true);
        setShowModalError(false);
      })
      .catch(() => console.log("Error eliminando rol"));
  };

  const handleRestaurarRol = () => {
    baseAPI.put(`/roles/${rolSeleccionado.id}/restaurar`)
      .then(() => {
        setShowModalRestauracion(true);
        setShowModalError(false);
      })
      .catch(() => console.log("Error restaurando rol"));
  };

  const columns = [
    { label: <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />, className: "w-10" },
    { label: "ID", className: "w-16" },
    { label: "Nombre", className: "w-1/4 text-left" },
    { label: "Usuarios asignados", className: "w-1/4 text-left" },
    { label: "Fecha de creación", className: "w-1/4 text-left" },
    { label: "Acciones", className: "w-24 text-center" }
  ];

  const rows = roles.map((rol: any) => [
    { content: <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />, className: "w-10" },
    { content: rol.id, className: "w-16" },
    { content: rol.nombre, className: "w-1/4 text-left" },
    { content: rol.usuariosAsignados || 0, className: "w-1/4 text-left" },
    { content: rol.fechaCreacion || "-", className: "w-1/4 text-left" },
    {
      content: (
        <div className="flex justify-center gap-2">
          <Info className="w-5 h-5 text-[#2A86FF] cursor-pointer" onClick={() => navigate(`/admin/roles/detalle/${rol.id}`)} />
          <Pencil className="w-5 h-5 text-[#2A86FF] cursor-pointer" onClick={() => navigate(`/admin/roles/editar/${rol.id}`)} />
          {rol.activo ? 
            <Trash2 className="w-5 h-5 text-[#2A86FF] cursor-pointer" onClick={() => { setRolSeleccionado(rol); setShowModalError(true); }} /> :
            <RotateCcw className="w-5 h-5 text-[#2A86FF] cursor-pointer" onClick={() => { setRolSeleccionado(rol); handleRestaurarRol(); }} />
          }
        </div>
      ),
      className: "w-24 text-center"
    }
  ]);

  return (
    <div className="w-full px-6 py-4 overflow-auto">
      <div className="grid grid-cols-12 gap-4 items-center mb-4">
        <div className="col-span-4">
          <InputIcon icon={<Search className="w-5 h-5" />} placeholder="Buscar rol" type="search" />
        </div>
        <div className="col-span-8 flex justify-end">
          <ButtonIcon icon={<UserPlus className="w-6 h-6" />} size="lg" variant="primary" onClick={() => navigate("/admin/roles/crear")}>Agregar rol</ButtonIcon>
        </div>
      </div>

      <div className="p-2">
        <table className="border-separate border-spacing-y-2 w-full">
          <TableHeader columns={columns} />
          <TableBody rows={rows} />
        </table>
      </div>

      {showModalError && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40" />
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <ModalError 
              modulo="Rol" 
              detalle={rolSeleccionado?.nombre}
              onConfirm={() => handleEliminarRol()} 
              onCancel={() => setShowModalError(false)} />
          </div>
        </>
      )}

      {showModalExito && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40" />
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <ModalExito 
              modulo="Rol" 
              detalle="El rol fue procesado correctamente"
              onConfirm={() => {
                setShowModalExito(false);
                fetchRoles();
              }}
            />
          </div>
        </>
      )}

      {showModalRestauracion && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40" />
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <ModalRestauracion
              modulo="Rol"
              detalle="El rol fue activado nuevamente correctamente"
              onConfirm={() => {
                setShowModalRestauracion(false);
                fetchRoles();
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default RolesPage;