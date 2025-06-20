import CardLanding from "@/components/landing/CardLanding";
import CardExplorarComunidades from "@/components/usuario/CardExplorarComunidades";
import { baseAPI } from "@/services/baseAPI";
import { Section } from "lucide-react";
import { useEffect, useState } from "react";

function ExplorarComunidades(){

    const [comunidades, setComunidades] = useState([]);

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

    function transformarImagen(imagen:String){
      return(imagen && (imagen.startsWith("http") || imagen.startsWith("data:"))
      ? imagen
      : imagen
        ? `http://localhost:8080/api/archivo/${imagen}`
        : "https://png.pngtree.com/png-clipart/20201224/ourmid/pngtree-panda-bamboo-bamboo-shoots-simple-strokes-cartoon-with-pictures-small-fresh-png-image_2625172.jpg");
    }


    return(
        <section className="flex flex-col gap-16">
            <title>Explorar comunidades</title>
            <div className="w-full flex flex-col gap-4 justify-center p-8">
                <h1>Explorar Comunidades</h1>
                <hr/>
            </div>

            <div className="mx-auto grid grid-cols-3 gap-16 justify-center mb-16">
                {comunidades.map((comunidad: any) => (
                    <div className="col-span-1">

                        <CardLanding key={comunidad.idComunidad}
                    id={comunidad.idComunidad}
                    image={transformarImagen(comunidad.imagen)}
                    title={comunidad.nombre} subtitle={comunidad.descripcion} 
                    showButton={true}/>
                        
                    </div>
                ))}
            </div>

        </section>
    );
}

export default ExplorarComunidades;