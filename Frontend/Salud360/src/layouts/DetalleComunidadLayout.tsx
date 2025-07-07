import HeroDetalleComunidad from "@/components/landing/HeroDetalleComunidad";
import heroImage from "@/assets/heroComunidades.png"
import { useEffect} from "react";
import { Outlet, useParams } from "react-router";
import { useComunidad } from "@/hooks/ComunidadContext";
import DetalleComunidadNavbar from "@/components/usuario/DetalleComunidadNavbar";
import { baseAPI } from "@/services/baseAPI";

function DetalleComunidadLayout(){
    
    const {comunidad, setComunidad, loading, setLoading} = useComunidad();
    const {id} = useParams();
    

    const fetchComunidad = async () => {
      setLoading(true);
      try {
        const res = await baseAPI.get(`/comunidades/${id}`, {
          auth: {
            username: "admin",
            password: "admin123",
          },
        });
        //console.log("Comunidad en Flujo Usuario:", res.data)
        setComunidad(res.data);
      } catch (error) {
        console.error("Error cargando comunidad", error);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
        fetchComunidad();
    }, []);

    if (loading || !comunidad) return null;

    //LOGICA DE HERODETALLECOMUNIDAD

  // ⚠️ Verificamos que comunidad esté cargada y tenga imagen
  const imagen = comunidad.imagen;

  const imagenFinal =
    imagen && (imagen.startsWith("http") || imagen.startsWith("data:"))
      ? imagen
      : imagen
        ? `http://localhost:8080/api/archivo/${imagen}`
        : "https://png.pngtree.com/png-clipart/20201224/ourmid/pngtree-panda-bamboo-bamboo-shoots-simple-strokes-cartoon-with-pictures-small-fresh-png-image_2625172.jpg";

      

    return(
        
        <section>
            <title>Detalle comunidad</title>
            <HeroDetalleComunidad image={imagenFinal} title={comunidad.nombre}/>
            <DetalleComunidadNavbar/>
            <Outlet />
        </section>
    )
}

export default DetalleComunidadLayout;