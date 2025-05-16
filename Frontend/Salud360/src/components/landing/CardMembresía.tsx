import { useNavigate } from "react-router";
import Button from "../Button";

interface Props{
    membresia: any;
    servicios: any;
}

function CardMembresia({membresia, servicios}: Props){

    const navigate = useNavigate();

    return(
        <div className="flex flex-col py-4 px-4 w-[400px] bg-white border-2 border-black rounded-xl gap-2">
            <div className="flex flex-col gap-4">
                <h1 className="font-extrabold">{membresia.nombre}</h1>
                <p className="font-bold">{membresia.maxReservas == "-1" ? 
                    "Sin tope: Usos ilimitados durante el periodo activo" 
                    :
                    `Con tope: ${membresia.maxReservas} usos al mes hasta agotarse`
                    }
                </p>
                <h2 className="font-extrabold">S/. {membresia.precio}</h2>
                <Button size="lg" variant="outline" className="mx-2" onClick={() => navigate("/RegistroUsuario")}>SUSCRÍBETE HOY</Button>
            
            </div>
            <div className="p-2">
                <hr className="border border-black"/>
            </div>
            
            <div className="">
                <p className="font-bold">✓ {membresia.descripcion}</p>
            </div>

            <div className="p-2">
                <hr className="border border-black"/>
            </div>

            <div className="text-left flex flex-col gap-4">
                <p className="font-bold mx-2">Servicios Incluidos:</p>
                <div>
                    {servicios.map((servicio: any, i: number) => (
                        <div key={i} className="inline-block m-2 bg-white border py-2 px-4 border-black rounded-xl">
                            <p className="font-bold">{servicio.nombre}</p>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}

export default CardMembresia;