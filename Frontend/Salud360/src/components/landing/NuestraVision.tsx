import sobreNosotrosImage3 from "@/assets/sobreNosotros3.png"
import ImageSectionRight from "@/components/landing/ImageSectionRight";

function NuestraVision(){
    return (
        <ImageSectionRight
            id="nuestraVision"
            image={sobreNosotrosImage3} 
            h1={"Nuestra visión"} 
            h3={"Queremos ser una plataforma líder en el área del bienestar. Mejorando nuestros servicios a favor y con los usuarios. Creciendo como empresa al lado de nuestros usuarios."} />
    );
}

export default NuestraVision;