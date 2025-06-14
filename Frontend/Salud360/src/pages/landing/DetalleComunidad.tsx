import  { useEffect, useState} from "react";
import axios from "axios";
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

function DetalleComunidad(){

    const [comunidad, setComunidad] = useState<any>({});
    const [servicios, setServicios] = useState([]);
    const [membresias, setMembresias] = useState([]);
    const {id} = useParams();
    

    const fetchComunidad = () => {
    axios.get(`http://localhost:8080/api/comunidades/${id}`, {
      auth: {
        username: "admin",
        password: "admin123"
      }
    })
      .then(res => {
        //console.log("Datos cargados:", res.data); // VER ESTO EN LA CONSOLA
        setComunidad(res.data);
        console.log("Comunidad:", res.data);
        setServicios(res.data.servicios);
        //console.log("Servicios de la comunidad 1:", res.data.servicios);
        //console.log("Servicios de la comunidad 2:", servicios);
        setMembresias(res.data.membresias);
      })
      .catch(err => console.error("Error cargando comunidad", err));
    }

    useEffect(() => {
        fetchComunidad();
    }, []);

    //console.log("Comunidad:", comunidad);
    console.log("Servicios de la comunidad:", servicios);


    //console.log("Membresía 2:", membresias);

    servicios.map((servicio: any, _: number) => (
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
                                <Button size="lg" className="w-full" onClick={() => navigate("/RegistroUsuario")}>Suscríbete</Button>
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
                        {servicios.map((servicio: any, i: number) => (
                            <div key={servicio.idServicio}>
                                {i % 2 === 0 ? (
                                <ImageSectionLeft
                                    image={Imagen}
                                    h1={servicio.nombre}
                                    h3={servicio.descripcion}
                                />
                                ) : (
                                <ImageSectionRight
                                    image={Imagen}
                                    h1={servicio.nombre}
                                    h3={servicio.descripcion}
                                />
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                <section className="relative bg-[#2A86FF] overflow-visible mb-20">
                    <img src={abstractImage} alt="abstraction" className="inset-0 w-full h-[650px] object-cover opacity-5" />
                    <div className="absolute inset-0 flex flex-col items-center py-8">
                        <h1 className="text-white">PAQUETES DE MEMBRESÍA</h1>

                        <div className="flex flex-row m-8 gap-12">
                            {/*CUANDO FUNCIONE REEMPLAZAR POR EL CODIGO DE ABAJO */}
                            {membresias.map((membresia: any, i: number) => (
                                <div key={i}>
                                    <CardMembresia membresia={membresia} servicios={servicios}/>
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