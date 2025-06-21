import TableBody from "@/components/admin/TableBody";
import TableHeader from "@/components/admin/TableHeader";
import ButtonIcon from "@/components/ButtonIcon";
import InputIcon from "@/components/InputIcon";
import ModalError from "@/components/ModalError";
import ModalExito from "@/components/ModalExito";
import UnderConstruction from "@/pages/UnderConstruction";
import { baseAPI } from "@/services/baseAPI";
import { Filter, FolderPlus, Info, Pencil, RotateCcw, Search, Trash2, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

interface Local {
  idLocal: number;
  nombre: string;
  descripcion: string;
  tipoServicio: string;
  telefono: string;
  direccion: string;
  activo: boolean;
}

function LocalesPage() {
    const [selectAll, setSelectAll] = useState(false);
    const [locales, setLocales] = useState<Local[]>([]);
    const [localSeleccionado, setLocalSeleccionado] = useState<any>();
    const [showModalExito, setShowModalExito] = useState(false);
    const [showModalError, setShowModalError] = useState(false);
    //const [search, setSearch] = useState("");
    const [paginaActual, setPaginaActual] = useState(1);

    //Para la funcionalidad de búsqueda:
    const [busqueda, setBusqueda] = useState("");

    const fetchLocales = () => {
        baseAPI.get("/locales/admin", {
            auth: {
                username: "admin",
                password: "admin123"
            }
        })
            .then(res => {
                console.log("Datos cargados:", res.data); // VER ESTO EN LA CONSOLA
                setLocales(res.data);
                console.log("Locales:", res.data);
            })
            .catch(err => console.error("Error cargando locales", err));
    }

    useEffect(() => {
        fetchLocales(); //hago esto para que al eliminar un local y darle a "volver" se actualice todo automaticamente
    }, []);

    const navigate = useNavigate();

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
    };

    const handleEliminarLocal = (): void => {
        //console.log("El id del local a eliminar es:", localSeleccionado.idLocal)
        baseAPI.delete(`/locales/${localSeleccionado.idLocal}`)
            .then(() => {
                setShowModalExito(true);
                setShowModalError(false)
            })
            .catch(() => console.log("Error"));
    }

    const handleReactivarLocal = (): void => {
        console.log("El id del local a reactivar es:", localSeleccionado.idLocal)
        baseAPI.put(`/locales/${localSeleccionado.idLocal}/reactivar`)
            .then(() => {
                setShowModalExito(true);
                setShowModalError(false)
            })
            .catch(() => console.log("Error"));
    }

    const columns = [
    { label: <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />, className: "w-10" },         // checkbox
    { label: "ID", className: "w-14" },                                                                            // ID
    { label: "Nombre", className: "w-1/5 text-left" },                                                              // nombre ↑
    { label: "Descripción", className: "w-1/4 text-left" },                                                         // descripción ↑
    { label: "Tipo Servicio", className: "w-1/6" },                                                                 // tipo_servicio
    { label: "Teléfono", className: "w-1/6" },                                                                      // teléfono
    { label: "Dirección", className: "w-1/4 text-left" },                                                           // dirección ↑
    { label: "Status", className: "w-1/6" },                                                                        // activo
    { label: "Actions", className: "w-24 text-center" },                                                            // acciones
    ];

    const localesFiltrados = locales
    .filter(loc => loc.nombre.toLowerCase().includes(busqueda.toLowerCase()));

    const localesOrdenados = localesFiltrados.slice()
    .sort(  (a, b) => a.idLocal - b.idLocal);

    const registrosPorPagina = 10;
    const totalPaginas = Math.ceil(localesOrdenados.length / registrosPorPagina);

    const localesPaginados = localesOrdenados.slice(
    (paginaActual - 1) * registrosPorPagina, paginaActual * registrosPorPagina);

    const rows = localesPaginados
    .map((local: any) => [
    {
        content: <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />,
        className: "w-10",
    },
    { content: local.idLocal, className: "w-14" },
    { content: local.nombre, className: "w-1/5 text-left" },
    { content: local.descripcion, className: "w-1/4 text-left" },
    {
        content: <span className="text-xs font-medium text-blue-500">{local.tipoServicio}</span>,
        className: "w-1/6",
    },
    {
        content: <span className="text-sm">{local.telefono}</span>,
        className: "w-1/6",
    },
    {
        content: <span className="text-sm text-wrap">{local.direccion}</span>,
        className: "w-1/4 text-left",
    },
    {
        content: (
        <span
            className={`px-2 py-1 rounded text-xs font-medium 
            ${local.activo ? "bg-green-600 text-green-50" : "bg-red-600 text-red-50"}`}
        >
            {local.activo ? "Activo" : "Inactivo"}
        </span>
        ),
        className: "w-1/6",
    },
    {
        content: (
        <div className="flex justify-center gap-2">
            <Info className="w-5 h-5 text-[#2A86FF] cursor-pointer" onClick={() => navigate(`/admin/locales/detalle/${local.idLocal}`)} />
            <Pencil className="w-5 h-5 text-[#2A86FF] cursor-pointer" onClick={() => navigate(`/admin/locales/editar/${local.idLocal}`)} />
            {local.activo ? (
            <Trash2 className="w-5 h-5 text-[#2A86FF] cursor-pointer" onClick={() => {
                setLocalSeleccionado(local);
                setShowModalError(true);
            }} />
            ) : (
            <RotateCcw className="w-5 h-5 text-[#2A86FF] cursor-pointer" onClick={() => {
                setLocalSeleccionado(local);
                setShowModalError(true);
            }} />
            )}
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
                        placeholder="Buscar locales"
                        type="search" value={busqueda} onChange={(e) => setBusqueda(e.target.value)}
                    />
                </div>

                <div className="col-span-8 flex justify-end">
                    <ButtonIcon icon={<FolderPlus className="w-6 h-6" />} size="lg" variant="primary" onClick={() => navigate("/admin/locales/crear")}>Agregar local</ButtonIcon>
                </div>
            </div>

            {/* Tabla */}
            <div className="p-2">
                <table className="border-separate border-spacing-y-2 w-full">
                    <TableHeader columns={columns} />
                    <TableBody rows={rows} />
                </table>
            </div>
            {/* Paginación */}
            <div className="flex justify-center items-center gap-4 mt-4">
                <button
                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                onClick={() => setPaginaActual((p) => Math.max(1, p - 1))}
                disabled={paginaActual === 1}
                >
                Anterior
                </button>

                <span className="text-sm">Página {paginaActual} de {totalPaginas}</span>

                <button
                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                onClick={() => setPaginaActual((p) => Math.min(totalPaginas, p + 1))}
                disabled={paginaActual === totalPaginas}
                >
                Siguiente
                </button>
            </div>


            {localSeleccionado && (localSeleccionado.activo ?
                <>
                    {showModalError && (
                        <>
                            <div className="fixed inset-0 bg-black/60 z-40" />
                            <div className="fixed inset-0 z-50 flex items-center justify-center">
                                <ModalError modulo="¿Estás seguro de que quieres eliminarlo?" detalle={`Local: ${localSeleccionado?.nombre}`} onConfirm={() => {
                                    handleEliminarLocal();

                                }} onCancel={() => setShowModalError(false)} />
                            </div>
                        </>
                    )}
                    {showModalExito && (
                        <>
                            <div className="fixed inset-0 bg-black/60 z-40" />
                            <div className="fixed inset-0 z-50 flex items-center justify-center">
                                <ModalExito modulo="¡Servicio eliminado correctamente!" detalle="El local fue eliminado correctamente" onConfirm={() => {
                                    setShowModalExito(false);
                                    fetchLocales();
                                }} />
                            </div>
                        </>
                    )}
                </>
                :
                <>
                    {showModalError && (
                        <>
                            <div className="fixed inset-0 bg-black/60 z-40" />
                            <div className="fixed inset-0 z-50 flex items-center justify-center">
                                <ModalError modulo="¿Estás seguro de que quieres reactivarlo?" detalle={`Local: ${localSeleccionado?.nombre}`} buttonConfirm="Reactivar" onConfirm={() => {
                                    handleReactivarLocal();
                                }} onCancel={() => setShowModalError(false)} />
                            </div>
                        </>
                    )}

                    {showModalExito && (
                        <>
                            <div className="fixed inset-0 bg-black/60 z-40" />
                            <div className="fixed inset-0 z-50 flex items-center justify-center">
                                <ModalExito modulo="¡Servicio reactivado correctamente!" detalle="El local fue reactivado correctamente" onConfirm={() => {
                                    setShowModalExito(false);
                                    fetchLocales();
                                }} />
                            </div>
                        </>
                    )}
                </>

            )}


        </div>
    );
}

export default LocalesPage;