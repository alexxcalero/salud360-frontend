import { useEffect, useState } from "react";
import { Search,  Info, Pencil, Trash2, RotateCcw, FolderPlus } from "lucide-react";
import { useNavigate } from "react-router";

import InputIcon from "@/components/InputIcon";
import ButtonIcon from "@/components/ButtonIcon";
import TableHeader from "@/components/admin/TableHeader";
import TableBody from "@/components/admin/TableBody";
import axios from "axios";
import ModalError from "@/components/ModalError";
import ModalExito from "@/components/ModalExito";

export interface Servicio {
  idServicio: number;
  nombre: string;
  descripcion: string;
  tipo: string;
  activo: boolean;
}

function ServiciosPage() {
  const [selectAll, setSelectAll] = useState(false);
  const [servicios, setServicios] = useState<Servicio[]>([]);

  const [servicioSeleccionado, setServicioSeleccionado] = useState<any>();
  const [showModalExito, setShowModalExito] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  //const [search, setSearch] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);

  const fetchServicios = () => {
    axios.get("http://localhost:8080/api/servicios", {
      auth: {
        username: "admin",
        password: "admin123"
      }
    })
      .then(res => {
        console.log("Datos cargados:", res.data); // VER ESTO EN LA CONSOLA
        setServicios(res.data);
        console.log("Servicios:", res.data);
      })
      .catch(err => console.error("Error cargando servicios", err));
  }

  useEffect(() => {
    fetchServicios(); //hago esto para que al eliminar un servicio y darle a "volver" se actualice todo automaticamente
  }, []);

  const navigate = useNavigate();

  //Para la funcionalidad de búsqueda:
  const [busqueda, setBusqueda] = useState("");

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
  };

  const handleEliminarServicio = (): void => {
    //console.log("El id del servicio a eliminar es:", servicioSeleccionado.idServicio)
    axios.delete(`http://localhost:8080/api/servicios/${servicioSeleccionado.idServicio}`)
    .then(() => {
      setShowModalExito(true);
      setShowModalError(false)
    })
    .catch(() => console.log("Error"));
  }

  const handleReactivarServicio = (): void => {
    console.log("El id del servicio a reactivar es:", servicioSeleccionado.idServicio)
    axios.put(`http://localhost:8080/api/servicios/${servicioSeleccionado.idServicio}/reactivar`)
    .then(() => {
      setShowModalExito(true);
      setShowModalError(false)
    })
    .catch(() => console.log("Error"));
  }

  const columns = [
    { label: <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />, className: "w-10" },
    { label: "ID", className: "w-16" },
    { label: "Nombre", className: "w-1/4 text-left" },         // aumenta un poco
    { label: "Descripción", className: "w-1/3 text-left" },    // se mantiene
    { label: "Tipo", className: "w-1/6" },
    { label: "Status", className: "w-1/6" },
    { label: "Actions", className: "w-24" },
  ];
  
  const serviciosFiltrados = servicios
  .filter(ser => ser.nombre.toLowerCase().includes(busqueda.toLowerCase()));

  const serviciosOrdenados = serviciosFiltrados.slice()
  .sort(  (a, b) => a.idServicio - b.idServicio);

  const registrosPorPagina = 10;
  const totalPaginas = Math.ceil(serviciosOrdenados.length / registrosPorPagina);

  const serviciosPaginados = serviciosOrdenados.slice(
  (paginaActual - 1) * registrosPorPagina, paginaActual * registrosPorPagina);

  const rows = serviciosPaginados
  .map((servicio: any) => [
    {
      content: <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />,
      className: "w-10",
    },
    { content: servicio.idServicio, className: "w-16 " },
    { content: servicio.nombre, className: "w-1/4 text-left" },
    { content: servicio.descripcion, className: "w-1/3 text-left" },
    {
      content: (
        <span className="text-xs font-medium text-blue-500">{servicio.tipo}</span>
      ),
      className: "w-1/6",
    },
    {
      content: (
        <span
          className={`px-2 py-1 rounded text-xs font-medium 
            ${servicio.activo  
              ? "bg-green-600 text-green-50" : "bg-red-600 text-red-50"}`}
        >
          {servicio.activo ? "Activo" : "Inactivo"}
        </span>
      ),
      className: "w-1/6",
    },
    {
      content: (
        <div className="flex justify-center gap-2">
          <Info className="w-5 h-5 text-[#2A86FF] cursor-pointer" onClick={() => navigate(`/admin/servicios/detalle/${servicio.idServicio}`)}/>
          <Pencil className="w-5 h-5 text-[#2A86FF] cursor-pointer" onClick={() => navigate(`/admin/servicios/editar/${servicio.idServicio}`)}/>
          {servicio.activo ? 
            <Trash2 className="w-5 h-5 text-[#2A86FF] cursor-pointer" onClick={() => {
              setServicioSeleccionado(servicio);
              setShowModalError(true);
            }}/>
            :
            <RotateCcw className= "w-5 h-5 text-[#2A86FF] cursor-pointer" onClick={() => {
              setServicioSeleccionado(servicio);
              setShowModalError(true);
            }}/>
        }
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
            placeholder="Buscar servicios"
            type="search" value={busqueda} onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        <div className="col-span-8 flex justify-end">
          <ButtonIcon icon={<FolderPlus className="w-6 h-6" />} size="lg" variant="primary" onClick={() => navigate("/admin/servicios/crear")}>Agregar servicio</ButtonIcon>
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



      { servicioSeleccionado && (servicioSeleccionado.activo ?
        <>
          {showModalError && (
            <>
              <div className="fixed inset-0 bg-black/60 z-40" />
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <ModalError modulo="¿Estás seguro de que quieres eliminarlo?" detalle={`Servicio: ${servicioSeleccionado?.nombre}`} onConfirm={() => {
                  handleEliminarServicio();

                }} onCancel={() => setShowModalError(false)} />
              </div>
            </>
          )}
          {showModalExito && (
            <>
              <div className="fixed inset-0 bg-black/60 z-40" />
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <ModalExito modulo="¡Servicio eliminado correctamente!" detalle="El servicio fue eliminado correctamente" onConfirm={() => {
                  setShowModalExito(false);
                  fetchServicios();
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
                <ModalError modulo="¿Estás seguro de que quieres reactivarlo?" detalle={`Servicio: ${servicioSeleccionado?.nombre}`} buttonConfirm="Reactivar" onConfirm={() => {
                  handleReactivarServicio();
                }} onCancel={() => setShowModalError(false)} />
              </div>
            </>
          )}

          {showModalExito && (
            <>
              <div className="fixed inset-0 bg-black/60 z-40" />
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <ModalExito modulo="¡Servicio reactivado correctamente!" detalle="El servicio fue reactivado correctamente" onConfirm={() => {
                  setShowModalExito(false);
                  fetchServicios();
                }} />
              </div>
            </>
          )}
        </>

      )}


    </div>
  );
}

export default ServiciosPage;
