import LandingNavbar from "@/components/landing/LandingNavbar";
import { Outlet } from "react-router";

function LandingLayout(){
    return (
        <div className="min-w-[100dvw] min-h-[100dvh]">
            <LandingNavbar/>
            <Outlet/>
        </div>
    )
}

export default LandingLayout;