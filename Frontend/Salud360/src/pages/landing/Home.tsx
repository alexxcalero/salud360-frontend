import Hero from "@/components/landing/Hero";
import UnderConstruction from "../UnderConstruction";
import ListaComunidades from "@/components/landing/ListaComunidades";
import ListaLocales from "@/components/landing/ListaLocales";

function Home(){
    return (
        <div>

            <Hero/>

            <section className="flex flex-col gap-8">
                <section className="bg-white my-16 p-8 text-black">
                    <div className="flex flex-col gap-8">
                        <h1>COMUNIDADES</h1>
                        <h2>¡Descubre y forma parte de nuestras comunidades!</h2>
                        <hr className="border border-black"/>
                        <ListaComunidades/>
                    </div>
                </section>

                <section className="bg-[#2A86FF] my-16 p-8 text-white">
                    <div className="flex flex-col gap-8">
                        <h1>LOCALES</h1>
                        <h2>¡Descubre y visita uno de nuestros locales en todo el Perú!</h2>
                        <hr className="border border-white"/>
                        <ListaLocales/>
                    </div>
                </section>

            </section>


            <UnderConstruction/>
            <h1 className="bg-emerald-500">Revisar main.tsx para ver las rutas</h1>
            <UnderConstruction/>
            <h1 className="bg-emerald-500">Revisar main.tsx para ver las rutas</h1>
            <UnderConstruction/>
        </div>
    )
}

export default Home;