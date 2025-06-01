
import { useState } from "react";
import CardLocal from "./CardLocal";

interface Props{
    locales: any;
}

function CarrouselLocales({locales}: any){

    const [currentIndex, setCurrentIndex] = useState(0);
    const cardWidth = 1500;
    const xMargin = 20;
    const showButton = true;
    const totalSize = locales.length;

    const handleNext = () => {
        if (currentIndex < locales.length - 1) {
        setCurrentIndex((i) => i + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
        setCurrentIndex((i) => i - 1);
        }
    };

    return (
        <section className="relative w-full">
            <div className="flex justify-between items-center px-32">
                <button onClick={handlePrev} disabled={currentIndex === 0}
                className={`w-10 h-10 p-2 ${"text-white bg-[#2A86FF]"} rounded-full disabled:opacity-50 ${!(currentIndex === 0) && 'cursor-pointer'}`}>
                    ←
                </button>

                <div className="overflow-hidden w-full max-w-[1520px] mx-auto">
                    <div
                        className="flex transition-transform duration-500"
                        style={{
                            transform: `translateX(-${currentIndex * (cardWidth + xMargin)}px)`,
                            width: `${locales.length * (cardWidth + xMargin)}px`,
                        }}
                    >
                        {locales.map((local: any) => (
                            <div
                                key={local.idLocal}
                                className="shrink-0 mx-[10px]"
                                style={{ width: `${cardWidth}px` }}
                            >
                                <CardLocal local={local} />
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleNext}
                    disabled={currentIndex >= locales.length - 1}
                    className={`w-10 h-10 p-2 ${"text-white bg-[#2A86FF]"} rounded-full disabled:opacity-50 ${!(currentIndex >= totalSize) && 'cursor-pointer'}`}
                >
                    →
                </button>
            </div>
        </section>
    );
}

export default CarrouselLocales;