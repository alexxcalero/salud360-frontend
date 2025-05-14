import  { useState, useEffect } from "react";
import axios from "axios";
import { Search, Info, Trash2, Pencil, Filter, UserPlus, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router";

import TableHeader from "@/components/admin/TableHeader";
import TableBody from "@/components/admin/TableBody";
import InputIcon from "@/components/InputIcon";
import ButtonIcon from "@/components/ButtonIcon";
import ModalExito from "@/components/ModalExito";
import ModalError from "@/components/ModalError";

function UsuariosPage() {
  const [selectAll, setSelectAll] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<any>();
  const [showModalExito, setShowModalExito] = useState(false);
  const [showModalError, setShowModalError] = useState(false);

  const fetchUsuarios = () => {
    axios.get("http://localhost:8080/api/usuarios", {
      auth: {
        username: "admin",
        password: "admin123"
      }
    })
      .then(res => {
        console.log("Datos cargados:", res.data); // VER ESTO EN LA CONSOLA
        setUsuarios(res.data);
        console.log("Usuarios:", res.data);
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
    axios.delete(`http://localhost:8080/api/usuarios/${usuarioSeleccionado.idUsuario}`)
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

  const rows = usuarios.map((usuario: any) => [
    {
      content: <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />,
      className: "w-10",
    },
    { content: usuario.idUsuario, className: "w-16" },
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
          <Info className="w-5 h-5 text-[#2A86FF] cursor-pointer" onClick={() => navigate(`/admin/usuarios/detalle/${usuario.idUsuario}`)}/>
          <Pencil className="w-5 h-5 text-[#2A86FF] cursor-pointer" onClick={() => navigate(`/admin/usuarios/editar/${usuario.idUsuario}`)}/>
          {usuario.activo ? 
            <Trash2 className="w-5 h-5 text-[#2A86FF] cursor-pointer" onClick={() => {
              setUsuarioSeleccionado(usuario);
              setShowModalError(true);
            }}/>
            :
            <RotateCcw className= "w-5 h-5 text-[#2A86FF] cursor-pointer" onClick={() => {
              setUsuarioSeleccionado(usuario);
              
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
      <div className="grid grid-cols-12 gap-4 items-center mb-4">
        <div className="col-span-4">
          <InputIcon icon={<Search className="w-5 h-5" />} placeholder="Buscar usuarios" type="search" />
        </div>
        <div className="col-span-6 flex gap-2">
          <ButtonIcon icon={<Search className="w-6 h-6" />} size="lg" variant="primary">Buscar</ButtonIcon>
          <ButtonIcon icon={<Filter className="w-6 h-6" />} size="lg" variant="primary">Aplicar filtros</ButtonIcon>
        </div>
        <div className="col-span-2 flex justify-end">
          <ButtonIcon icon={<UserPlus className="w-6 h-6" />} size="lg" variant="primary" onClick={() => navigate("/admin/usuarios/crear")}>Agregar usuario</ButtonIcon>
        </div>
      </div>

      <div className="p-2">
        <table className="border-separate border-spacing-y-2 w-full">
          <TableHeader columns={columns} />
          <TableBody rows={rows} />
        </table>
      </div>

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
            <ModalExito modulo="Usuario" detalle="El usuario fue eliminado correctamente" onConfirm={() => {
              setShowModalExito(false);
              fetchUsuarios();
            }}/>
          </div>
        </>
      )}

      

    </div>
  );
}

export default UsuariosPage;
