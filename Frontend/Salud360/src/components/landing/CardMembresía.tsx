import { useNavigate } from "react-router";
import Button from "../Button";
import { IComunidad } from "@/models/comunidad";
import { IMembresia } from "@/models/membresia";
import { setPendingMembership } from "@/lib/pendingMembership";
import React, { useContext } from "react";
import { AuthContext } from "@/hooks/AuthContext";
import { Ban, CircleMinus } from "lucide-react";

interface Props{
    comunidad: IComunidad;
    membresia: IMembresia;
    servicios: any;
    readOnly?: boolean;
    hideButtons?: boolean;
    flujoUsuario?: boolean;
    activa?: boolean;
    inactiva?: boolean;
    onClick?: () => void;
    onCancelar?: () => void;
    onSuspender?: () => void;
}

function 
CardMembresia({membresia, comunidad, servicios, readOnly = false, hideButtons = false, flujoUsuario = false, activa = false, inactiva = false, onClick = () =>{}, onCancelar = () =>{}, onSuspender = () =>{},}: Props){
  const navigate = useNavigate();
  const {usuario} = useContext(AuthContext)
  
  //console.log("readOnly", readOnly)
  //console.log("hideButtons", hideButtons)
  //console.log("inactiva", inactiva)

  //console.log("Total:", readOnly && hideButtons && activa)
  
  return (
    <div className={`${(readOnly && hideButtons && !activa) ? 'relative' : ''}`}>
      {/* Overlay oscuro */}
      {readOnly && hideButtons && !activa && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/60 rounded-xl z-50"></div>
      )}
      
      

      <div className={`flex flex-col py-4 px-4 w-[400px] h-full bg-white border-2 rounded-xl gap-2 ${(readOnly && hideButtons && activa) ? 'border-emerald-400' : 'border-black'}`}>
        <div className="flex flex-col gap-4">
          <h1 className="font-extrabold">{membresia.nombre}</h1>
          <p className="font-bold">
            {!membresia.maxReservas || membresia.maxReservas === -1
              ? "Sin tope: Usos ilimitados durante el periodo activo"
              : `Con tope: ${membresia.maxReservas} usos al mes hasta agotarse`}
          </p>
          <h2 className="font-extrabold">S/. {membresia.precio}</h2>
          {!readOnly && (
            <Button
              size="lg"
              variant="outline"
              className="mx-2"
              onClick={() => {
                setPendingMembership(comunidad, membresia);
                const ruta = usuario ? "/usuario/pasarela-pagos/" : "/RegistroUsuario";
                navigate(ruta);
              }}
            >
              SUSCRÍBETE HOY
            </Button>
          )}
        </div>
        <div className="p-2">
          <hr className="border border-black" />
        </div>
        <div className="p-2">
          <p className="font-bold">✓ {membresia.descripcion}</p>
        </div>
        <div className="p-2">
          <hr className="border border-black" />
        </div>
        <div className="text-left flex flex-col gap-4">
          <p className="font-bold mx-2">Servicios Incluidos:</p>
          <div>
            {comunidad?.servicios?.map((servicio: any, i: number) => (
              <React.Fragment key={i}>
                <div
                  key={i}
                  className="inline-block m-2 bg-white border py-2 px-4 border-black rounded-xl"
                >
                  <p className="font-bold">{servicio.nombre}</p>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="mt-4">
          {(readOnly && !flujoUsuario && !hideButtons) && (
            <Button size="lg" variant="outline" onClick={onClick}>
              Volver
            </Button>
          )}
        </div>
        
        {flujoUsuario && (
          <div className="flex flex-row justify-around">
            <Button size="lg" variant="outlineDanger" onClick={onSuspender}>
              <CircleMinus />
              Suspender
            </Button>
            <Button size="lg" variant="danger" onClick={onCancelar}>
              <Ban />
              Cancelar
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CardMembresia;
