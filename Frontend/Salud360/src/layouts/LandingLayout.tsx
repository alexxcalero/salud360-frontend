import Hero from "@/components/landing/Hero";
import LandingNavbar from "@/components/landing/LandingNavbar";
import { Outlet } from "react-router";

function LandingLayout(){
    return (
        <div className="min-w-[100dvw] min-h-[100dvh]">
            <LandingNavbar/>
            <div className="mt-20"></div> {/*Estamos colocando el navbar como fijo, y siempre que hacemos eso tapa el contenido de debajo. Para revertirlo colocamos este div (para que "empuje" hacia arriba el navbar) */}
            <Hero/>
            <Outlet/>
        </div>
    )
}

export default LandingLayout;