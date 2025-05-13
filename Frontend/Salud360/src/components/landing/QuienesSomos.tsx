import sobreNosotrosImage1 from "@/assets/sobreNosotros1.png"
import ImageSectionLeft from "@/components/landing/ImageSectionLeft";

function QuienesSomos(){
    return (
        <ImageSectionLeft 
            image={sobreNosotrosImage1} 
            h1={"¿Quiénes somos?"} 
            h3={"Somos una plataforma dedicada a temas de salud y fitness. Buscamos que nuestros usuarios puedan crecer gracias a nuestros planes. "} />
    );
}

export default QuienesSomos;