import CardExplorarComunidades from "@/components/usuario/CardExplorarComunidades";
import axios from "axios";
import { Section } from "lucide-react";
import { useEffect, useState } from "react";

function ExplorarComunidades(){

    const [comunidades, setComunidades] = useState([]);

    const fetchComunidades = () => {
    axios.get("http://localhost:8080/api/comunidades", {
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

    return(
        <section className="flex flex-col gap-16">

            <div className="w-full flex flex-col gap-4 justify-center p-8">
                <h1>Explorar Comunidades</h1>
                <hr/>
            </div>

            <div className="mx-auto grid grid-cols-3 gap-16 justify-center mb-16">
                {comunidades.map((comunidad: any) => (
                    <div className="col-span-1">

                        <CardExplorarComunidades key={comunidad.idComunidad}
                        id={comunidad.idComunidad}
                        image={"https://png.pngtree.com/png-clipart/20201224/ourmid/pngtree-panda-bamboo-bamboo-shoots-simple-strokes-cartoon-with-pictures-small-fresh-png-image_2625172.jpg"}
                        title={comunidad.nombre} 
                        subtitle={comunidad.descripcion} 
                        />
                        
                    </div>
                ))}
            </div>

        </section>
    );
}

export default ExplorarComunidades;