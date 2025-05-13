import sobreNosotrosImage1 from "@/assets/sobreNosotros1.png"

function QuienesSomos(){
    return (
        <section className="bg-white relative w-full"> {/*NOTA: USAR RELATIVE W-FULL Y LUEGO OBJECT-COVER EN EL IMG SOLO FUNCIONA PORQUE LAS IMAGENES TIENEN EL MISMO TAMAñO  */}
            <div className="grid grid-cols-2 items-center my-4 mx-32"> {/*Lo correcto seria forzar una altura fija, pero pueden tener problemas con la responsiveness */}
                <div className="col-span-1 flex justify-end z-20">
                    <img src={sobreNosotrosImage1} alt="" className="w-full object-cover"/>
                </div>
                <div className="col-span-1 flex justify-start">
                    <div className="flex flex-col gap-8 py-32 pl-16 bg-[#2A86FF] text-white text-left rounded-2xl -ml-4">
                        <h1>¿Quiénes somos?</h1>
                        <h3>Somos una plataforma dedicada a temas de salud y fitness. Buscamos que nuestros usuarios
                            puedan crecer gracias a nuestros planes.
                        </h3>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default QuienesSomos;