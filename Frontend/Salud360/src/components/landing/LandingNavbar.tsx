import UnderConstruction from "@/pages/UnderConstruction";
import logo from "@/assets/logo.png";
import { Link } from "react-router";
import Button from "../Button";

function LandingNavbar(){
    return(
        <header className="fixed top-0 left-0 w-full bg-[#2A86FF] py-5">
            <nav>
                <div className="grid grid-cols-12 gap-6 items-center">
                    <div className="col-span-3 px-8">
                        <img src={logo} alt="Logo" className="cursor-pointer"/>
                    </div>
                    <div className="flex justify-center text-white font-semibold align-center col-span-6">
                        <ul className="flex gap-24">
                            <li><Link to="/">Inicio</Link></li>
                            <li><Link to="/">Comunidades</Link></li>
                            <li><Link to="/">Sobre Nosotros</Link></li>
                        </ul>
                    </div>
                    <div className="flex justify-end col-span-3 px-8 gap-6">
                        <Button variant="white">Registrate</Button>
                        <Button variant="white">Iniciar Sesion</Button>
                    </div>
                </div>            
            </nav>
        </header>
    )
}

export default LandingNavbar;