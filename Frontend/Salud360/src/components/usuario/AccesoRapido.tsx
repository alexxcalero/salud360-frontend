import { useNavigate } from "react-router";

interface Props{
    icon: React.ReactNode,
    title: string,
    subtitle: string,
    route: string,
}

function AccesoRapido({icon, title, subtitle, route}: Props){

    const navigate = useNavigate();

    return (
        <div className="w-[360px] flex flex-row border items-center justify-between gap-8 bg-gray-50 border-[#2A86FF] rounded-xl p-8 cursor-pointer" 
        onClick={() => navigate(route)}>
            {icon}
            <div className="flex flex-col gap-2 text-left">
                <h2>{title}</h2>
                <div className="w-fit bg-[#13C296]/10 text-[#13C296] font-bold py-1 px-2 rounded-md">
                    {subtitle}
                </div>
            </div>
        </div>
    );
}

export default AccesoRapido;