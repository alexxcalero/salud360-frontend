import HeroDetalleComunidad from "@/components/landing/HeroDetalleComunidad";
import heroImage from "@/assets/heroComunidades.png"
import axios from "axios";
import { useEffect} from "react";
import { Outlet, useParams } from "react-router";
import { useComunidad } from "@/hooks/ComunidadContext";
import DetalleComunidadNavbar from "@/components/usuario/DetalleComunidadNavbar";

function DetalleComunidadLayout(){
    
    const {comunidad, setComunidad, loading, setLoading} = useComunidad();
    const {id} = useParams();
    

    const fetchComunidad = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:8080/api/comunidades/${id}`, {
          auth: {
            username: "admin",
            password: "admin123",
          },
        });
        console.log("Ahora es:", res.data)
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


    return(
        
        <section>
            <HeroDetalleComunidad image={heroImage} title={comunidad.nombre}/>
            <DetalleComunidadNavbar/>
            <Outlet />
        </section>
    )
}

export default DetalleComunidadLayout;