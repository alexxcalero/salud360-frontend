interface Props{
    id?: string,
    image: string,
    h1: string;
    h3: string;
}

function ImageSectionLeft({id="", image, h1, h3}: Props){
    return(
        <section id={id} className="bg-white relative w-full"> {/*NOTA: USAR RELATIVE W-FULL Y LUEGO OBJECT-COVER EN EL IMG SOLO FUNCIONA PORQUE LAS IMAGENES TIENEN EL MISMO TAMAñO  */}
            <div className="grid grid-cols-2 items-center my-4 mx-32 h-[768px]">
                <div className="col-span-1 flex justify-start z-20">
                    <div className="flex flex-col gap-8 py-8 xl:py-32 pr-16 w-full bg-[#2A86FF] text-white text-right rounded-2xl">
                        <h1>{h1}</h1>
                        <h3>{h3}</h3>
                    </div>
                </div>
                <div className="col-span-1 flex justify-end z-20 h-full overflow-hidden rounded-4xl -ml-4">
                    <img src={image} alt="" className="w-full h-full object-cover"/>
                </div>
            </div>
        </section>
    );
}

export default ImageSectionLeft;