import sobreNosotrosImage2 from "@/assets/sobreNosotros2.png"
import ImageSectionLeft from "@/components/landing/ImageSectionLeft";


function NuestraMision(){
    return (
        <ImageSectionLeft
            id="nuestraMision"
            image={sobreNosotrosImage2} 
            h1={"Nuestra misión"} 
            h3={"Buscamos mejorar la salud de nuestros usuarios. Ofrecíendoles espacios para sus actividades como disposición a los mejores profesionales médicos del Perú."} />
    );
}

export default NuestraMision;