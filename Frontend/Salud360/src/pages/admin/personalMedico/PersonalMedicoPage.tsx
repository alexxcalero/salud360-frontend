//import UnderConstruction from "@/pages/UnderConstruction";
import  { useState, useEffect } from "react";
import { Search, Info, Trash2, Pencil, Filter, UserPlus, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";

import TableHeader from "@/components/admin/TableHeader";
import TableBody from "@/components/admin/TableBody";
import InputIcon from "@/components/InputIcon";
import ButtonIcon from "@/components/ButtonIcon";
import ModalExito from "@/components/ModalExito";
import ModalError from "@/components/ModalError";
import ModalValidacion from "@/components/ModalValidacion";
import { baseAPI } from "@/services/baseAPI";

interface Medico {
  idMedico: number;
  nombres: string;
  apellidos: string;
  especialidad: string;
  descripcion: string;
  activo: boolean;
  fotoPerfil?: string;
}


function PersonalMedicoPage() {
  const [selectAll, setSelectAll] = useState(false);
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [especialidadesUnicas, setEspecialidadesUnicas] = useState<string[]>([]);
  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState("");
  const [medicoSeleccionado, setMedicoSeleccionado] = useState<any>();
  const [showModalExito, setShowModalExito] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
 

  const [paginaActual, setPaginaActual] = useState(1);
  const [busqueda, setBusqueda] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const handleSelectAll = () => setSelectAll(!selectAll);

  const [showModalValidacion, setShowModalValidacion] = useState(false);
  const [modalValidacionContenido, setModalValidacionContenido] = useState({
    titulo: "",
    mensaje: "",
  });



  const fetchMedicos = () => {
    baseAPI
      .get("/admin/medicos", {
        auth: { username: "admin", password: "admin123" },
      })
      .then((res) => {
        setMedicos(res.data);
        const especialidades = [...new Set(res.data.map((m: any) => m.especialidad).filter(Boolean))];
        setEspecialidadesUnicas(especialidades.filter((e): e is string => typeof e === "string"));//modificado b
      })
      .catch((err) => console.error("Error cargando médicos", err));
  };

  useEffect(() => {
    if (location.state?.updated) {
        setShowModalExito(true);
        window.history.replaceState({}, document.title); // limpia el state para que no se repita
    }
  }, [location.state]);

  useEffect(() => {
    fetchMedicos();
  }, []);

  const handleEliminarMedico = ():  void => {
    baseAPI.delete(`/admin/medicos/${medicoSeleccionado.idMedico}`)
      .then(() => {
        setShowModalExito(true);
        setShowModalError(false);
      })
      .catch(() => console.log("Error eliminando medico"));
    
  };

  const handleReactivarMedico = () => {
    baseAPI.put(`/admin/medicos/${medicoSeleccionado.idMedico}/reactivar`)
    .then(() => {
      setShowModalExito(true);
      setShowModalError(false);
    });
  };

  //carga masivve
  const handleCSVUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);

  try {
    await baseAPI.post("/admin/medicos/cargaMasiva", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      auth: {
        username: "admin",
        password: "admin123",
      },
    });
    setShowModalExito(true);
    fetchMedicos();
    } catch (error: any) {
    console.error("Error al cargar el archivo CSV", error);
    const mensaje =
      error?.response?.data?.message ||
      "Verifique que todos los campos del CSV estén correctamente llenados.";
    setModalValidacionContenido({
      titulo: "Error en la carga masiva",
      mensaje: mensaje,
    });
    setShowModalValidacion(true);
  }
};


  const columns = [
    { label: <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />, className: "w-10" },
    { label: "ID", className: "w-16" },
    { label: "Foto", className: "w-16" },
    { label: "Nombre", className: "w-1/4 text-left" },
    { label: "Especialidad", className: "w-1/6 text-left" },
    { label: "Descripción", className: "w-1/6 text-left" },
    { label: "Status", className: "w-1/6 text-left" },
    { label: "Actions", className: "w-24 text-center" },
  ];

  const medicosFiltrados = medicos.filter((med: any) => {
    const coincideBusqueda = `${med.nombres} ${med.apellidos}`.toLowerCase().includes(busqueda.toLowerCase());
    const coincideEspecialidad =
      !especialidadSeleccionada || med.especialidad === especialidadSeleccionada;
    return coincideBusqueda && coincideEspecialidad;
  });

  const medicosOrdenados = medicosFiltrados.slice().sort((a, b) => a.idMedico - b.idMedico);
  const registrosPorPagina = 10;
  const totalPaginas = Math.ceil(medicosOrdenados.length / registrosPorPagina);
  const medicosPaginados = medicosOrdenados.slice((paginaActual - 1) * registrosPorPagina, paginaActual * registrosPorPagina);

  const rows = medicosPaginados.map((medico: any) => [
    { content: <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />, className: "w-10" },
    { content: medico.idMedico, className: "w-16" },
    {
      content: (
        <img src={medico.fotoPerfil?.startsWith("http") ? medico.fotoPerfil : "/default-user.png"} alt="foto" className="w-6 h-6 rounded-full object-cover" />
      ),
      className: "w-16",
    },
    { content: `${medico.nombres} ${medico.apellidos}`, className: "w-1/4 text-left" },
    { content: medico.especialidad, className: "w-1/6 text-left" },
    { content: medico.descripcion, className: "w-1/6 text-left" },
    {
      content: (
        <span className={`px-2 py-1 rounded text-xs font-medium ${medico.activo ? "bg-green-600 text-green-50" : "bg-red-600 text-red-50"}`}>
          {medico.activo ? "Activo" : "Inactivo"}
        </span>
      ),
      className: "w-1/6 text-left",
    },
    {
      content: (
        <div className="flex justify-center gap-2">
          <Info className="w-5 h-5 text-[#2A86FF] cursor-pointer" onClick={() => navigate(`/admin/personalMedico/detalle/${medico.idMedico}`)} />
          <Pencil className="w-5 h-5 text-[#2A86FF] cursor-pointer" onClick={() => navigate(`/admin/personalMedico/editar/${medico.idMedico}`)} />
          {medico.activo ? (
            <Trash2 className="w-5 h-5 text-[#2A86FF] cursor-pointer" onClick={() => { setMedicoSeleccionado(medico); setShowModalError(true); }} />
          ) : (
            <RotateCcw className="w-5 h-5 text-[#2A86FF] cursor-pointer" onClick={() => { setMedicoSeleccionado(medico); setShowModalError(true); }} />
          )}
        </div>
      ),
      className: "w-24 text-center",
    },
  ]);

  return (
    <div className="w-full px-6 py-4 overflow-auto">
      <title>Personal Médico</title>
      <div className="grid grid-cols-12 gap-4 items-center mb-4">
        <div className="col-span-4">
          <InputIcon icon={<Search className="w-5 h-5" />} placeholder="Buscar médicos" type="search" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
        </div>
        <div className="col-span-4">
          <select value={especialidadSeleccionada} onChange={(e) => setEspecialidadSeleccionada(e.target.value)} className="w-full border rounded p-2">
            <option value="">Todas las especialidades</option>
            {especialidadesUnicas.map((esp) => (
              <option key={esp} value={esp}>{esp}</option>
            ))}
          </select>
        </div>
        <div className="col-span-4 flex justify-end">
          <ButtonIcon icon={<UserPlus className="w-6 h-6" />} size="lg" variant="primary" onClick={() => navigate("/admin/personalMedico/crear")}>
            Agregar médico
          </ButtonIcon>
          <ButtonIcon icon={<UserPlus className="w-6 h-6" />} size="lg" variant="primary" className="ml-2">
            <label htmlFor="csvUpload" className="cursor-pointer">Carga masiva</label>
          </ButtonIcon>
          <input
            id="csvUpload"
            type="file"
            accept=".csv"
            onChange={handleCSVUpload}
            className="hidden"
          />
        </div>
      </div>

      <div className="p-2">
        <table className="border-separate border-spacing-y-2 w-full">
          <TableHeader columns={columns} />
          <TableBody rows={rows} />
        </table>
      </div>

      <div className="flex justify-center items-center gap-4 mt-4">
        <button className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50" onClick={() => setPaginaActual((p) => Math.max(1, p - 1))} disabled={paginaActual === 1}>
          Anterior
        </button>
        <span className="text-sm">Página {paginaActual} de {totalPaginas}</span>
        <button className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50" onClick={() => setPaginaActual((p) => Math.min(totalPaginas, p + 1))} disabled={paginaActual === totalPaginas}>
          Siguiente
        </button>
      </div>

      {showModalExito && (
        <>
            <div className="fixed inset-0 bg-black/60 z-40" />
            <div className="fixed inset-0 z-50 flex items-center justify-center">
            <ModalExito
                modulo="¡Médico/s editado correctamente!"
                detalle="El campo médico fue actualizado correctamente."
                onConfirm={() => {
                setShowModalExito(false);
                fetchMedicos();
                }}
            />
            </div>
        </>
        )}

        {medicoSeleccionado && (medicoSeleccionado.activo ?
        <>
          {showModalError && (
            <>
              <div className="fixed inset-0 bg-black/60 z-40" />
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <ModalError modulo="¿Estás seguro de que quieres eliminarlo?" detalle={`Médico: ${medicoSeleccionado?.nombres} ${medicoSeleccionado?.apellidos}`} onConfirm={() => {
                  handleEliminarMedico();

                }} onCancel={() => setShowModalError(false)} />
              </div>
            </>
          )}
          {showModalExito && (
            <>
              <div className="fixed inset-0 bg-black/60 z-40" />
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <ModalExito modulo="Medico eliminado correctamente!" detalle="El medico fue eliminado correctamente" onConfirm={() => {
                  setShowModalExito(false);
                  fetchMedicos();
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
                <ModalError modulo="¿Estás seguro de que quieres reactivarla?" detalle={`Médico: ${medicoSeleccionado?.nombres} ${medicoSeleccionado?.apellidos}`} buttonConfirm="Reactivar" onConfirm={() => {
                  handleReactivarMedico();
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
                  fetchMedicos();
                }} />
              </div>
            </>
          )}
        </>

      )}

      {showModalValidacion && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40" />
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <ModalValidacion
              titulo={modalValidacionContenido.titulo}
              mensaje={modalValidacionContenido.mensaje}
              onClose={() => setShowModalValidacion(false)}
            />
          </div>
        </>
      )}



    </div>
  );
}
export default PersonalMedicoPage;