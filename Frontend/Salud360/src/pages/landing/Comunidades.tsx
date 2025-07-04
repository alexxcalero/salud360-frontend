import Button from "@/components/Button";
import HeroComunidades from "@/components/landing/HeroComunidades";
import ComunidadesImage1 from "@/assets/comunidades1.png";
import ListaComunidades from "@/components/landing/ListaComunidades";
import { useEffect } from "react";
import { useNavigate } from "react-router";

function Comunidades(){
    useEffect(() => {
            window.scrollTo(0, 0); //Para que apenas cargue aparezca en el tope de la página.
    }, []);

    const navigate = useNavigate();

    return (
        <div>
            <title>Lista de comunidades</title>
            <HeroComunidades/>
            <section className="flex flex-col gap-32 my-32">
                <section id="sobreLasComunidades" className="bg-white scroll-mt-18">
                    <div className="grid grid-cols-2 items-center my-4 mx-32">
                        <div className="col-span-1 h-full flex flex-col justify-center gap-8 text-left px-8">
                            <h1>Sobre las comunidades</h1>
                            <hr />
                            <div>
                                <p>En Salud360 creemos que el crecimiento personal se potencia cuando compartimos metas, intereses y experiencias con otros.</p>
                                <br />
                                <p>Nuestras comunidades están pensadas para conectar personas que buscan mejorar su bienestar físico, mental y emocional. Ya sea que estés dando tus primeros pasos en el mundo del fitness, quieras retomar hábitos saludables o busques motivación constante, aquí encontrarás el entorno ideal.
                                </p>
                                <br />  
                                <p>Únete, comparte, aprende y crece junto a quienes también han decidido transformar su vida.</p>
                            </div>

                            <div className="inline-block w-48">
                                <Button size="lg" className="w-full" onClick={() => navigate("/RegistroUsuario")}>Suscríbete</Button>
                            </div>  

                        </div>
                        <div className="col-span-1 h-full">
                            <img src={ComunidadesImage1} alt="" className="w-full h-full object-cover"/>
                        </div>
                    </div>
                </section>

                <section id="localesComunidades" className="bg-white scroll-mt-18 p-8">
                    <div className="flex flex-col gap-8 mx-32">
                        <div className="flex flex-col text-left gap-8">
                            <h1>Explorar Comunidades</h1>
                            <hr />
                            <br />
                        </div>

                        <div className="flex justify-center">
                            <ListaComunidades/>
                        </div>

                        

                    </div>

                </section>

            </section>

        </div>
    );
}

export default Comunidades;