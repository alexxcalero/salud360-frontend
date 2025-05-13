import heroImage from "@/assets/hero.png"
import Button from "../Button";

function Hero(){
    return(
        <section className="relative w-full h-screen">
            <div className=" absolute inset-0 bg-cover bg-top" style={{
                backgroundImage: `url(${heroImage})`,
                backgroundSize: "contain", 
                backgroundRepeat: "no-repeat"   
            }}>

                <div className="grid grid-cols-2 items-center">
                    <div className="col-span-1 flex-col justify-center items-center text-white text-left pl-8">
                        <h1>Calma tu mente y transforma tu vida</h1>
                        <h3>En monos supremos creemos que el bienestar se construye en Comunidad. Únete, muévete y crece con nosotros</h3>
                        <Button size="lg">Únete aquí</Button>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default Hero;


{/*<img src={heroImage} alt="Mujer sobre pelota de yoga" /> */}