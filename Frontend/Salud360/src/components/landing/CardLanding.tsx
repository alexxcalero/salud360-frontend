import { ReactNode } from "react";
import Button from "../Button";

interface Props{
    image: string;
    title: string;
    subtitle: string;
}

function CardLanding({image, title, subtitle}: Props){
    return(
        <div className="w-[330px] h-[460px] grid grid-rows-2 rounded-sm border shadow-xl">
            <div className="row-span-1">
                <img src={image} alt="imagen" className="w-full h-full object-cover" />
            </div>
            <div className="row-span-1 flex flex-col gap-8 text-left p-4">
                <p className="font-bold">{title}</p>
                <p>{subtitle}</p>
                <div className="inline-block w-32">
                    <Button size="lg" className="w-full">Explorar más</Button>
                </div>
            </div>
            
        </div>
    );
}

export default CardLanding;