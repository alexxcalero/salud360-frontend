import React, { useState } from "react";
import { Search, Filter, UserPlus, Info, Pencil, Trash2 } from "lucide-react";

import InputIcon from "@/components/InputIcon";
import ButtonIcon from "@/components/ButtonIcon";
import TableHeader from "@/components/admin/TableHeader";
import TableBody from "@/components/admin/TableBody";

function ServiciosPage() {
  const [selectAll, setSelectAll] = useState(false);
  const handleSelectAll = () => setSelectAll(!selectAll);

  const servicios = [
    {
      id: "001",
      nombre: "Gimnasio",
      descripcion: "Rutinas con pesas y máquinas de musculación",
      tipo: "Deporte",
      estado: "Activo",
    },
    {
      id: "002",
      nombre: "Yoga",
      descripcion: "Sesiones enfocadas en estiramiento y respiración consciente",
      tipo: "Deporte",
      estado: "Activo",
    },
    {
      id: "003",
      nombre: "Consultas médicas",
      descripcion: "Atención médica general y especializada mediante citas virtuales",
      tipo: "Salud",
      estado: "Activo",
    },
  ];

  const columns = [
    { label: <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />, className: "w-10" },
    { label: "ID", className: "w-16" },
    { label: "Nombre", className: "w-1/6" },
    { label: "Descripción", className: "w-1/3" },
    { label: "Tipo", className: "w-1/6" },
    { label: "Status", className: "w-1/6" },
    { label: "Acciones", className: "w-24 text-center" },
  ];

  const rows = servicios.map((servicio) => [
    {
      content: <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />,
      className: "w-10",
    },
    { content: servicio.id, className: "w-16" },
    { content: servicio.nombre, className: "w-1/6" },
    { content: servicio.descripcion, className: "w-1/3" },
    {
      content: (
        <span className="text-xs font-medium text-blue-500">{servicio.tipo}</span>
      ),
      className: "w-1/6",
    },
    {
      content: (
        <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
          {servicio.estado}
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
      {/* Filtros */}
      <div className="grid grid-cols-12 gap-4 items-center mb-4">
        <div className="col-span-4">
          <InputIcon
            icon={<Search className="w-5 h-5" />}
            placeholder="Buscar monos"
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
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            Aplicando 5 filtro(s)
          </span>
        </div>

        <div className="col-span-2 flex justify-end">
          <ButtonIcon icon={<UserPlus className="w-6 h-6" />} size="lg" variant="primary">
            Agregar servicio
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

export default ServiciosPage;
