import HeroSobreNosotros from "@/components/landing/HeroSobreNosotros";
import NuestraMision from "@/components/landing/NuestraMision";
import NuestraVision from "@/components/landing/NuestraVision";
import QuienesSomos from "@/components/landing/QuienesSomos";
import { useEffect } from "react";

function SobreNosotros(){
    useEffect(() => {
            window.scrollTo(0, 0); //Para que apenas cargue aparezca en el tope de la página.
        }, []);
    
    return(
        <div>
            <title>Sobre Nosotros</title>
            <HeroSobreNosotros/>
            <div className="flex flex-col gap-8 my-32">
                <QuienesSomos/>
                <NuestraMision/>
                <NuestraVision/>
            </div>
            
        </div>
    );
}

export default SobreNosotros;