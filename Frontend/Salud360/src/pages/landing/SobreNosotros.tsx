import HeroSobreNosotros from "@/components/landing/HeroSobreNosotros";
import NuestraVision from "@/components/landing/NuestraVision";
import QuienesSomos from "@/components/landing/QuienesSomos";

function SobreNosotros(){
    return(
        <div>
            <HeroSobreNosotros/>
            <div className="flex flex-col gap-8 my-32">
                <QuienesSomos/>
                <NuestraVision/>
            </div>
            
        </div>
    );
}

export default SobreNosotros;