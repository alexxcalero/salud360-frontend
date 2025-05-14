interface Props{
    image: string;
    title: string;
}

function HeroDetalleComunidad({image, title}: Props){
    return (
        <section className="relative w-full">
            <img src={image} alt="Mujer sobre pelota de yoga" className="w-full object-cover" />

            <div className="absolute inset-0 bg-black/30"></div> {/*Oscurece un poco la imagen*/}

            <div className="absolute inset-0 flex flex-col justify-center items-center gap-4 text-white">
                <h1 className="use-title-large">{title}</h1>
            </div>

        </section>
    );
}

export default HeroDetalleComunidad;