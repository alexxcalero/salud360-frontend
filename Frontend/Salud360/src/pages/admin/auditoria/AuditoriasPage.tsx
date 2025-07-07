import TableBody from "@/components/admin/TableBody";
import TableHeader from "@/components/admin/TableHeader";
import ButtonIcon from "@/components/ButtonIcon";
import InputIcon from "@/components/InputIcon";
import UnderConstruction from "@/pages/UnderConstruction";
import { baseAPI } from "@/services/baseAPI";
import { FileText, Filter, Info, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function AuditoriasPage(){

  const [selectAll, setSelectAll] = useState(false);
  const [auditorias, setAuditorias] = useState([]);
  const [_auditoriaSeleccionada, setAuditoriaSeleccionada] = useState<any>();
  const [_showModalDetalle, setShowModalDetalle] = useState(false);
  const [search, setSearch] = useState("");

  const [paginaActual, setPaginaActual] = useState(1);
  const registrosPorPagina = 10;

  const indiceInicio = (paginaActual - 1) * registrosPorPagina
  const indiceFin = indiceInicio + registrosPorPagina;


  
  const fetchAuditorias = () => {
    baseAPI.get("/auditorias", {
      auth: {
        username: "admin",
        password: "admin123"
      }
    })
      .then(res => {
        //console.log("Datos cargados:", res.data); // VER ESTO EN LA CONSOLA
        setAuditorias(res.data);
        //console.log("Auditorias:", res.data);
      })
      .catch(err => console.error("Error cargando auditorias", err));
  }

  const auditoriasPaginadas = auditorias.slice(indiceInicio, indiceFin);
  const totalPaginas = Math.ceil(auditorias.length / registrosPorPagina);

  useEffect(() => {
    fetchAuditorias(); 
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

  const getOperacionStyle = (operacion: string) => {
    switch (operacion.toUpperCase()) {
      case "CREAR":
        return "bg-[#13C213]/10 text-[#13C213]";
      case "ELIMINAR":
        return "bg-[#C21313]/10 text-[#C21313]";
      case "ACTUALIZAR":
        return "bg-[#A6A113]/10 text-[#A6A113]";
      case "CONSULTAR":
        return "bg-blue-500 text-blue-50";
      default:
        return "bg-gray-400 text-white";
    }
  }

  const columns = [
    { label: <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />, className: "w-10" },       // checkbox
    { label: "ID", className: "w-14" },                                                                          // ID auditoría
    { label: "Descripción", className: "w-1/3 text-left" },                                                      // Descripción ↑
    { label: "Fecha y hora", className: "w-1/3 text-left" },                                                     // Fecha de modificación ↑
    { label: "Usuario", className: "w-1/6" },                                                                    // ID usuario modificador
    { label: "Entidad", className: "w-1/6" },                                                                    // nombre_tabla
    { label: "Acción", className: "w-1/6" },                                                                     // operación
    { label: "Acciones", className: "w-24 text-center" },                                                        // íconos
  ];

  const rows = auditoriasPaginadas.map((auditoria: any) => [
    {
      content: (
        <input
          type="checkbox"
          checked={selectAll}
          onChange={handleSelectAll}
        />
      ),
      className: "w-10",
    },
    { content: auditoria.idAuditoria, className: "w-14" },
    { content: auditoria.descripcion || "Sin detalles", className: "w-1/3 text-left" },
    { content: formatFechaHora(auditoria.fechaModificacion), className: "w-1/3 text-left" },
    { content: auditoria.nombreUsuarioModificador, className: "w-1/6" },
    { content: auditoria.nombreTabla, className: "w-1/6" },
    {
      content: (
        <span className={`px-2 py-1 rounded text-xs font-bold ${getOperacionStyle(auditoria.operacion)}`}>
          {auditoria.operacion}
        </span>
        
      ),
      className: "w-1/6",
    },
    {
      content: (
        <div className="flex justify-center">
          <Info
            className="w-5 h-5 text-[#2A86FF] cursor-pointer"
            onClick={() => {
              setAuditoriaSeleccionada(auditoria);
              setShowModalDetalle(true);
            }}
          />
        </div>
      ),
      className: "w-24 text-center",
    },
  ]);

  const navigate = useNavigate();

  return (
    <div className="w-full px-6 py-4 overflow-auto">
      <title>Auditorías</title>
      <div className="grid grid-cols-12 gap-4 items-center mb-4">
        <div className="col-span-4">
          <InputIcon icon={<Search className="w-5 h-5" />} value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar registros" type="search" />
        </div>
        <div className="col-span-8 flex justify-end">
          <ButtonIcon icon={<FileText className="w-6 h-6" />} size="lg" variant="primary" onClick={() => navigate("/admin/usuarios/crear")}>Emitir reporte</ButtonIcon>
        </div>
      </div>

      <div className="p-2">
        <table className="border-separate border-spacing-y-2 w-full">
          <TableHeader columns={columns} />
          <TableBody rows={rows} />
        </table>

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


      </div>

      {/*¨
      { usuarioSeleccionado && (usuarioSeleccionado.activo ?
        <>
          {showModalError && (
            <>
              <div className="fixed inset-0 bg-black/60 z-40" />
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <ModalError modulo="¿Estás seguro de que quieres eliminarlo?" detalle={`Usuario: ${usuarioSeleccionado?.nombres} ${usuarioSeleccionado.apellidos}`} onConfirm={() => {
                  handleEliminarUsuario();

                }} onCancel={() => setShowModalError(false)} />
              </div>
            </>
          )}
          {showModalExito && (
            <>
              <div className="fixed inset-0 bg-black/60 z-40" />
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <ModalExito modulo="¡Usuario eliminado correctamente!" detalle="El usuario fue eliminado correctamente" onConfirm={() => {
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
                <ModalError modulo="¿Estás seguro de que quieres reactivarlo?" detalle={`Usuario: ${usuarioSeleccionado?.nombres} ${usuarioSeleccionado.apellidos}`} buttonConfirm="Reactivar" onConfirm={() => {
                  handleReactivarUsuario();
                }} onCancel={() => setShowModalError(false)} />
              </div>
            </>
          )}

          {showModalExito && (
            <>
              <div className="fixed inset-0 bg-black/60 z-40" />
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <ModalExito modulo="¡Usuario reactivado correctamente!" detalle="El usuario fue reactivado correctamente" onConfirm={() => {
                  setShowModalExito(false);
                  fetchUsuarios();
                }} />
              </div>
            </>
          )}
        </>

      )}
        */}

      

    </div>
  )
}

export default AuditoriasPage;