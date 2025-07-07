import TableBody from "@/components/admin/TableBody";
import TableHeader from "@/components/admin/TableHeader";
//import ButtonIcon from "@/components/ButtonIcon";
import InputIcon from "@/components/InputIcon";
import ModalError from "@/components/ModalError";
import ModalExito from "@/components/ModalExito";
import StarRating from "@/components/StarRating";
import UnderConstruction from "@/pages/UnderConstruction";
import { baseAPI } from "@/services/baseAPI";
import { Info, Pencil, RotateCcw, Search, Trash2, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

interface Testimonio {
  idTestimonio: number;
  comentario: string;
  cliente: {
    nombres: string;
    apellidos: string;
  };
  calificacion: number;
  fechaCreacion: string;
  activo: boolean;
}

function CalificacionesPage() {

    const [selectAll, setSelectAll] = useState(false);
    const [testimonios, setTestimonions] = useState<Testimonio[]>([]);
    const [testimonioSeleccionado, setTestimonioSeleccionado] = useState<any>();
    const [showModalExito, setShowModalExito] = useState(false);
    const [showModalError, setShowModalError] = useState(false);
    //const [search, setSearch] = useState("");
    const [paginaActual, setPaginaActual] = useState(1);

    //Para la funcionalidad de búsqueda:
    const [busqueda, setBusqueda] = useState("");

    const fetchUsuarios = () => {
        baseAPI.get("/testimonios", {
            auth: {
                username: "admin",
                password: "admin123"
            }
        })
            .then(res => {
                //console.log("Datos cargados:", res.data); // VER ESTO EN LA CONSOLA
                setTestimonions(res.data);
                //console.log("Testimonios:", res.data);
            })
            .catch(err => console.error("Error cargando testimonios", err));
    }

    useEffect(() => {
        fetchUsuarios(); //hago esto para que al eliminar un testimonio y darle a "volver" se actualice todo automaticamente
    }, []);

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
    };

    const formatFechaHora = (isoString: string) => {
        const fecha = new Date(isoString);
        return new Intl.DateTimeFormat("es-PE", {
        dateStyle: "short",
        timeStyle: "short",
        }).format(fecha);
    };

    const handleEliminarTestimonio = (): void => {
        //console.log("El id del testimonio a eliminar es:", testimonioSeleccionado)
        baseAPI.delete(`/testimonios/${testimonioSeleccionado.idTestimonio}`)
        .then(() => {
        setShowModalExito(true);
        setShowModalError(false)
        })
        .catch(() => console.log("Error"));
    }

    const handleReactivarTestimonio = (): void => {
        //console.log("El id del usuario a reactivar es:", testimonioSeleccionado.idTestimonio)
        baseAPI.put(`/testimonios/reactivar/${testimonioSeleccionado.idTestimonio}`)
        .then(() => {
        setShowModalExito(true);
        setShowModalError(false)
        })
        .catch(() => console.log("Error"));
    }

    const columns = [
        { label: <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />, className: "w-10" },
        { label: "ID Testimonio", className: "w-16" },
        { label: "Autor", className: "w-1/4 text-left" },
        { label: "Comentario", className: "w-1/3 text-left" },
        { label: "Calificación", className: "w-1/6 text-left" },
        { label: "Fecha de Creación", className: "w-1/6 text-left" },
        { label: "Status", className: "w-1/6 text-left" },
        { label: "Actions", className: "w-24 text-center" },
    ];

    const testimoniosFiltrados = testimonios
        .filter(usu => usu.comentario.toLowerCase().includes(busqueda.toLowerCase()));

    const testimoniosOrdenados = testimoniosFiltrados.slice()
        .sort((a, b) => a.idTestimonio - b.idTestimonio);

    const registrosPorPagina = 10;
    const totalPaginas = Math.ceil(testimoniosOrdenados.length / registrosPorPagina);

    const testimoniosPaginados = testimoniosOrdenados.slice(
        (paginaActual - 1) * registrosPorPagina, paginaActual * registrosPorPagina);


        //console.log("Los testimonios paginados son:", testimoniosPaginados)

    testimoniosPaginados.map((testimonio: any) => {
        //console.log("EL ID DEL TESTIMONI0:", testimonio.idTestimonio)
        //console.log("testimonio.cliente es:", testimonio.cliente)
        //console.log("testimonio.cliente.nombres es:", testimonio.cliente.nombres)
        //console.log("testimonio.cliente.apellidos es:", testimonio.cliente.apellidos)
    })    

    const rows = testimoniosPaginados
        .map((testimonio: any) => [
            {
                content: <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />,
                className: "w-10",
            },
            { content: testimonio.idTestimonio, className: "w-16" },
            { content: `${testimonio.cliente.nombres} ${testimonio.cliente.apellidos}`, className: "w-1/4 text-left" },
            { content: testimonio.comentario, className: "w-1/3 text-left" },
            {
                content: <StarRating rating={testimonio.calificacion} />,
                className: "w-1/6 text-left"
            },
            { content: formatFechaHora(testimonio.fechaCreacion), className: "w-1/6 text-left" },
            {
            content: (
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                testimonio.activo ? "bg-green-600 text-green-50" : "bg-red-600 text-red-50"
                }`}>
                {testimonio.activo ? "Activo" : "Inactivo"}
                </span>
            ),
            className: "w-1/6 text-left",
            },
        
            {
                content: (
                    <div className="flex justify-center gap-2">
                        <Info className="w-5 h-5 text-[#2A86FF] cursor-pointer" onClick={() => navigate(`/admin/testimonios/detalle/${testimonio.idTestimonio}`)} />
                        {testimonio.activo ?
                            <Trash2 className="w-5 h-5 text-[#2A86FF] cursor-pointer" onClick={() => {
                                setTestimonioSeleccionado(testimonio);
                                setShowModalError(true);
                            }} />
                            :
                            <RotateCcw className="w-5 h-5 text-[#2A86FF] cursor-pointer" onClick={() => {
                                setTestimonioSeleccionado(testimonio);
                                setShowModalError(true);
                            }} />
                        }
                    </div>
                ),
                className: "w-24 text-center",
            },
        ]);

    const navigate = useNavigate();


    return (
        <div className="w-full px-6 py-4 overflow-auto">
            <title>Testimonios</title>
            <div className="grid grid-cols-12 gap-4 items-center mb-4">
                <div className="col-span-4">
                   <InputIcon
                    icon={<Search className="w-5 h-5" />}
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    placeholder="Buscar testimonios"
                    type="search"
                    />
                </div>
            </div>

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

            {testimonioSeleccionado && (testimonioSeleccionado.activo ?
                <>
                    {showModalError && (
                        <>
                            <div className="fixed inset-0 bg-black/60 z-40" />
                            <div className="fixed inset-0 z-50 flex items-center justify-center">
                                <ModalError modulo="¿Estás seguro de que quieres eliminarlo?" detalle={`ID Testimonio: ${testimonioSeleccionado?.idTestimonio}`} onConfirm={() => {
                                    handleEliminarTestimonio();

                                }} onCancel={() => setShowModalError(false)} />
                            </div>
                        </>
                    )}
                    {showModalExito && (
                        <>
                            <div className="fixed inset-0 bg-black/60 z-40" />
                            <div className="fixed inset-0 z-50 flex items-center justify-center">
                                <ModalExito modulo="¡Testimonio eliminado correctamente!" detalle="El testimonio fue eliminado correctamente" onConfirm={() => {
                                    setShowModalExito(false);
                                    fetchUsuarios();
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
                                <ModalError modulo="¿Estás seguro de que quieres reactivarlo?" detalle={`ID Testimonio: ${testimonioSeleccionado?.idTestimonio}`} buttonConfirm="Reactivar" onConfirm={() => {
                                    handleReactivarTestimonio();
                                }} onCancel={() => setShowModalError(false)} />
                            </div>
                        </>
                    )}

                    {showModalExito && (
                        <>
                            <div className="fixed inset-0 bg-black/60 z-40" />
                            <div className="fixed inset-0 z-50 flex items-center justify-center">
                                <ModalExito modulo="¡Testimonio reactivado correctamente!" detalle="El testimonio fue reactivado correctamente" onConfirm={() => {
                                    setShowModalExito(false);
                                    fetchUsuarios();
                                }} />
                            </div>
                        </>
                    )}
                </>

            )}


            {/*XDDDDDD */}
            {/** 
      {showModalError && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40" />
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <ModalError modulo="Usuario" detalle={`${testimonioSeleccionado?.nombres} ${testimonioSeleccionado.apellidos}`} onConfirm={() => {
              handleEliminarTestimonio();
              
            }} onCancel={() => setShowModalError(false)}/>
          </div>
        </>
      )}

      {showModalExito && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40" />
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <ModalExito modulo="¡Usuario eliminado correctamente!" detalle="El testimonio fue eliminado correctamente" onConfirm={() => {
              setShowModalExito(false);
              fetchUsuarios();
            }}/>
          </div>
        </>
      )}
      */}



        </div>
    );
}

export default CalificacionesPage;