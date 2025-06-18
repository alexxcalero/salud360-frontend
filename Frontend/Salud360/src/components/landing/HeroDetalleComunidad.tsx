import { useComunidad } from "@/hooks/ComunidadContext";

interface Props{
    image: string;
    title: string;
}

function HeroDetalleComunidad() {
  const { comunidad } = useComunidad();

  const imagenFinal =
    comunidad.imagen && (comunidad.imagen.startsWith("http") || comunidad.imagen.startsWith("data:"))
      ? comunidad.imagen
      : comunidad.imagen
      ? `http://localhost:8080/api/archivo/${comunidad.imagen}`
      : "https://png.pngtree.com/png-clipart/20201224/ourmid/pngtree-panda-bamboo-bamboo-shoots-simple-strokes-cartoon-with-pictures-small-fresh-png-image_2625172.jpg";

  return (
    <section className="relative w-full h-[600px] mt-16">
      <img
        src={imagenFinal}
        alt="Imagen de la comunidad"
        className="w-full h-full object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "https://png.pngtree.com/png-clipart/20201224/ourmid/pngtree-panda-bamboo-bamboo-shoots-simple-strokes-cartoon-with-pictures-small-fresh-png-image_2625172.jpg";
        }}
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 flex flex-col justify-center items-center gap-4 text-white">
        <h1 className="use-title-large text-center">Comunidad de {comunidad.nombre}</h1>
      </div>
    </section>
  );
}

export default HeroDetalleComunidad;