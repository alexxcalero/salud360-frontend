import heroImage from "@/assets/hero.png"

function Hero(){
    return(
        <section className="relative">
            <img src={heroImage} alt="Mujer sobre pelota de yoga" />
        </section>
    );
}

export default Hero;