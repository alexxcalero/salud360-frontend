import  { useState, useEffect } from "react";
import { Search, Info, Trash2, Pencil, Filter, UserPlus, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router";

import TableHeader from "@/components/admin/TableHeader";
import TableBody from "@/components/admin/TableBody";
import InputIcon from "@/components/InputIcon";
import ButtonIcon from "@/components/ButtonIcon";
import ModalExito from "@/components/ModalExito";
import ModalError from "@/components/ModalError";
import ModalValidacion from "@/components/ModalValidacion";
import { baseAPI } from "@/services/baseAPI";
import { ChevronDown } from "lucide-react";


interface Usuario {
  idCliente: number;
  nombres: string;
  apellidos: string;
  correo: string;
  telefono: string;
  activo: boolean;
  fotoPerfil?: string;
}


function UsuariosPage() {
  const [selectAll, setSelectAll] = useState(false);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<any>();
  const [showModalExito, setShowModalExito] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  //const [search, setSearch] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);

  //Para la funcionalidad de búsqueda:
  const [busqueda, setBusqueda] = useState("");

  //carmasiva
  type TipoCarga = "cliente" | "administrador";
  const [tipoCargaMasiva, setTipoCargaMasiva] = useState<TipoCarga | null>(null);
  const [mostrarOpcionesCarga, setMostrarOpcionesCarga] = useState(false);
  const [showModalValidacion, setShowModalValidacion] = useState(false);
  const [mensajeError, setMensajeError] = useState("");
  const [mensajeExito, setMensajeExito] = useState("");

  const fetchUsuarios = () => {
    baseAPI.get("/admin/clientes", {
      auth: {
        username: "admin",
        password: "admin123"
      }
    })
      .then(res => {
        //console.log("Datos cargados:", res.data); // VER ESTO EN LA CONSOLA
        setUsuarios(res.data);
        //console.log("Usuarios:", res.data);
      })
      .catch(err => console.error("Error cargando usuarios", err));
  }

  useEffect(() => {
    fetchUsuarios(); //hago esto para que al eliminar un usuario y darle a "volver" se actualice todo automaticamente
  }, []);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
  };

  const handleEliminarUsuario = (): void => {
    //console.log("El id del usuario a eliminar es:", usuarioSeleccionado.idCliente)
    baseAPI.delete(`/admin/clientes/${usuarioSeleccionado.idCliente}`)
    .then(() => {
      setShowModalExito(true);
      setShowModalError(false)
    })
    .catch(() => console.log("Error"));
  }

  const endpointMap: Record<TipoCarga, string> = {
    cliente: "/cliente/cargaMasiva",
    administrador: "/admin/cargaMasiva",
    //afiliacion: "/afiliaciones/cargaMasiva",
    //pago: "/pagos/cargaMasiva",
  };

  const handleCSVUpload = async (event: React.ChangeEvent<HTMLInputElement>, tipo: keyof typeof endpointMap) => {
  const file = event.target.files?.[0];
  if (!file || !tipo) return;

  const endpoint = endpointMap[tipo];
  const formData = new FormData();
  formData.append("file", file);

  try {
    await baseAPI.post(endpoint, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      auth: { username: "admin", password: "admin123" },
    });
    setMensajeExito("¡Usuario registrado correctamente!");
    setShowModalExito(true);
    fetchUsuarios();
  } catch (error: any) {
  const mensajeBackend = error.response?.data?.message || "";

  if (error.response?.status === 409) {
    setMensajeError(mensajeBackend);
  } else if (
    error.response?.status === 500 &&
    mensajeBackend.includes("correo")
  ) {
    setMensajeError(mensajeBackend); // ejemplo: "Ya existe un usuario registrado con ese correo."
  } else if (
    error.response?.status === 500 &&
    mensajeBackend.includes("integridad de datos")
  ) {
    setMensajeError("Error interno al guardar los clientes. Verifica duplicados.");
  } else if (
    error.response?.status === 400 &&
    mensajeBackend.includes("TipoDocumento con ID")
  ) {
    setMensajeError("El tipo de documento especificado no existe.");
  } else if (
    error.response?.status === 400 &&
    mensajeBackend.includes("Usuario con ID")
  ) {
    setMensajeError("El ID del usuario no existe. Verifique los datos.");
  } else if (
    error.response?.status === 400 &&
    mensajeBackend.includes("El teléfono")
  ) {
    setMensajeError(mensajeBackend);
  } else {
    setMensajeError("Verifique que todos los campos del CSV estén correctamente llenados.");
  }

  setShowModalValidacion(false);
  setTimeout(() => setShowModalValidacion(true), 10);
}


  setTipoCargaMasiva(null);
};



  const handleReactivarUsuario = (): void => {
    //("El id del usuario a reactivar es:", usuarioSeleccionado.idCliente)
    baseAPI.put(`/admin/clientes/${usuarioSeleccionado.idCliente}/reactivar`)
    .then(() => {
      setShowModalExito(true);
      setShowModalError(false)
    })
    .catch(() => console.log("Error"));
  }


  const columns = [
    { label: <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />, className: "w-10" },
    { label: "ID", className: "w-16" },
    { label: "Foto", className: "w-16" },
    { label: "Nombre", className: "w-1/4 text-left" },
    { label: "Correo", className: "w-1/3 text-left" },
    { label: "Telefono", className: "w-1/6 text-left" },
    { label: "Status", className: "w-1/6 text-left" },
    { label: "Actions", className: "w-24 text-center" },
  ];
  
    const usuariosFiltrados = usuarios
    .filter(usu => usu.nombres.toLowerCase().includes(busqueda.toLowerCase()));

    const usuariosOrdenados = usuariosFiltrados.slice()
    .sort(  (a, b) => a.idCliente - b.idCliente);

    const registrosPorPagina = 10;
    const totalPaginas = Math.ceil(usuariosOrdenados.length / registrosPorPagina);

    const usuariosPaginados = usuariosOrdenados.slice(
    (paginaActual - 1) * registrosPorPagina, paginaActual * registrosPorPagina);

    const rows = usuariosPaginados
  .map((usuario: any) => [
    {
      content: <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />,
      className: "w-10",
    },
    { content: usuario.idCliente, className: "w-16" },
    {
      content: (
        <img
          src={usuario.fotoPerfil?.startsWith("http") ? usuario.fotoPerfil : "/default-user.png"}
          alt="foto"
          className="w-6 h-6 rounded-full object-cover"
        />
      ),
      className: "w-16",
    },
    { content: `${usuario.nombres} ${usuario.apellidos}`, className: "w-1/4 text-left" },
    { content: usuario.correo, className: "w-1/3 text-left" },
    { content: usuario.telefono, className: "w-1/6 text-left" },
    {
      content: (
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          usuario.activo ? "bg-green-600 text-green-50" : "bg-red-600 text-red-50"
        }`}>
          {usuario.activo ? "Activo" : "Inactivo"}
        </span>
      ),
      className: "w-1/6 text-left",
    },
    {
      content: (
        <div className="flex justify-center gap-2">
          <Info className="w-5 h-5 text-[#2A86FF] cursor-pointer" onClick={() => navigate(`/admin/usuarios/detalle/${usuario.idCliente}`)}/>
          <Pencil className="w-5 h-5 text-[#2A86FF] cursor-pointer" onClick={() => navigate(`/admin/usuarios/editar/${usuario.idCliente}`)}/>
          {usuario.activo ? 
            <Trash2 className="w-5 h-5 text-[#2A86FF] cursor-pointer" onClick={() => {
              setUsuarioSeleccionado(usuario);
              setShowModalError(true);
            }}/>
            :
            <RotateCcw className= "w-5 h-5 text-[#2A86FF] cursor-pointer" onClick={() => {
              setUsuarioSeleccionado(usuario);
              setShowModalError(true);
            }}/>
        }
        </div>
      ),
      className: "w-24 text-center",
    },
  ]);

  const navigate = useNavigate();


  return (
    <div className="w-full px-6 py-4 overflow-auto">
      <title>Usuarios</title>
      <div className="grid grid-cols-12 gap-4 items-center mb-4">
        <div className="col-span-4">
          <InputIcon icon={<Search className="w-5 h-5" />} value={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder="Buscar usuarios" type="search" />
        </div>
        <div className="col-span-8 flex justify-end">
          <ButtonIcon icon={<UserPlus className="w-6 h-6" />} size="lg" variant="primary" onClick={() => navigate("/admin/usuarios/crear")}>
            Agregar usuario
          </ButtonIcon>
          <div className="relative ml-2">
            <ButtonIcon
              icon={<ChevronDown className="w-5 h-5" />}
              size="lg"
              variant="primary"
              onClick={() => setMostrarOpcionesCarga((prev) => !prev)}
            >
              Carga Masiva
            </ButtonIcon>

            {mostrarOpcionesCarga && (
              <div className="absolute right-0 mt-2 bg-white border border-gray-300 shadow-md rounded-md z-50 w-48">
                {["cliente", "administrador"].map((tipo) => (
                  <button
                    key={tipo}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm capitalize"
                    onClick={() => {
                      setTipoCargaMasiva(tipo as TipoCarga);
                      setMostrarOpcionesCarga(false);
                      setTimeout(() => document.getElementById("csvUpload")?.click(), 0);
                    }}
                  >
                    Cargar {tipo}
                  </button>
                ))}
              </div>
            )}

            <input
              id="csvUpload"
              type="file"
              accept=".csv"
              className="hidden"
              onChange={(e) => handleCSVUpload(e, tipoCargaMasiva!)} // usás el `!` porque tipo está seteado antes
            />
          </div>
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

      {showModalExito && (
            <>
              <div className="fixed inset-0 bg-black/60 z-40" />
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <ModalExito modulo={mensajeExito} detalle="El archivo fue procesado correctamente" onConfirm={() => {
                  setShowModalExito(false);
                  fetchUsuarios();
                }} />
              </div>
            </>
      )}



      {/*XDDDDDD */}
      {/** 
      {showModalError && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40" />
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <ModalError modulo="Usuario" detalle={`${usuarioSeleccionado?.nombres} ${usuarioSeleccionado.apellidos}`} onConfirm={() => {
              handleEliminarUsuario();
              
            }} onCancel={() => setShowModalError(false)}/>
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
            }}/>
          </div>
        </>
      )}
      */}

      

    </div>
  );
}

export default UsuariosPage;
