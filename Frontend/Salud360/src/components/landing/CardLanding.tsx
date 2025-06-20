import Button from "../Button";
import { Link } from "react-router";

interface Props{
    id: string;
    image: string;
    title: string;
    subtitle: string;
    showButton?: boolean;
}

function CardLanding({id, image, title, subtitle, showButton=true}: Props){
    return(
        <div className="w-[330px] h-[460px] grid grid-rows-2 rounded-sm border shadow-xl" aria-label={`card-${title}`}>
            <div className="row-span-1">
                <img src={image ? (image.startsWith("http") || image.startsWith("data:")? image: `http://localhost:8080/api/archivo/${image}`)
                : "https://png.pngtree.com/png-clipart/20201224/ourmid/pngtree-panda-bamboo-bamboo-shoots-simple-strokes-cartoon-with-pictures-small-fresh-png-image_2625172.jpg"}alt="imagen"
                className="w-full h-full object-cover"/>
            </div>
            <div className="row-span-1 flex flex-col gap-8 text-left p-4 bg-white text-black">
                <p className="font-bold">{title}</p>
                <p>{subtitle}</p>
                <div className="inline-block w-32">
                    {showButton &&
                        <Link to={`/comunidades/detalle/${id}`}>
                            <Button size="lg" className="w-full">Explorar más</Button>
                        </Link>
                    }
                </div>
            </div>
            
        </div>
    );
}

export default CardLanding;