import  { useEffect, useState} from "react";
import axios from "axios";
import CardLanding from "./CardLanding";

function ListaComunidades(){
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const [comunidades, setComunidades] = useState([]);
    const pageSize = 3;

    const fetchComunidades = () => {
    axios.get("http://localhost:8080/api/comunidades", {
      auth: {
        username: "admin",
        password: "admin123"
      }
    })
      .then(res => {
        console.log("Datos cargados:", res.data); // VER ESTO EN LA CONSOLA
        setComunidades(res.data);
        console.log("Comunidades:", res.data);
      })
      .catch(err => console.error("Error cargando comunidades", err));
    }

    useEffect(() => {
        fetchComunidades();
    }, []);

    //xd

    const handleNext = () => {

      console.log(currentIndex, comunidades.slice(currentIndex, currentIndex + pageSize));

      if (currentIndex + pageSize < comunidades.length){
        setCurrentIndex(currentIndex + pageSize);
      }

      console.log(currentIndex, comunidades.slice(currentIndex, currentIndex + pageSize));

    };

    const handlePrev = () => {
      if (currentIndex - pageSize >= 0){
        setCurrentIndex(currentIndex - pageSize);
      }
    };



    return (

      <section className="flex flex-row gap-4">
          
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="p-2 text-white bg-blue-500 rounded-full disabled:opacity-50"
          >
            ←
          </button>


          <div className="grid grid-cols-3 gap-8">
            {comunidades.slice(currentIndex, currentIndex + pageSize).map((comunidad: any, i) => (
              <CardLanding key={i}
                image="https://png.pngtree.com/png-clipart/20201224/ourmid/pngtree-panda-bamboo-bamboo-shoots-simple-strokes-cartoon-with-pictures-small-fresh-png-image_2625172.jpg"
                title={comunidad.nombre} subtitle={comunidad.descripcion} />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={currentIndex + pageSize >= comunidades.length}
            className="p-2 text-white bg-blue-500 rounded-full disabled:opacity-50"
          >
            →
          </button>
              


      </section>
        
    );
}

export default ListaComunidades;