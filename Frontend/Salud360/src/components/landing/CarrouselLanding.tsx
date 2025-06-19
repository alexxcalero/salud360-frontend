import { ChevronLeft, ChevronRight } from "lucide-react";
import CardLanding from "./CardLanding";

interface Props{
    module: any;
    currentIndex: number;
    cardWidth: number;
    xMargin: number;
    visibleCount: number;
    totalSize: number;
    handleNext: () => void;
    handlePrev: () => void;
    showButton?: boolean;
}

function CarrouselLanding({module, currentIndex, cardWidth, xMargin, visibleCount, totalSize, handleNext, handlePrev, showButton=true}: Props){



    function transformarImagen(imagen:String){
      return(imagen && (imagen.startsWith("http") || imagen.startsWith("data:"))
      ? imagen
      : imagen
        ? `http://localhost:8080/api/archivo/${imagen}`
        : "https://png.pngtree.com/png-clipart/20201224/ourmid/pngtree-panda-bamboo-bamboo-shoots-simple-strokes-cartoon-with-pictures-small-fresh-png-image_2625172.jpg");
    }


    return(
        <section className="flex flex-row gap-4 justify-center items-center">
            <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`w-10 h-10 p-2 ${showButton == true ? "text-white bg-[#2A86FF]" : "text-[#2A86FF] bg-white"} rounded-full disabled:opacity-50 ${!(currentIndex === 0) && 'cursor-pointer'}`}
            >
            <ChevronLeft />
            </button>

            <div className="relative w-[1088px] overflow-hidden">
            <div className="flex transition-transform duration-500 ease-in-out" style={{
                transform: `translateX(-${currentIndex * (cardWidth + xMargin)}px)`,
                width: `${totalSize * (cardWidth + xMargin)}px`
            }}>
                {module.map((comunidad: any, i: number) => (
                <div key={i}
                    className="w-[320px] shrink-0 mx-4 py-8"
                    style={{ width: `${cardWidth}px` }}>

                    <CardLanding key={comunidad.idComunidad}
                    id={comunidad.idComunidad}
                    image={transformarImagen(comunidad.imagen)}
                    title={comunidad.nombre} subtitle={comunidad.descripcion} 
                    showButton={showButton}/>

                </div>
                ))}
            </div>
            </div>

            <button
            onClick={handleNext}
            disabled={currentIndex + visibleCount  >= totalSize}
            className={`w-10 h-10 p-2 ${showButton == true ? "text-white bg-[#2A86FF]" : "text-[#2A86FF] bg-white"} rounded-full disabled:opacity-50 ${!(currentIndex + visibleCount  >= totalSize) && 'cursor-pointer'}`}
            >
            <ChevronRight />
            </button>
                


        </section>
    );
}

export default CarrouselLanding;