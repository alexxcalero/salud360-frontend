import { useNavigate } from "react-router";
import Button from "../Button";
import { useState } from "react"
import AlertModal from "@/components/modals/alertModal"
import { baseAPI } from "@/services/baseAPI";
import { Ban, CircleMinus, Eye, RotateCcw } from "lucide-react";

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
    activo?: boolean;
    onAbandonar?: () => void;
    onSuspender?: () => void;
    onReactivar?: () => void;
}

function CardMisComunidades({id, image, title, subtitle, afiliacion, showButton=true, activo=false, onAbandonar = () =>{}, onSuspender = () =>{}, onReactivar = () =>{}}: Props){

    const navigate = useNavigate();

    


    return (
        <div className="w-[450px] h-[550px] grid grid-rows-2 rounded-sm border border-[#2A86FF] shadow-xl">
            <div className="row-span-1">
                <img src={image} alt="imagen" className="w-full h-full object-cover" />
            </div>
            <div className="row-span-1 flex flex-col gap-8 justify-between text-left p-4 bg-white text-black">
                <p className="font-bold">{title}</p>
                <p>{subtitle}</p>


                <div className="flex flex-row justify-between">

                    {activo ? 
                    <>
                        <div className="inline-block w-32">
                            <Button size="lg" className="w-full" onClick={() => navigate(`/usuario/comunidades/detalle/${id}`)}>
                                <Eye/>
                                Ver
                            </Button>
                        </div>

                        <div className="inline-block w-32">
                            <Button size="lg" className="w-full" variant="outlineDanger" onClick={onSuspender}>
                                <CircleMinus />
                                Suspender
                            </Button>
                        </div>

                        <div className="inline-block w-32">
                            <Button size="lg" className="w-full" variant="danger" onClick={onAbandonar}>
                                <Ban />
                                Abandonar
                            </Button>
                        </div>

                    </>
                    :
                    <>
                        <div className="inline-block w-32">
                            <Button size="lg" className="w-full" onClick={onReactivar}>
                                <RotateCcw/>
                                Reactivar
                            </Button>
                        </div>
                    </>
                    }
                </div>

                
            </div>

            

        </div>
    );
}

export default CardMisComunidades;