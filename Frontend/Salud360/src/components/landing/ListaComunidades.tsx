import  { useEffect, useState} from "react";
import CardLanding from "./CardLanding";
import { Carrot, ChartArea } from "lucide-react";
import CarrouselLanding from "./CarrouselLanding";
import { baseAPI } from "@/services/baseAPI";

function ListaComunidades(){
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const [comunidades, setComunidades] = useState([]);
    const cardWidth = 330;
    const xMargin = 32;
    const visibleCount = 3;

    const fetchComunidades = () => {
    baseAPI.get("/comunidades/activas", {
      auth: {
        username: "admin",
        password: "admin123"
      }
    })
      .then(res => {
        //console.log("Datos cargados:", res.data); // VER ESTO EN LA CONSOLA
        setComunidades(res.data);
        //console.log("Comunidades:", res.data);
      })
      .catch(err => console.error("Error cargando comunidades", err));
    }

    useEffect(() => {
        fetchComunidades();
    }, []);

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

    const totalSize = comunidades.length

    return (
        <CarrouselLanding 
          module={comunidades} 
          currentIndex={currentIndex}
          cardWidth={cardWidth}
          xMargin={xMargin}
          visibleCount={visibleCount}
          totalSize={totalSize}
          handleNext={handleNext}
          handlePrev={handlePrev}
          />
    );
}

export default ListaComunidades;

{/*
          <CardLanding key={1}
                    image="https://png.pngtree.com/png-clipart/20201224/ourmid/pngtree-panda-bamboo-bamboo-shoots-simple-strokes-cartoon-with-pictures-small-fresh-png-image_2625172.jpg"
                    title="hola" subtitle="hola pobres" /> */}


{/*
  <div className="flex flex-row gap-8 border border-rose-500 px-4">
            <CardLanding key={1}
                    image="https://png.pngtree.com/png-clipart/20201224/ourmid/pngtree-panda-bamboo-bamboo-shoots-simple-strokes-cartoon-with-pictures-small-fresh-png-image_2625172.jpg"
                    title="hola" subtitle="hola pobres" />
              <CardLanding key={1}
              image="https://png.pngtree.com/png-clipart/20201224/ourmid/pngtree-panda-bamboo-bamboo-shoots-simple-strokes-cartoon-with-pictures-small-fresh-png-image_2625172.jpg"
              title="hola" subtitle="hola pobres" />
              <CardLanding key={1}
              image="https://png.pngtree.com/png-clipart/20201224/ourmid/pngtree-panda-bamboo-bamboo-shoots-simple-strokes-cartoon-with-pictures-small-fresh-png-image_2625172.jpg"
              title="hola" subtitle="hola pobres" />
          </div>

          <br />
  
  */}


  {/*<section className="flex flex-row gap-4 justify-center items-center">
          
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`w-10 h-10 p-2 text-white bg-[#2A86FF] rounded-full disabled:opacity-50 ${!(currentIndex === 0) && 'cursor-pointer'}`}
          >
            ←
          </button>

          <div className="relative w-[1088px] overflow-hidden">
            <div className="flex transition-transform duration-500 ease-in-out" style={{
              transform: `translateX(-${currentIndex * (cardWidth + xMargin)}px)`,
              width: `${totalSize * (cardWidth + xMargin)}px`
            }}>
              {comunidades.map((comunidad: any, i) => (
                <div key={i}
                  className="w-[320px] shrink-0 mx-4 py-8"
                  style={{ width: `${cardWidth}px` }}>

                  <CardLanding key={comunidad.idComunidad}
                    id={comunidad.idComunidad}
                    image={"https://png.pngtree.com/png-clipart/20201224/ourmid/pngtree-panda-bamboo-bamboo-shoots-simple-strokes-cartoon-with-pictures-small-fresh-png-image_2625172.jpg"}
                    title={comunidad.nombre} subtitle={comunidad.descripcion} />

                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={currentIndex + visibleCount  >= comunidades.length}
            className={`w-10 h-10 p-2 text-white bg-[#2A86FF] rounded-full disabled:opacity-50 ${!(currentIndex + visibleCount  >= comunidades.length) && 'cursor-pointer'}`}
          >
            →
          </button>
              


      </section> */}