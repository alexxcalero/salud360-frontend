import sobreNosotrosImage2 from "@/assets/sobreNosotros2.png"
import ImageSectionRight from "@/components/landing/ImageSectionRight";

function NuestraVision(){
    return (
        <ImageSectionRight 
            image={sobreNosotrosImage2} 
            h1={"Nuestra visión"} 
            h3={"Somos una plataforma dedicada a temas de salud y fitness. Buscamos que nuestros usuarios puedan crecer gracias a nuestros planes. "} />
    );
}

export default NuestraVision;