import Button from "@/components/Button";
import CardExplorarComunidades from "@/components/usuario/CardExplorarComunidades";
import { AuthContext } from "@/hooks/AuthContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router";
import { AlertTriangle } from "lucide-react";

function Comunidades(){
    
    //const [comunidades, setComunidades] = useState([]);
    const {usuario, logout, loading} = useContext(AuthContext);
      

    if (loading || !usuario) return null;

    const id = usuario.idUsuario;

    //setComunidades(usuario.comunidades)
    
    const comunidades = usuario.comunidades;
    console.log("Las comunidades del usuario son:", comunidades)
    const tieneComunidades = comunidades.length !== 0

    useEffect(() => {
        window.scrollTo(0, 0); //Para que apenas cargue aparezca en el tope de la página.
    }, []);

    return(
        <section className="flex flex-col gap-16">
            <title>Mis comunidades</title>
            <div className="flex flex-row justify-between items-center py-8 px-32 ">
                <h1>Mis comunidades</h1>
                {tieneComunidades && <div>
                    <p>Activas</p>
                    {/*Tengo que instalar el switch de shadcn pero el p$%@ npm no me deja. Será para luego */}
                </div>}
                <NavLink to="/usuario/comunidades/explorarComunidades"><Button size="lg" className="w-64">Explorar Más</Button></NavLink>
            </div>

            {!tieneComunidades ? (
              <div className="text-center flex flex-col items-center gap-4 mt-32">
                <AlertTriangle className="text-red-500 w-32 h-32" />
                <h1>NO PERTENECES A NINGUNA COMUNIDAD.</h1>
                <h3>Haz click en <span className="text-[#2A86FF] italic">Explorar Más</span> para ver las comunidades que tenemos para ti.</h3>
              </div>
            ):(
              <div className="mx-auto grid grid-cols-3 gap-16 justify-center mb-16">
                {comunidades.map((comunidad: any) => (
                    <div className="col-span-1">
                        <CardExplorarComunidades key={comunidad.idComunidad}
                        id={comunidad.idComunidad}
                        image={"https://png.pngtree.com/png-clipart/20201224/ourmid/pngtree-panda-bamboo-bamboo-shoots-simple-strokes-cartoon-with-pictures-small-fresh-png-image_2625172.jpg"}
                        title={comunidad.nombre} 
                        subtitle={comunidad.descripcion}
                        isMiComunidad={true} 
                        />  
                    </div>
                ))}
            </div>
            )}
        </section>
    )
}

export default Comunidades;