//esto es por ahora pq creo q todav no hay carpeta
import {Badge,UserCog ,Filter,UserPlus,Bell, User, LayoutDashboard, Settings, ShieldCheck, Users, Star, MapPin, ClipboardList, BookOpen, ClipboardCheck, BarChart3, Pencil, Trash2, Search } from "lucide-react";

import LogoMono from "../assets/LogoMono.jpg";

function RegistrarComunidad() {
    const comunidades = [
        {
            id: 801,
            nombre: "Kilometros en Proposito",
            descripcion: "Comunidad para prueba en comunidad",
            proposito: "Comunidad con el proposito de ...",
            idCreador: 2321,
            status: "Activo",
        },
        {
            id: 807,
            nombre: "Mamis en Movimiento",
            descripcion: "Comunidad para prueba en comunidad",
            proposito: "Comunidad con el proposito de ...",
            idCreador: 2395,
            status: "Activo",
        },
        {
            id: 809,
            nombre: "Sabiduria en Acción",
            descripcion: "Comunidad para prueba en comunidad",
            proposito: "Comunidad con el proposito de ...",
            idCreador: 2111,
            status: "Inactivo",
        },
    ];

    //para la barra de la izquierda
    const SidebarItem = ({
        icon,
        label,
        active = false,
    }: {
        icon: React.ReactNode;
        label: string;
        active?: boolean;
    }) => {
        return (
            <div
                className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-blue-400 ${active ? "bg-white text-blue-600 font-semibold rounded-r-full rounded-l-full pl-3 pr-6 -mr-8" : "text-white"
                    }`}
            >
                {icon}
                <span className="truncate">{label}</span>
            </div>
        );
    };


    return (
        <div className="flex h-screen font-sans text-gray-800">
            {/* Sidebar */}
            <aside className="w-64 fixed top-0 left-0 h-screen bg-blue-500 text-white flex flex-col overflow-y-auto overflow-x-hidden">

                {/* Cabecera */}
                <div className="flex items-center justify-between px-4 py-4 border-b border-blue-400">
                    <div className="flex items-center gap-2">
                        <img src={LogoMono} alt="avatar" className="w-10 h-10 rounded-full" />
                        <div className="text-sm font-bold leading-tight">
                            <span className="block">MonoSupremo</span>
                        </div>
                    </div>
                    <div className="flex gap-2 items-start">
                        <div className="relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute -top-1 -right-1 text-[10px] bg-red-500 px-1 rounded-full">+1</span>
                        </div>
                        <User className="w-5 h-5" />
                    </div>
                </div>

                {/* Menú */}
                <nav className="flex-1 px-4 py-4 space-y-2 text-sm">
                    <SidebarItem icon={<LayoutDashboard className="w-4 h-4" />} label="Dashboard" />
                    <SidebarItem icon={<Settings className="w-4 h-4" />} label="Configuración general" />
                    <SidebarItem icon={<UserCog  className="w-4 h-4" />} label="Roles y permisos" />
                    <SidebarItem icon={<Badge  className="w-4 h-4" />} label="Membresias" />
                    <SidebarItem icon={<Star className="w-4 h-4" />} label="Comunidades" active />
                    <SidebarItem icon={<MapPin className="w-4 h-4" />} label="Servicios" />
                    <SidebarItem icon={<ClipboardList className="w-4 h-4" />} label="Locales" />
                    <SidebarItem icon={<Users className="w-4 h-4" />} label="Usuarios" />
                    <SidebarItem icon={<User className="w-4 h-4" />} label="Personal Médico" />
                    <SidebarItem icon={<BookOpen className="w-4 h-4" />} label="Calificaciones" />
                    <SidebarItem icon={<ClipboardCheck className="w-4 h-4" />} label="Logs" />
                    <SidebarItem icon={<ShieldCheck  className="w-4 h-4" />} label="Auditorías" />
                    <SidebarItem icon={<BarChart3 className="w-4 h-4" />} label="Reports" />
                </nav>
            </aside>


            {/* Main Content */}
            <main className="ml-45 flex-1 px-8 py-0 overflow-auto">
                {/* Header de búsqueda y botones arriba */}
                <div className="w-full flex items-center justify-between flex-wrap gap-4 mb-6">
                    {/* 🔍 Agrupación: buscador + filtros */}
                    <div className="flex gap-2 items-center flex-wrap">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Buscar Comunidad"
                                className="pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm outline-none w-64"
                            />
                            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                        </div>

                        <button className="flex items-center gap-2 bg-blue-500 text-white px-5 py-2 rounded-full hover:bg-blue-600 text-sm">
                            <Search className="w-4 h-4" />
                            Buscar
                        </button>
                        <button className="flex items-center gap-2 bg-blue-500 text-white px-5 py-2 rounded-full hover:bg-blue-600 text-sm">
                            <Filter className="w-4 h-4" />
                            Aplicar filtros
                        </button>
                    </div>

                    {/* ➕ Botón alineado a la derecha */}
                    <div>
                        <button className="flex items-center gap-2 bg-blue-500 text-white px-5 py-2 rounded-full hover:bg-blue-600 text-sm">
                            <UserPlus className="w-4 h-4" />
                            Agregar Comunidad
                        </button>
                    </div>
                </div>



                {/* Tabla */}
                <div className="overflow-x-auto w-full">
                    <table className="min-w-full bg-white rounded shadow">
                        <thead className="bg-blue-500 text-left text-white text-[10px]">
                            <tr className="whitespace-nowrap">
                                <th className="px-4 py-2 text-left">ID</th>
                                <th className="px-20 py-2 text-left">Nombre</th>
                                <th className="px-25 py-2 text-left">Descripción</th>
                                <th className="px-20 py-2 text-left">Propósito</th>
                                <th className="px-4 py-2 text-left">Id Creador</th>
                                <th className="px-4 py-2 text-left">Status</th>
                                <th className="px-4 py-2 text-left">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comunidades.map((comunidad) => (
                                <tr
                                    key={comunidad.id}
                                    className="border-t text-sm hover:bg-gray-50 text-[10px]"
                                >
                                    <td className="px-4 py-2 text-left">{comunidad.id}</td>
                                    <td className="px-4 py-2 text-left">{comunidad.nombre}</td>
                                    <td className="px-4 py-2 text-left">{comunidad.descripcion}</td>
                                    <td className="px-4 py-2 text-left">{comunidad.proposito}</td>
                                    <td className="px-4 py-2 text-left">{comunidad.idCreador}</td>
                                    <td className="px-4 py-2 text-left">
                                        <span
                                            className={`px-2 py-1 rounded text-xs font-medium ${comunidad.status === "Activo"
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-red-200 text-red-700"
                                                }`}
                                        >
                                            {comunidad.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2 space-x-2 flex items-center">
                                        <button title="Editar">
                                            <Pencil className="w-4 h-4 text-blue-500 hover:text-blue-700" />
                                        </button>
                                        <button title="Eliminar">
                                            <Trash2 className="w-4 h-4 text-gray-500 hover:text-red-600" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );

}

export default RegistrarComunidad;