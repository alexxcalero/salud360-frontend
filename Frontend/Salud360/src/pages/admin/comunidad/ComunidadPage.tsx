import  { useState } from "react";
import { Filter, UserPlus, Pencil, Trash2, Info, Search } from "lucide-react";

import InputIcon from "@/components/InputIcon";
import ButtonIcon from "@/components/ButtonIcon";
import TableHeader from "@/components/admin/TableHeader";
import TableBody from "@/components/admin/TableBody";

function ComunidadPage() {
  const [selectAll, setSelectAll] = useState(false);
  const handleSelectAll = () => setSelectAll(!selectAll);

  const comunidades = [
    {
      id: "801",
      nombre: "Kilómetros en Propósito",
      descripcion: "Comunidad para prueba en comunidad",
      proposito: "Comunidad con el propósito de ...",
      idCreador: "2321",
      status: "Activo",
    },
    {
      id: "807",
      nombre: "Mamis en Movimiento",
      descripcion: "Comunidad para prueba en comunidad",
      proposito: "Comunidad con el propósito de ...",
      idCreador: "2395",
      status: "Activo",
    },
    {
      id: "809",
      nombre: "Sabiduría en Acción",
      descripcion: "Comunidad para prueba en comunidad",
      proposito: "Comunidad con el propósito de ...",
      idCreador: "2111",
      status: "Inactivo",
    },
  ];

  const columns = [
    { label: <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />, className: "w-10" },
    { label: "ID", className: "w-16" },
    { label: "Nombre", className: "w-1/6" },
    { label: "Descripción", className: "w-1/4" },
    { label: "Propósito", className: "w-1/4" },
    { label: "Id Creador", className: "w-20" },
    { label: "Status", className: "w-1/6" },
    { label: "Acciones", className: "w-24 text-center" },
  ];

  const rows = comunidades.map((comunidad) => [
    {
      content: <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />,
      className: "w-10",
    },
    { content: comunidad.id, className: "w-16" },
    { content: comunidad.nombre, className: "w-1/6 " },
    { content: comunidad.descripcion, className: "w-1/4" },
    { content: comunidad.proposito, className: "w-1/4" },
    { content: comunidad.idCreador, className: "w-20" },
    {
      content: (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            comunidad.status === "Activo"
              ? "bg-green-100 text-green-800"
              : "bg-red-200 text-red-700"
          }`}
        >
          {comunidad.status}
        </span>
      ),
      className: "w-1/6",
    },
    {
      content: (
        <div className="flex justify-center gap-2">
          <Info className="w-4 h-4 text-[#2A86FF] cursor-pointer" />
          <Pencil className="w-4 h-4 text-[#2A86FF] cursor-pointer" />
          <Trash2 className="w-4 h-4 text-[#2A86FF] cursor-pointer" />
        </div>
      ),
      className: "w-24 text-center",
    },
  ]);

  return (
    <div className="w-full px-6 py-4 overflow-auto">
      {/* Filtros y acciones */}
      <div className="grid grid-cols-12 gap-4 items-center mb-4">
        <div className="col-span-4">
          <InputIcon
            icon={<Search className="w-5 h-5" />}
            placeholder="Buscar comunidad"
            type="search"
          />
        </div>

        <div className="col-span-6 flex gap-2">
          <ButtonIcon icon={<Search className="w-6 h-6" />} size="lg" variant="primary">
            Buscar
          </ButtonIcon>
          <ButtonIcon icon={<Filter className="w-6 h-6" />} size="lg" variant="primary">
            Aplicar filtros
          </ButtonIcon>
        </div>

        <div className="col-span-2 flex justify-end">
          <ButtonIcon icon={<UserPlus className="w-6 h-6" />} size="lg" variant="primary">
            Agregar comunidad
          </ButtonIcon>
        </div>
      </div>

      {/* Tabla */}
      <div className="p-2">
        <table className="border-separate border-spacing-y-2 w-full">
          <TableHeader columns={columns} />
          <TableBody rows={rows} />
        </table>
      </div>
    </div>
  );
}

export default ComunidadPage;
