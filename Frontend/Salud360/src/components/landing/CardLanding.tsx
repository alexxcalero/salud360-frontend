import { ReactNode } from "react";
import Button from "../Button";
import { useNavigate } from "react-router";

interface Props{
    id: string;
    image: string;
    title: string;
    subtitle: string;
    showButton?: boolean;
}

function CardLanding({id, image, title, subtitle, showButton=true}: Props){

    const navigate = useNavigate();

    return(
        <div className="w-[330px] h-[460px] grid grid-rows-2 rounded-sm border shadow-xl">
            <div className="row-span-1">
                <img src={image} alt="imagen" className="w-full h-full object-cover" />
            </div>
            <div className="row-span-1 flex flex-col gap-8 text-left p-4 bg-white text-black">
                <p className="font-bold">{title}</p>
                <p>{subtitle}</p>
                <div className="inline-block w-32">
                    {showButton && <Button size="lg" className="w-full" onClick={() => navigate(`/comunidades/detalle/${id}`)}>Explorar más</Button>}
                </div>
            </div>
            
        </div>
    );
}

export default CardLanding;