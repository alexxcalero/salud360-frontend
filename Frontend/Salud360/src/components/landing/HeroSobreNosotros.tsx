import heroImage from "@/assets/heroSobreNosotros.png"

function HeroSobreNosotros(){
    return (
        <section className="relative w-full">
            <img src={heroImage} alt="Mujer sobre pelota de yoga" className="w-full object-cover" />

            <div className="absolute inset-0 bg-black/30"></div> {/*Oscurece un poco la imagen*/}

            <div className="absolute inset-0 flex flex-col justify-center items-center gap-4 text-white">
                <h1 className="use-title-large">SALUD 360</h1>
                <h3>Dando una vuelta de 360° a la salud.</h3>
            </div>

        </section>
    );
}

export default HeroSobreNosotros;