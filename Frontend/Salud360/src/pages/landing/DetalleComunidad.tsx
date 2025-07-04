import  { useEffect, useState} from "react";
import heroImage from "@/assets/heroComunidades.png"
import detalleComunidadImage1 from "@/assets/detalleComunidad1.png"
import HeroDetalleComunidad from "@/components/landing/HeroDetalleComunidad";
import { useNavigate, useParams } from "react-router";
import Button from "@/components/Button";
import ImageSectionRight from "@/components/landing/ImageSectionRight";
import ImageSectionLeft from "@/components/landing/ImageSectionLeft";
import abstractImage from "@/assets/abstractMembresías.jpg"

import Imagen from "@/assets/detalleComunidadX.png"
import CardMembresia from "@/components/landing/CardMembresía";
import { IComunidad } from "@/models/comunidad";
import { baseAPI } from "@/services/baseAPI";
import { useRef } from "react"; // para direccionar a membresia :v

function DetalleComunidad(){

    const [comunidad, setComunidad] = useState<IComunidad>({});
    const {id} = useParams();
    const membresiasRef = useRef<HTMLDivElement>(null);

    const fetchComunidad = () => {
    baseAPI.get(`/comunidades/${id}`, {
      auth: {
        username: "admin",
        password: "admin123"
      }
    })
      .then(res => {
        //console.log("Datos cargados:", res.data); // VER ESTO EN LA CONSOLA
        setComunidad(res.data);
        console.log("Comunidad:", res.data);
        //console.log("Servicios de la comunidad 1:", res.data.servicios);
        //console.log("Servicios de la comunidad 2:", servicios);
      })
      .catch(err => console.error("Error cargando comunidad", err));
    }

    
    useEffect(() => {
        fetchComunidad();
    }, []);

    const imagen = comunidad.imagen;

  const imagenFinal =
    imagen && (imagen.startsWith("http") || imagen.startsWith("data:"))
      ? imagen
      : imagen
        ? `http://localhost:8080/api/archivo/${imagen}`
        : "https://png.pngtree.com/png-clipart/20201224/ourmid/pngtree-panda-bamboo-bamboo-shoots-simple-strokes-cartoon-with-pictures-small-fresh-png-image_2625172.jpg";


    //console.log("Comunidad:", comunidad);
    console.log("Servicios de la comunidad:", comunidad.servicios);


    //console.log("Membresía 2:", membresias);

    comunidad?.servicios?.map((servicio: any, _: number) => (
        console.log("LA DESCRIPCIÓN es:", servicio.descripcion)
    ))

    
    


    useEffect(() => {
        window.scrollTo(0, 0); //Para que apenas cargue aparezca en el tope de la página.
    }, []);

    useEffect(() => {
        document.title = `Detalle de la comunidad ${comunidad.nombre}`
    }, [comunidad])

    const navigate = useNavigate();

    return(
        <div>
            <title>Detalle de la comunidad</title>
            <HeroDetalleComunidad image={heroImage} title={comunidad?.nombre ?? ""}/>
            
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
                                <Button size="lg" className="w-full" onClick={() => membresiasRef.current?.scrollIntoView({ behavior: "smooth" })}> 
                                    Suscríbete </Button>
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
                        {comunidad.servicios?.map((servicio: any, i: number) => {
                        const imagenServicio =
                            servicio.imagen
                            ? servicio.imagen.startsWith("http") || servicio.imagen.startsWith("data:")
                                ? servicio.imagen
                                : `http://localhost:8080/api/archivo/${servicio.imagen}`
                            : "https://png.pngtree.com/png-clipart/20201224/ourmid/pngtree-panda-bamboo-bamboo-shoots-simple-strokes-cartoon-with-pictures-small-fresh-png-image_2625172.jpg";

                        return (
                            <div key={servicio.idServicio}>
                            {i % 2 === 0 ? (
                                <ImageSectionLeft
                                image={imagenServicio}
                                h1={servicio.nombre}
                                h3={servicio.descripcion}
                                />
                            ) : (
                                <ImageSectionRight
                                image={imagenServicio}
                                h1={servicio.nombre}
                                h3={servicio.descripcion}
                                />
                            )}
                            </div>
                        );
                        })}
                    </div>
                </section>

                <section 
                    ref={membresiasRef}
                    className="relative bg-[#2A86FF] overflow-visible mb-20">
                    <img src={abstractImage} alt="abstraction" className="inset-0 w-full h-[650px] object-cover opacity-5" />
                    <div className="absolute inset-0 flex flex-col items-center py-8">
                        <h1 className="text-white">PAQUETES DE MEMBRESÍA</h1>

                        <div className="flex flex-row m-8 gap-12">
                            {/*CUANDO FUNCIONE REEMPLAZAR POR EL CODIGO DE ABAJO */}
                            {comunidad?.membresias?.map((membresia: any, i: number) => (
                                <div key={i}>
                                    <CardMembresia membresia={membresia} comunidad={comunidad} servicios={comunidad.servicios}/>
                                </div>
                            ))}
                        </div>

                    </div>
                    
                </section>

                <section className="">

                </section>



            </section>
        </div>
    );
}

export default DetalleComunidad;

{/** */}