import Button from "@/components/Button";
import { AuthContext } from "@/hooks/AuthContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router";

function Comunidades(){
    /*
    const [comunidades, setComunidades] = useState([]);
    const {usuario, logout, loading} = useContext(AuthContext)
      
    if (loading || !usuario) return null;

    const id = usuario.idUsuario;

    const fetchComunidad = () => {
    axios.get(`http://localhost:8080/api/personas/${id}`, {
      auth: {
        username: "admin",
        password: "admin123"
      }
    })
      .then(res => {
        console.log("Datos cargados:", res.data); 
        setComunidades(res.data.comunidades);
      })
      .catch(err => console.error("Error cargando comunidad", err));
    }

    useEffect(() => {
        fetchComunidad();
    }, []);*/

    useEffect(() => {
            window.scrollTo(0, 0); //Para que apenas cargue aparezca en el tope de la página.
    }, []);

    return(
        <section>
            <div className="flex flex-row justify-between items-center py-8 px-32 ">
                <h1>Comunidades</h1>
                <div>
                    <p>Activas</p>
                    {/*Tengo que instalar el switch de shadcn pero el p$%@ npm no me deja. Será para luego */}
                </div>
                <NavLink to="/usuario/comunidades/explorarComunidades"><Button size="lg" className="w-64">Explorar Más</Button></NavLink>
            </div>


            <div>

            </div>

        </section>
    )
}

export default Comunidades;