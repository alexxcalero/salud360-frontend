import { useEffect, useState } from "react";
import { Filter, UserPlus, Pencil, Trash2, Info, Search, RotateCcw, FolderPlus } from "lucide-react";
import { useNavigate } from "react-router";

import InputIcon from "@/components/InputIcon";
import ButtonIcon from "@/components/ButtonIcon";
import TableHeader from "@/components/admin/TableHeader";
import TableBody from "@/components/admin/TableBody";
import ModalExito from "@/components/ModalExito";
import ModalError from "@/components/ModalError";
import ModalRestauracion from "@/components/ModalRestauracion";
import { baseAPI } from "@/services/baseAPI";

function ComunidadPage() {
  const [selectAll, setSelectAll] = useState(false);
  const [comunidades, setComunidades] = useState<any[]>([]);
  const [comunidadSeleccionada, setComunidadSeleccionada] = useState<any>();
  const [showModalExito, setShowModalExito] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [showModalRestauracion, setShowModalRestauracion] = useState(false);
  const [paginaActual, setPaginaActual] = useState(1);

  const navigate = useNavigate();

  //Para la funcionalidad de búsqueda:
  const [busqueda, setBusqueda] = useState("");

  const fetchComunidades = () => {
    baseAPI.get("/comunidades", {
      auth: { username: "admin", password: "admin123" }
    })
    .then(res => setComunidades(res.data))
    .catch(err => console.error("Error cargando comunidades", err));
  };

  useEffect(() => {
    fetchComunidades();
  }, []);

  const handleSelectAll = () => {setSelectAll(!selectAll);};

  const handleEliminarComunidad = (): void => {
    baseAPI.delete(`/comunidades/${comunidadSeleccionada.idComunidad}`)
      .then(() => {
        setShowModalExito(true);
        setShowModalError(false);
      })
      .catch(() => console.log("Error eliminando comunidad"));
  };

  const handleReactivarComunidad = (): void => {
    baseAPI.post(`/comunidades/${comunidadSeleccionada.idComunidad}/restaurar`)
      .then(() => {
        setShowModalExito(true);
        setShowModalError(false);
      })
      .catch(() => console.log("Error restaurando comunidad"));
  };

  const columns = [
    { label: <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />, className: "w-10" },
    { label: "ID", className: "w-16" },
    { label: "Nombre", className: "w-1/6 text-left" },
    { label: "Descripción", className: "w-1/4 text-left" },
    { label: "Propósito", className: "w-1/4 text-left" },
    { label: "Servicios", className: "w-20" },
    { label: "Cant. Usuarios", className: "w-24 text-center" },
    { label: "Status", className: "w-1/6 " },
    { label: "Acciones", className: "w-24 text-center" },
  ];


  const comunidadesFiltradas = comunidades
  .filter(com => com.nombre.toLowerCase().includes(busqueda.toLowerCase()));

  const comunidadesOrdenadas = comunidadesFiltradas.slice()
  .sort(  (a, b) => a.idComunidad - b.idComunidad);

  const registrosPorPagina = 5;
  const totalPaginas = Math.ceil(comunidadesOrdenadas.length / registrosPorPagina);

  const comunidadesPaginadas = comunidadesOrdenadas.slice(
  (paginaActual - 1) * registrosPorPagina, paginaActual * registrosPorPagina);

  const rows = comunidadesPaginadas
  .map((comunidad: any) => [
    {
      content: <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />,
      className: "w-10",
    },
    { content: comunidad.idComunidad, className: "w-16" },
    { content: comunidad.nombre, className: "w-1/6 text-left" },
    { content: comunidad.descripcion, className: "w-1/4 text-left" },
    { content: comunidad.proposito, className: "w-1/4 text-left" },
    {
      content: (
        <ul className="list-disc pl-4 text-sm">
          {comunidad.servicios && comunidad.servicios.length > 0 ? (
            comunidad.servicios.map((servicio: any, index: number) => (
              <li key={index}>{servicio.nombre}</li>
            ))
          ) : (
            <li className="text-black">Sin servicios</li>
          )}
        </ul>
      ),
      className: "w-20",
    },
    { content: comunidad.cantMiembros ?? 0, className: "w-24 text-center" },
    {
      content: (
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          comunidad.activo ? "bg-green-600 text-green-50" : "bg-red-600 text-red-50"
        }`}>
          {comunidad.activo ? "Activo" : "Inactivo"}
        </span>
      ),
      className: "w-1/6 ",
    },
    {
      content: (
        <div className="flex justify-center gap-2">
          <Info className="w-5 h-5 text-[#2A86FF] cursor-pointer" onClick={() => navigate(`/admin/comunidades/detalle/${comunidad.idComunidad}`)} />
          <Pencil className="w-5 h-5 text-[#2A86FF] cursor-pointer" onClick={() => navigate(`/admin/comunidades/editar/${comunidad.idComunidad}`)} />
          {comunidad.activo ?
            <Trash2 className="w-5 h-5 text-[#2A86FF] cursor-pointer" onClick={() => {
              setComunidadSeleccionada(comunidad);
              setShowModalError(true);
            }}/>
            :
            <RotateCcw className="w-5 h-5 text-[#2A86FF] cursor-pointer" onClick={() => {
              setComunidadSeleccionada(comunidad);
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
      {/* Filtros y acciones */}
      <div className="grid grid-cols-12 gap-4 items-center mb-4">
        <div className="col-span-4">
          <InputIcon icon={<Search className="w-5 h-5" />} placeholder="Buscar comunidad" type="search" value={busqueda} onChange={(e) => setBusqueda(e.target.value)}/>
        </div>
        <div className="col-span-8 flex justify-end">
          <ButtonIcon icon={<FolderPlus className="w-6 h-6" />} size="lg" variant="primary" onClick={() => navigate("/admin/comunidades/crear")}>Agregar comunidad</ButtonIcon>
        </div>
      </div>

      {/* Tabla */}
      <div className="p-2">
        <table className="border-separate border-spacing-y-2 w-full">
          <TableHeader columns={columns} />
          <TableBody rows={rows} />
        </table>
      </div>

      {/* acá voy a agregar el bloque de paginación , con fe funciona AQUIIII   */}
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



      {comunidadSeleccionada && (comunidadSeleccionada.activo ?
        <>
          {showModalError && (
            <>
              <div className="fixed inset-0 bg-black/60 z-40" />
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <ModalError modulo="¿Estás seguro de que quieres eliminarlo?" detalle={`Comunidad: ${comunidadSeleccionada?.nombre}`} onConfirm={() => {
                  handleEliminarComunidad();

                }} onCancel={() => setShowModalError(false)} />
              </div>
            </>
          )}
          {showModalExito && (
            <>
              <div className="fixed inset-0 bg-black/60 z-40" />
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <ModalExito modulo="¡Comunidad eliminada correctamente!" detalle="La comunidad fue eliminada correctamente" onConfirm={() => {
                  setShowModalExito(false);
                  fetchComunidades();
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
                <ModalError modulo="¿Estás seguro de que quieres reactivarla?" detalle={`Comunidad: ${comunidadSeleccionada?.nombre}`} buttonConfirm="Reactivar" onConfirm={() => {
                  handleReactivarComunidad();
                }} onCancel={() => setShowModalError(false)} />
              </div>
            </>
          )}

          {showModalExito && (
            <>
              <div className="fixed inset-0 bg-black/60 z-40" />
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <ModalExito modulo="¡Comunidad reactivado correctamente!" detalle="La comunidad fue reactivado correctamente" onConfirm={() => {
                  setShowModalExito(false);
                  fetchComunidades();
                }} />
              </div>
            </>
          )}
        </>

      )}


    </div>
  );
}

export default ComunidadPage;
