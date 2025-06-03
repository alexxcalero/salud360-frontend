import DAB from "@/assets/DAB.jpg";
import Button from "../Button";
import { useNavigate } from "react-router";

interface Props{
    local: any;
}

function CardLocal({local}: Props){

    //console.log("En CardLocal, el local es:", local)
    const navigate = useNavigate();

    return(
        <div className="w-[1500px] h-[600px] relative flex flex-row justify-center items-center">
            <div className="absolute left-[200px] top-1/2 -translate-y-1/2">
                <img src={DAB} alt="" className="object-cover shadow-xl"/>
            </div>
            <div className="flex flex-col gap-16 m-8 py-8 pr-8 pl-144 bg-gray-50 border border-[#2A86FF] rounded-xl justify-center">
                <h2>{local.nombre}</h2>
                <div className="flex flex-row justify-around gap-16 text-left">
                    <div className="flex flex-col gap-4">
                        <p className="font-bold">HORARIO:</p>
                        <div className="flex flex-col gap-2">
                            <p>Lun a Vie : 6am - 11pm</p>
                            <p>Sab y Feriados: 6am - 4pm</p>
                            <p>Dom: 7am - 1pm</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <p className="font-bold">UBICACIÓN:</p>
                        <div className="flex flex-col gap-2">
                            <p>{local.direccion}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <Button variant="primary" size="lg" onClick={() => navigate(`horarios`)}>Reservar Clase</Button>
                </div>
            </div>
        </div>
    );
}

export default CardLocal;

/*<img src={DAB}/>*/