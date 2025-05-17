import { useEffect, useState } from "react";
import { Filter, UserPlus, Pencil, Trash2, Info, Search, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router";
import axios from "axios";

import InputIcon from "@/components/InputIcon";
import ButtonIcon from "@/components/ButtonIcon";
import TableHeader from "@/components/admin/TableHeader";
import TableBody from "@/components/admin/TableBody";
import ModalExito from "@/components/ModalExito";
import ModalError from "@/components/ModalError";
import ModalRestauracion from "@/components/ModalRestauracion";

function ComunidadPage() {
  const [selectAll, setSelectAll] = useState(false);
  const [comunidades, setComunidades] = useState<any[]>([]);
  const [comunidadSeleccionada, setComunidadSeleccionada] = useState<any>();
  const [showModalExito, setShowModalExito] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [showModalRestauracion, setShowModalRestauracion] = useState(false);

  const navigate = useNavigate();

  const fetchComunidades = () => {
    axios.get("http://localhost:8080/api/comunidades", {
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
    axios.delete(`http://localhost:8080/api/comunidades/${comunidadSeleccionada.idComunidad}`)
      .then(() => {
        setShowModalExito(true);
        setShowModalError(false);
      })
      .catch(() => console.log("Error eliminando comunidad"));
  };

  const handleRestaurarComunidad = (): void => {
    axios.put(`http://localhost:8080/api/comunidades/${comunidadSeleccionada.idComunidad}/restaurar`)
      .then(() => {
        setShowModalRestauracion(true); // Mostrar modal de restauración
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
    { label: "Status", className: "w-1/6 " },
    { label: "Acciones", className: "w-24 text-center" },
  ];

  const rows = comunidades
  .slice() // para no mutar el estado original
  .sort((a: any, b: any) => a.idComunidad - b.idComunidad)
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
              handleRestaurarComunidad();
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
          <InputIcon icon={<Search className="w-5 h-5" />} placeholder="Buscar Comunidad" type="search" />
        </div>
        <div className="col-span-6 flex gap-2">
          <ButtonIcon icon={<Search className="w-6 h-6" />} size="lg" variant="primary">Buscar</ButtonIcon>
          <ButtonIcon icon={<Filter className="w-6 h-6" />} size="lg" variant="primary">Aplicar filtros</ButtonIcon>
        </div>
        <div className="col-span-2 flex justify-end">
          <ButtonIcon icon={<UserPlus className="w-6 h-6" />} size="lg" variant="primary" onClick={() => navigate("/admin/comunidades/crear")}>Agregar comunidad</ButtonIcon>
        </div>
      </div>

      {/* Tabla */}
      <div className="p-2">
        <table className="border-separate border-spacing-y-2 w-full">
          <TableHeader columns={columns} />
          <TableBody rows={rows} />
        </table>
      </div>

      {/* Modales */}
      {showModalError && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40" />
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <ModalError 
              modulo="Comunidad" 
              detalle={comunidadSeleccionada?.nombre}
              onConfirm={() => {handleEliminarComunidad();}} 
              onCancel={() => setShowModalError(false)}/>
          </div>
        </>
      )}

      {showModalExito && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40" />
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <ModalExito 
              modulo="Comunidad" 
              detalle="La comunidad fue procesada correctamente"
              onConfirm={() => {
                setShowModalExito(false);
                fetchComunidades();
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
              modulo="Comunidad"
              detalle="La comunidad fue activada nuevamente correctamente"
              onConfirm={() => {
                setShowModalRestauracion(false);
                fetchComunidades();
              }}
            />
          </div>
        </>
      )}


    </div>
  );
}

export default ComunidadPage;