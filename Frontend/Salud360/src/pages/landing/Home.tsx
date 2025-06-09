import Hero from "@/components/landing/Hero";
import ListaComunidades from "@/components/landing/ListaComunidades";
import ListaLocales from "@/components/landing/ListaLocales";
import { useEffect } from "react";

function Home(){

    useEffect(() => {
        window.scrollTo(0, 0); //Para que apenas cargue aparezca en el tope de la página.
    }, []);

    return (
        <div>
            <title>Salud 360</title>
            <Hero/>

            <section className="flex flex-col gap-8">
                <section id="comunidadesHome" className="bg-white my-16 p-8 text-black scroll-mt-18">
                    <div className="flex flex-col gap-8">
                        <h1>COMUNIDADES</h1>
                        <h2>¡Descubre y forma parte de nuestras comunidades!</h2>
                        <hr className="border border-black"/>
                        <div className="flex justify-center">
                            <ListaComunidades/>
                        </div>
                    </div>
                </section>

                <section id="localesHome" className="bg-[#2A86FF] mt-16 p-8 text-white scroll-mt-18">
                    <div className="flex flex-col gap-8">
                        <h1>LOCALES</h1>
                        <h2>¡Descubre y visita uno de nuestros locales en todo el Perú!</h2>
                        <hr className="border border-white"/>
                        <ListaLocales/>
                    </div>
                </section>

            </section>
        </div>
    )
}

export default Home;