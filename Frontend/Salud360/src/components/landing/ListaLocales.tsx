import  { useEffect, useState} from "react";
import CardLanding from "./CardLanding";
import CarrouselLanding from "./CarrouselLanding";
import { baseAPI } from "@/services/baseAPI";

function ListaLocales(){
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const [locales, setLocales] = useState([]);
    const cardWidth = 330;
    const xMargin = 32;
    const visibleCount = 3;

    const fetchLocales = () => {
    baseAPI.get("/locales", {
      auth: {
        username: "admin",
        password: "admin123"
      }
    })
      .then(res => {
        //console.log("Datos cargados:", res.data); // VER ESTO EN LA CONSOLA
        setLocales(res.data);
        //console.log("Locales:", res.data);
      })
      .catch(err => console.error("Error cargando locales", err));
    }

    useEffect(() => {
        fetchLocales();
    }, []);

    //xd

    const handleNext = () => {

      if (currentIndex + visibleCount < totalSize){
        setCurrentIndex(currentIndex + 1);
      }

    };

    const handlePrev = () => {
      if (currentIndex > 0){
        setCurrentIndex(currentIndex - 1);
      }
    };

    const totalSize = locales.length

    return (
      <CarrouselLanding 
          module={locales} 
          currentIndex={currentIndex}
          cardWidth={cardWidth}
          xMargin={xMargin}
          visibleCount={visibleCount}
          totalSize={totalSize}
          handleNext={handleNext}
          handlePrev={handlePrev}
          showButton={false}
          />
        
    );
}

export default ListaLocales;

{/*<section className="flex flex-row gap-4 justify-center items-center">
          
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`w-10 h-10 p-2 text-[#2A86FF] bg-white rounded-full disabled:opacity-50 ${!(currentIndex === 0) && 'cursor-pointer'}`}
          >
            ←
          </button>

          <div className="relative w-[1088px] overflow-hidden">
            <div className="flex transition-transform duration-500 ease-in-out" style={{
              transform: `translateX(-${currentIndex * (cardWidth + xMargin)}px)`,
              width: `${locales.length * (cardWidth + xMargin)}px`
            }}>
              {locales.map((local: any, i) => (
                <div key={i}
                  className="w-[320px] shrink-0 mx-4 py-8"
                  style={{ width: `${cardWidth}px` }}>

                  <CardLanding key={local.idComunidad}
                    id={local.idComunidad}
                    image="https://png.pngtree.com/png-clipart/20201224/ourmid/pngtree-panda-bamboo-bamboo-shoots-simple-strokes-cartoon-with-pictures-small-fresh-png-image_2625172.jpg"
                    title={local.nombre} subtitle={local.descripcion} />

                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={currentIndex + visibleCount  >= locales.length}
            className={`w-10 h-10 p-2 text-[#2A86FF] bg-white rounded-full disabled:opacity-50 ${!(currentIndex + visibleCount  >= locales.length) && 'cursor-pointer'}`}
          >
            →
          </button>
              


      </section> */}