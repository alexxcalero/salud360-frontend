import { useState } from "react";
import CardMedico from "./CardMedico";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props{
    medicos: any;
}

function CarrouselMedicos({medicos}: Props){

    const [currentIndex, setCurrentIndex] = useState(0);
    const cardWidth = 330;
    const xMargin = 20;
    //const showButton = true;
    const visibleCount = 4;
    const totalSize = medicos.length;
    const showCarrousel = totalSize >= visibleCount;

    const handleNext = () => {
        if (currentIndex + visibleCount < totalSize) {
        setCurrentIndex((i) => i + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
        setCurrentIndex((i) => i - 1);
        }
    };

    //console.log("En carrouselMedicos, los medicos son:", medicos)

    return(
        <section>
            <div className="flex justify-between items-center px-32">
                {showCarrousel && <button onClick={handlePrev} disabled={currentIndex === 0}
                className={`w-10 h-10 p-2 ${"text-white bg-[#2A86FF]"} rounded-full disabled:opacity-50 ${!(currentIndex === 0) && 'cursor-pointer'}`}>
                    <ChevronLeft />
                </button>}

                <div className="w-full max-w-[1400px] mx-auto overflow-hidden py-8">
                    <div className={`${showCarrousel ? 'flex transition-transform duration-500' : 'flex flex-row justify-center'}`}
                        style={showCarrousel
                            ? {
                                transform: `translateX(-${currentIndex * (cardWidth + xMargin)}px)`,
                                width: `${medicos.length * (cardWidth + xMargin)}px`,
                                }
                            : {}}>
                        {medicos.map((medico: any) => (
                            <div
                                key={medico.idMedico}
                                className="shrink-0 mx-[10px]"
                                style={{ width: `${cardWidth}px` }}
                            >
                                <CardMedico medico={medico} />
                            </div>
                        ))}
                    </div>
                </div>

                {showCarrousel && <button
                    onClick={handleNext}
                    disabled={currentIndex + visibleCount >= totalSize}
                    className={`w-10 h-10 p-2 ${"text-white bg-[#2A86FF]"} rounded-full disabled:opacity-50 ${!(currentIndex + visibleCount >= totalSize) && 'cursor-pointer'}`}
                >
                    <ChevronRight />
                </button>}
            </div>
        </section>
    );
}

export default CarrouselMedicos;