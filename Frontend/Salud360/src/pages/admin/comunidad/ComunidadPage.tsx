import { useEffect, useState } from "react";
import {  Pencil, Trash2, Info, Search, RotateCcw, FolderPlus } from "lucide-react";
import { useNavigate } from "react-router";

import InputIcon from "@/components/InputIcon";
import ButtonIcon from "@/components/ButtonIcon";
import TableHeader from "@/components/admin/TableHeader";
import TableBody from "@/components/admin/TableBody";
import ModalExito from "@/components/ModalExito";
import ModalError from "@/components/ModalError";
import ModalValidacion from "@/components/ModalValidacion";
import ModalRestauracion from "@/components/ModalRestauracion";
import { baseAPI } from "@/services/baseAPI";

function ComunidadPage() {
  const [selectAll, setSelectAll] = useState(false);
  const [comunidades, setComunidades] = useState<any[]>([]);
  const [comunidadSeleccionada, setComunidadSeleccionada] = useState<any>();
  const [showModalExito, setShowModalExito] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [showModalValidacion, setShowModalValidacion] = useState(false);
  //const [showModalRestauracion, setShowModalRestauracion] = useState(false);
  const [paginaActual, setPaginaActual] = useState(1);
  const [showModalErrorMiembros, setShowModalErrorMiembros] = useState(false); // new for update
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

  const [mensajeError, setMensajeError] = useState("");

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
            <Trash2
              className="w-5 h-5 text-[#2A86FF] cursor-pointer"
              onClick={() => {
                setComunidadSeleccionada(comunidad);
                if (comunidad.cantMiembros > 0) {
                  setShowModalErrorMiembros(true);
                } else {
                  setShowModalError(true); // Modal de confirmación normal
                }
              }}
            />
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


  // PARA LA CARGA MASIVA
    const handleCSVUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await baseAPI.post("/comunidades/cargaMasiva", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        auth: {
            username: "admin",
            password: "admin123"
        }
        });

        setShowModalExito(true);
        fetchComunidades(); // Recargar la lista
    } catch (error: any) {
      console.error("Error al cargar el archivo CSV", error);
      const mensajeBackend = error.response?.data?.message || "";
      if (error.response?.status === 409) {
        setMensajeError(error.response.data.message);
      } else if (
        error.response?.status === 500 &&
        error.response?.data?.message?.includes("Servicio con ID")
      ) {
        setMensajeError(error.response.data.message);
      } else if (
        error.response?.status === 500 &&(    mensajeBackend.includes("java.lang") ||    mensajeBackend.includes("DataIntegrityViolationException") ||    mensajeBackend.includes("not-null property references a null")  )
      ) {
        setMensajeError("Hay un error con los datos del CSV. Verifica que todos los campos estén correctamente llenados.");
      } else 
          if (error.response?.status === 400 && mensajeBackend.includes("Header name") && mensajeBackend.includes("not found")) {
          setMensajeError("El archivo CSV no tiene los encabezados esperados: nombre, descripcion, proposito, id_servicios,membresías");  
      } else if(error.response?.status === 400 && mensajeBackend.includes("se esperan 5 campos separados")){
           setMensajeError(error.response.data.message);
      }else if(error.response?.status === 400 && mensajeBackend.includes("Cada comunidad debe tener al menos una membresía asociada")){
           setMensajeError(error.response.data.message);
           
    }else if(error.response?.status === 400 ){
           setMensajeError("Verifique que todos los campos del CSV estén correctamente llenados."); 
      }else {
        setMensajeError("Verifique que todos los campos del CSV estén correctamente llenados.");
      }

      setShowModalValidacion(true);
      }
    };


  
  return (
    <div className="w-full px-6 py-4 overflow-auto">
      {/* Filtros y acciones */}
      <div className="grid grid-cols-12 gap-4 items-center mb-4">
        <div className="col-span-4">
          <InputIcon icon={<Search className="w-5 h-5" />} placeholder="Buscar comunidad" type="search" value={busqueda} onChange={(e) => setBusqueda(e.target.value)}/>
        </div>
        <div className="col-span-8 flex justify-end">
          <div className="flex flex-row gap-4">
            <ButtonIcon icon={<FolderPlus className="w-6 h-6" />} size="lg" variant="primary" onClick={() => navigate("/admin/comunidades/crear")}>Agregar comunidad</ButtonIcon>
            <ButtonIcon icon={<FolderPlus className="w-6 h-6" />} size="lg" variant="primary">
                          <label htmlFor="csvUpload" className="cursor-pointer">Carga masiva</label>
            </ButtonIcon>
          </div>
              <input
              id="csvUpload"
              type="file"
              accept=".csv"
              onChange={handleCSVUpload}
              className="hidden"
            />
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


      {/* Modal CARGA MASIVA */}
                {showModalExito && (
                <>
                    <div className="fixed inset-0 bg-black/60 z-40" />
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <ModalExito
                            modulo="Carga masiva correcta"
                            detalle="Se registró de manera exitosa los locales mediante el archivo CSV"
                            onConfirm={() => {
                                setShowModalExito(false);
                                fetchComunidades();
                            }}
                        />
                    </div>
                </>
            )}

      {/* Modal CARGA MASIVA */}
        {showModalValidacion && (
            <>
              <div className="fixed inset-0 bg-black/60 z-40" />
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                     <ModalValidacion
                       titulo="Error en la carga masiva"
                       mensaje={mensajeError}
                       onClose={() => setShowModalValidacion(false)}
                   />
              </div>
            </>
        )}

      {showModalErrorMiembros && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40" />
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <ModalError
              modulo="No se puede eliminar la comunidad"
              detalle="La comunidad aún tiene miembros inscritos. Debe estar vacía para poder eliminarla."
              buttonConfirm="Aceptar"
              onConfirm={() => setShowModalErrorMiembros(false)}
              onCancel={() => setShowModalErrorMiembros(false)}
            />
          </div>
        </>
      )}

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
