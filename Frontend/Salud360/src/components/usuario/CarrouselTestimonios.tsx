import { useState } from "react";
import TestimonioCard from "./TestimonioCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  testimonios: any[];
  usuario?: { idCliente?: number };
  onAddClick?: () => void;
  onEdit?: (testimonio: any) => void;
  onDelete?: (id: number) => void;
}


function CarrouselTestimonios({ testimonios, usuario, onEdit, onDelete, onAddClick }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardWidth = 330;
  const xMargin = 20;
  const visibleCount = 2;
  const totalSize = testimonios.length + 1; // +1 por el botón "Añadir"

  const showCarrousel = totalSize >= visibleCount;

  const handleNext = () => {
    if (currentIndex + visibleCount < totalSize) setCurrentIndex((i) => i + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  };

  return (
    <section>
      <div className="flex justify-between items-center px-32">
        {showCarrousel && (
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="w-10 h-10 p-2 text-white bg-[#2A86FF] rounded-full disabled:opacity-50"
          >
            <ChevronLeft />
          </button>
        )}

        <div className="w-full max-w-[690px] mx-auto overflow-hidden py-8">
          <div
            className="flex transition-transform duration-500"
            style={{
              transform: `translateX(-${currentIndex * (cardWidth + xMargin)}px)`,
              width: `${totalSize * (cardWidth + xMargin)}px`,
            }}
          >
            {testimonios.map((t) => (
              <div key={t.idTestimonio} className="shrink-0 mx-[10px]" style={{ width: `${cardWidth}px` }}>
                <TestimonioCard
                  testimonio={t}
                  usuario={usuario}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              </div>
            ))}

            <div className="shrink-0 mx-[10px]" style={{ width: `${cardWidth}px` }}>
              <div className="border rounded shadow-sm p-4 flex flex-col items-center justify-center h-full">
                <p className="text-center font-medium mb-2">¿Deseas colocar tu opinión?</p>
                <button
                  onClick={onAddClick}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Añadir comentario
                </button>
              </div>
            </div>
          </div>
        </div>

        {showCarrousel && (
          <button
            onClick={handleNext}
            disabled={currentIndex + visibleCount >= totalSize}
            className="w-10 h-10 p-2 text-white bg-[#2A86FF] rounded-full disabled:opacity-50"
          >
            <ChevronRight />
          </button>
        )}
      </div>
    </section>
    

    
  );
}

export default CarrouselTestimonios;

