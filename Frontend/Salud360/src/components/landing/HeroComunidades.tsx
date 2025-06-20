import heroImage from "@/assets/heroComunidades.png"
//import Button from "../Button";

function HeroComunidades(){
    return(
        <section className="relative w-full">
            <img src={heroImage} alt="Mujer sobre pelota de yoga" className="w-full object-cover" />

            <div className="absolute inset-0 bg-black/30"></div> {/*Oscurece un poco la imagen*/}

            <div className="absolute inset-0 grid grid-cols-3 items-center">
                <div className="col-span-1 flex flex-col justify-center gap-4 text-white text-left pl-16">
                    <h1 className="use-title-large">Comunidades</h1>
                    <h3>Únete a comunidades con tus mismos intereses y objetivos.</h3>
                    <h3>Nútrete de ellos.</h3>   
                </div>
            </div>
        </section>
    );
}

export default HeroComunidades