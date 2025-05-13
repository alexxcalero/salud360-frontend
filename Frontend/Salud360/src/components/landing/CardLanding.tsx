import { ReactNode } from "react";
import Button from "../Button";

interface Props{
    image: string;
    title: string;
    subtitle: string;
}

function CardLanding({image, title, subtitle}: Props){
    return(
        <div className="grid grid-rows-2 auto-cols-max rounded-sm border border-rose-600">
            <div className="row-span-1">
                <img src={image} alt="imagen" />
            </div>
            <div className="row-span-1 flex flex-col items-center gap-8">
                <h3>{title}</h3>
                <p>{subtitle}</p>
                <div className="inline-block w-32">
                    <Button size="lg" className="w-full">Explorar más</Button>
                </div>
            </div>
            
        </div>
    );
}

export default CardLanding;