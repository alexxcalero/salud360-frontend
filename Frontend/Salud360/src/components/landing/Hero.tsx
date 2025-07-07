import heroImage from "@/assets/hero.png"
import Button from "../Button";
import { useNavigate } from "react-router";
import { AuthContext } from "@/hooks/AuthContext";
import { useContext } from "react";

function Hero(){
    //rb r logout,
    const {usuario,   loading} = useContext(AuthContext)
      
    if (loading) return null;

    //console.log("En el hero, usuario es:", usuario)

    const navigate = useNavigate();

    return(
        <section className="relative w-full">
            <img src={heroImage} alt="Mujer sobre pelota de yoga" className="w-full object-cover" />

            <div className="absolute inset-0 bg-black/30"></div> {/*Oscurece un poco la imagen*/}

            <div className="absolute inset-0 grid grid-cols-3 items-center">
                <div className="col-span-1 flex flex-col justify-center gap-4 text-white text-left pl-16">
                    <h1 className="use-title-large">Calma tu mente y transforma tu vida</h1>
                    <h3>En Monos Supremos creemos que el bienestar se construye en Comunidad. Únete, muévete y crece con nosotros.</h3>
                    <div className="inline-block w-64"> {/*Inline block para que el div se comporte como un contenedor de ancho fijo (dentro de un flex/grid puede perder dicho comportamiento) */}
                        {usuario == null && <Button size="lg" className="w-full" onClick={() => navigate("/RegistroUsuario")}>Únete aquí</Button>}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;


{/*<img src={heroImage} alt="Mujer sobre pelota de yoga" /> */}


/*<div className=" absolute inset-0 bg-cover bg-top" style={{
                backgroundImage: `url(${heroImage})`,
                backgroundSize: "contain", 
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center"
   
            }}> 
</div>*/