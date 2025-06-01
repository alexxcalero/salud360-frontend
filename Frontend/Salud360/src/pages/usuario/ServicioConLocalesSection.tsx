import CarrouselLocales from "@/components/usuario/CarrouselLocales";

interface Props{
    servicio: any
}

function ServicioConLocalesSection({servicio}: Props){
    return (
        <section className="flex flex-col gap-16">
          <div className="text-left flex flex-col gap-2">
            <h3>Únete a nuestros distintos locales de {servicio.tipo}</h3>
            <hr className="border border-gray-500"/>
          </div>
          
          <CarrouselLocales locales={servicio.locales}/>
        </section>
    )
}

export default ServicioConLocalesSection;