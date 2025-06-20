import { useNavigate } from "react-router";
import Button from "../Button";
import { useState } from "react"
import axios from "axios";
import AlertModal from "@/components/modals/alertModal"

export interface MembresiaResumenDTO {
  idMembresia: number;
  nombre: string;
  descripcion: string;
  tipo: string;
  conTope: boolean;
  precio: number;
  cantUsuarios: number;
  maxReservas: number;
  icono: string;
  activo: boolean;
  fechaCreacion: string; // o Date si haces parsing
  fechaDesactivacion: string | null;
}

export interface AfiliacionResumenDTO {
  membresia: MembresiaResumenDTO;
  idAfiliacion: number;
  idComunidad: number;
  estado: string;
  fechaAfiliacion: string; // o Date
  fechaDesafiliacion: string | null;
}

interface Props{
    id: string;
    image: string;
    title: string;
    subtitle: string;
    afiliacion?: AfiliacionResumenDTO;
    showButton?: boolean;
    isMiComunidad?: boolean;
    
}

function CardMisComunidades({id, image, title, subtitle, afiliacion, showButton=true, isMiComunidad=false}: Props){

    const navigate = useNavigate();
    const [modalAbierto, setModalAbierto] = useState(false)
    const [modalData, setModalData] = useState({
    title: "",
    description: "",
    buttonLabel: "",
    onConfirm: async () => true,
    onCancel: () => {},
    });

    const handleAbandonarComunidad = async () => {
        console.log("Comunidad abandonada:", afiliacion)
        try {
            const response = await axios.put(
            `http://localhost:8080/api/afiliaciones/${afiliacion?.idAfiliacion}`,
            {
                membresia: afiliacion?.membresia,
                idAfiliacion: afiliacion?.idAfiliacion,
                estado: "Inactivo",
                fechaAfiliacion: afiliacion?.fechaAfiliacion,
                fechaDesafiliacion: new Date().toISOString(),
                fechaReactivacion: null,
                medioDePago: null,
                usuario: null,
            },
            {
                auth: {
                username: "admin",
                password: "admin123",
                },
            }
            );

            console.log("Actualizado correctamente:", response.data);
            return true;
        } catch (error) {
            console.error("Error al actualizar:", error);
            return false;
        }
    }


    return (
        <div className="w-[450px] h-[550px] grid grid-rows-2 rounded-sm border border-[#2A86FF] shadow-xl">
            <div className="row-span-1">
                <img src={image} alt="imagen" className="w-full h-full object-cover" />
            </div>
            <div className="row-span-1 flex flex-col gap-8 justify-between text-left p-4 bg-white text-black">
                <p className="font-bold">{title}</p>
                <p>{subtitle}</p>


                <div className="flex flex-row justify-between">
                    <div className="inline-block w-32">
                        <Button size="lg" className="w-full" onClick={() => navigate(`/usuario/comunidades/detalle/${id}`)}>{isMiComunidad ? 'Ver' : 'Información'}</Button>
                    </div>

                    {isMiComunidad && <div className="inline-block w-32">
                        <Button size="lg" className="w-full" variant="danger" onClick={() => {
                            setModalData({
                            title: "¿Abandonar comunidad?",
                            description: `¿Estás seguro de abandonar la comunidad "${title}"?`,
                            buttonLabel: "Abandonar",
                            onConfirm: handleAbandonarComunidad,
                            onCancel: () => console.log("Cancelaste abandonar"),
                            })
                        setModalAbierto(true)
                    }}>Abandonar</Button>
                    </div>}

                    {isMiComunidad && (
                        <div className="inline-block w-32">
                        <Button size="lg" className="w-full" variant="danger" onClick={() => {
                            setModalData({
                            title: "¿Suspender comunidad?",
                            description: `¿Deseas suspender la comunidad "${title}"?`,
                            buttonLabel: "Suspender",
                            onConfirm: async () => {
                                console.log("Comunidad suspendida:", id)
                                return true
                            },
                            onCancel: () => console.log("Cancelado"),
                            })
                            setModalAbierto(true)
                        }}>
                            Suspender
                        </Button>
                        </div>
                    )}
                    
                </div>

                
            </div>
            <AlertModal
            open={modalAbierto}
            setOpen={setModalAbierto}
            title={modalData.title}
            description={modalData.description}
            buttonLabel={modalData.buttonLabel}
            onConfirm={modalData.onConfirm}
            onCancel={modalData.onCancel}
            />
        </div>
    );
}

export default CardMisComunidades;