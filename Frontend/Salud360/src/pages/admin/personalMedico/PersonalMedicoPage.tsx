import UnderConstruction from "@/pages/UnderConstruction";
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

function PersonalMedicoPage(){
    
    const [selectAll, setSelectAll] = useState(false);
    const [medicos, setMedicos] = useState([]);
    const [medicoSeleccionado, setMedicoSeleccionado] = useState<any>();
    const [showModalExito, setShowModalExito] = useState(false);
    const [showModalError, setShowModalError] = useState(false);

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
    };

    const navigate = useNavigate();

    const fetchMedicos = () => {
        axios.get("http://localhost:8080/api/medicos", {
            auth: {
                username: "admin",
                password: "admin123"
            }
        })
            .then(res => {
                console.log("Datos cargados:", res.data); // VER ESTO EN LA CONSOLA
                setMedicos(res.data);
                console.log("Médicos:", res.data);
            })
            .catch(err => console.error("Error cargando médicos", err));
    }

    useEffect(() => {
        fetchMedicos(); //hago esto para que al eliminar un medico y darle a "volver" se actualice todo automaticamente
    }, []);

    const handleEliminarMedico = (): void => {
        axios.delete(`http://localhost:8080/api/usuarios/${medicoSeleccionado.idUsuario}`)
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
        { label: "Especialidad", className: "w-1/6 text-left" },
        { label: "Descripción", className: "w-1/6 text-left" },
        { label: "Status", className: "w-1/6 text-left" },
        { label: "Actions", className: "w-24 text-center" },
    ];

    const rows = medicos.map((medico: any) => [
        {
            content: <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />,
            className: "w-10",
        },
        { content: medico.idUsuario, className: "w-16" },
        {
            content: (
                <img
                    src={medico.fotoPerfil?.startsWith("http") ? medico.fotoPerfil : "/default-user.png"}
                    alt="foto"
                    className="w-6 h-6 rounded-full object-cover"
                />
            ),
            className: "w-16",
        },
        { content: `${medico.nombres} ${medico.apellidos}`, className: "w-1/4 text-left" },
        { content: medico.correo, className: "w-1/3 text-left" },
        { content: medico.especialidad, className: "w-1/6 text-left" },
        { content: medico.descripcion, className: "w-1/6 text-left" },
        {
            content: (
                <span className={`px-2 py-1 rounded text-xs font-medium ${medico.activo ? "bg-green-600 text-green-50" : "bg-red-600 text-red-50"
                    }`}>
                    {medico.activo ? "Activo" : "Inactivo"}
                </span>
            ),
            className: "w-1/6 text-left",
        },
        {
            content: (
                <div className="flex justify-center gap-2">
                    <Info className="w-5 h-5 text-[#2A86FF] cursor-pointer" onClick={() => navigate(`/admin/personalMedico/detalle/${medico.idUsuario}`)} />
                    <Pencil className="w-5 h-5 text-[#2A86FF] cursor-pointer" onClick={() => navigate(`/admin/personalMedico/editar/${medico.idUsuario}`)} />
                    {medico.activo ?
                        <Trash2 className="w-5 h-5 text-[#2A86FF] cursor-pointer" onClick={() => {
                            setMedicoSeleccionado(medico);
                            setShowModalError(true);
                        }} />
                        :
                        <RotateCcw className="w-5 h-5 text-[#2A86FF] cursor-pointer" onClick={() => {
                            setMedicoSeleccionado(medico);

                        }} />
                    }
                </div>
            ),
            className: "w-24 text-center",
        },
    ]

    )

    return (
        <div className="w-full px-6 py-4 overflow-auto">
            <div className="grid grid-cols-12 gap-4 items-center mb-4">
                <div className="col-span-4">
                <InputIcon icon={<Search className="w-5 h-5" />} placeholder="Buscar médicos" type="search" />
                </div>
                <div className="col-span-6 flex gap-2">
                <ButtonIcon icon={<Search className="w-6 h-6" />} size="lg" variant="primary">Buscar</ButtonIcon>
                <ButtonIcon icon={<Filter className="w-6 h-6" />} size="lg" variant="primary">Aplicar filtros</ButtonIcon>
                </div>
                <div className="col-span-2 flex justify-end">
                <ButtonIcon icon={<UserPlus className="w-6 h-6" />} size="lg" variant="primary" onClick={() => navigate("/admin/personalMedico/crear")}>Agregar médico</ButtonIcon>
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
                    <ModalError modulo="Usuario" detalle={`${medicoSeleccionado?.nombres} ${medicoSeleccionado.apellidos}`} onConfirm={() => {
                    handleEliminarMedico();
                    
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
                    fetchMedicos();
                    }}/>
                </div>
                </>
            )}

        </div>
        
    );
}

export default PersonalMedicoPage;