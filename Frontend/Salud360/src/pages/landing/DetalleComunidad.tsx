import  { useEffect, useState} from "react";
import axios from "axios";
import heroImage from "@/assets/heroComunidades.png"
import detalleComunidadImage1 from "@/assets/detalleComunidad1.png"
import HeroDetalleComunidad from "@/components/landing/HeroDetalleComunidad";
import { useParams } from "react-router";
import Button from "@/components/Button";

function DetalleComunidad(){

    const [comunidad, setComunidad] = useState<any>({});
    const {id} = useParams();

    const fetchComunidad = () => {
    axios.get(`http://localhost:8080/api/comunidades/${id}`, {
      auth: {
        username: "admin",
        password: "admin123"
      }
    })
      .then(res => {
        console.log("Datos cargados:", res.data); // VER ESTO EN LA CONSOLA
        setComunidad(res.data);
        console.log("Comunidad:", res.data);
      })
      .catch(err => console.error("Error cargando comunidad", err));
    }

    useEffect(() => {
        fetchComunidad();
    }, []);


    useEffect(() => {
        window.scrollTo(0, 0); //Para que apenas cargue aparezca en el tope de la página.
    }, []);


    return(
        <div>
            <HeroDetalleComunidad image={heroImage} title={comunidad.nombre}/>
            
            <section className="flex flex-col gap-32 my-32">
                <section className="bg-white">
                    <div className="grid grid-cols-2 items-center my-4 mx-32">
                        <div className="col-span-1 h-full flex flex-col justify-center gap-8 text-left px-8">
                            <h1>¿Quiénes Somos?</h1>
                            <hr />
                            <div>
                                <p>{comunidad.descripcion}.</p>
                                <p>{comunidad.proposito}.</p>
                            </div>

                            <div className="inline-block w-48">
                                <Button size="lg" className="w-full">Suscríbete</Button>
                            </div>  

                        </div>
                        <div className="col-span-1 h-full">
                            <img src={detalleComunidadImage1} alt="" className="w-full h-full object-cover"/>
                        </div>
                    </div>
                </section>

                <section className="bg-white">
                    <div className="flex flex-col gap-8">
                        <h1>NUESTROS SERVICIOS</h1>
                        <p>Messi</p>
                    </div>
                </section>

            </section>
        </div>
    );
}

export default DetalleComunidad;