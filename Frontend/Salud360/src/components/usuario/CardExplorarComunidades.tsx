import { useNavigate } from "react-router";
import Button from "../Button";

interface Props{
    id: string;
    image: string;
    title: string;
    subtitle: string;
    showButton?: boolean;
    isMiComunidad?: boolean;
}
//mb r  showButton=true
function CardExplorarComunidades({id, image, title, subtitle, isMiComunidad=false}: Props){

    const navigate = useNavigate();
      const imagenFinal =
    image?.startsWith("http") || image?.startsWith("data:")
      ? image
      : image
        ? `http://localhost:8080/api/archivo/${image}`
        : "https://png.pngtree.com/png-clipart/20201224/ourmid/pngtree-panda-bamboo-bamboo-shoots-simple-strokes-cartoon-with-pictures-small-fresh-png-image_2625172.jpg";

        
    return (
        <div className="w-[450px] h-[550px] grid grid-rows-2 rounded-sm border border-[#2A86FF] shadow-xl">
            <div className="row-span-1">
                <img src={imagenFinal}  alt="imagen"  className="w-full h-full object-cover"/>
            </div>
            <div className="row-span-1 flex flex-col gap-8 justify-between text-left p-4 bg-white text-black">
                <p className="font-bold">{title}</p>
                <p>{subtitle}</p>


                <div className="flex flex-row justify-between">
                    {!isMiComunidad && <div className="inline-block w-32">
                        <Button size="lg" className="w-full" onClick={() => navigate(`/usuario/comunidades/detalle/${id}/membresia`)}>Inscribirse</Button>
                    </div>}

                    <div className="inline-block w-32">
                        <Button size="lg" className="w-full" onClick={() => navigate(`/usuario/comunidades/detalle/${id}`)}>{isMiComunidad ? 'Ver' : 'Información'}</Button>
                    </div>

                    {isMiComunidad && <div className="inline-block w-32">
                        <Button size="lg" className="w-full" variant="danger" onClick={() => navigate(`/usuario/comunidades/detalle/${id}`)}>Abandonar</Button>
                    </div>}
                    
                </div>

                
            </div>
        </div>
    );
}

export default CardExplorarComunidades;