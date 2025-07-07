import CardLanding from "@/components/landing/CardLanding";
import CardExplorarComunidades from "@/components/usuario/CardExplorarComunidades";
import { baseAPI } from "@/services/baseAPI";
import { AuthContext } from "@/hooks/AuthContext";
import axios from "axios";
import { Section } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router";
import Button from "@/components/Button";

function ExplorarComunidades(){

    const [comunidades, setComunidades] = useState([]);

    const { usuario, logout, loading } = useContext(AuthContext);
    
    if (loading || !usuario) return null;
  
    const id = usuario.idCliente;

    const fetchComunidades = () => {
      baseAPI.get("/cliente/excluyendo-cliente", {
        params: {
          idCliente: id,
        },
        auth: {
          username: "admin",
          password: "admin123",
        },
      })
        .then((res) => {
          setComunidades(res.data);
        })
        .catch((err) => {
          console.error("Error cargando comunidades:", err);
        });
    };


    useEffect(() => {
        fetchComunidades();
    }, []);

    function transformarImagen(imagen: string){
      return(imagen && (imagen.startsWith("http") || imagen.startsWith("data:"))
      ? imagen
      : imagen
        ? `http://localhost:8080/api/archivo/${imagen}`
        : "https://png.pngtree.com/png-clipart/20201224/ourmid/pngtree-panda-bamboo-bamboo-shoots-simple-strokes-cartoon-with-pictures-small-fresh-png-image_2625172.jpg");
    }


    return(
        <section className="flex flex-col gap-16">
            <title>Explorar comunidades</title>
            <div className="w-full flex flex-col gap-4 justify-center py-8 px-32">
                <div className="flex gap-4 justify-between items-center">
                  <h1>Explorar Comunidades</h1>
                  <NavLink to="/usuario/comunidades/">
                    <Button size="lg" className="w-64">Comunidades activas</Button>
                  </NavLink>
                </div>
                <hr/>
            </div>

            <div className="mx-auto grid grid-cols-3 gap-16 justify-center mb-16">
                {comunidades.map((comunidad: any) => (
                    <div className="col-span-1">

                        <CardLanding key={comunidad.idComunidad}
                    id={comunidad.idComunidad}
                    image={transformarImagen(comunidad.imagen)}
                    title={comunidad.nombre} subtitle={comunidad.descripcion} 
                    showButton={true}/>
                        
                    </div>
                ))}
            </div>

        </section>
    );
}

export default ExplorarComunidades;