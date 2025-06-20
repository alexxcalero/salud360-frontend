//import UnderConstruction from "@/pages/UnderConstruction";
import logo from "@/assets/logo.png";
import { Link, NavLink } from "react-router";
import Button from "../Button";
import { AuthContext } from "@/hooks/AuthContext";
import { useContext } from "react";
import NotificationIcon from "../usuario/NotificationIcon";
import ProfileIcon from "../usuario/ProfileIcon";
//import { Bell } from "lucide-react";

function LandingNavbar(){
    //rb r , logout
    const {usuario} = useContext(AuthContext)

    console.log("En el landing, usuario es:", usuario)

    return(
        <header className="sticky top-0 left-0 w-full bg-[#2A86FF] py-5 z-100"> {/*El z-10 es para que nada le pase por encima. Puede ser cualquier número alto.*/}
            <nav>
                <div className="grid grid-cols-12 gap-6 items-center">
                    <div className="col-span-3 px-8">
                        <Link to="/"><img src={logo} alt="Logo" className="cursor-pointer"/></Link>
                    </div>
                    <div className="flex justify-center text-white font-semibold align-center col-span-6">
                        <ul className="flex gap-24">
                            <li><Link to="/">Inicio</Link></li>
                            <li><Link to="/comunidades">Comunidades</Link></li>
                            <li><Link to="/sobreNosotros">Sobre Nosotros</Link></li>
                        </ul>
                    </div>
                    <div className="flex justify-end col-span-3 px-8 gap-6">

                        {usuario ? (
                            <>
                            <div className="mt-3 flex flex-row justify-between gap-6">
                                {usuario.rol?.idRol != 1 && <NotificationIcon/>}
                                <ProfileIcon/>
                            </div>
                            </>
                        ):(
                            
                            <>
                            <NavLink to="/RegistroUsuario"> <Button variant="white">Registrate</Button> </NavLink>
                            <NavLink to="/IniciarSesionUsuario"> <Button variant="white">Iniciar Sesion</Button> </NavLink>
                            </>
                        )
                        }
                    </div>
                </div>            
            </nav>
        </header>
    )
}

export default LandingNavbar;