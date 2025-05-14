import sobreNosotrosImage3 from "@/assets/sobreNosotros3.png"
import ImageSectionLeft from "@/components/landing/ImageSectionLeft";

function NuestraVision(){
    return (
        <ImageSectionLeft
            image={sobreNosotrosImage3} 
            h1={"Nuestra visión"} 
            h3={"Queremos ser una plataforma líder en el área del bienestar. Mejorando nuestros servicios a favor y con los usuarios. Creciendo como empresa al lado de nuestros usuarios."} />
    );
}

export default NuestraVision;