import { useNavigate } from "react-router";
import Button from "../Button";

interface Props{
    medico: any
}

function CardMedico({medico}: Props){

    const navigate = useNavigate();
    const fotoPerfil = medico.fotoPerfil;
    const imagenFinal = fotoPerfil
        ? (fotoPerfil.startsWith("http") || fotoPerfil.startsWith("data:")
            ? fotoPerfil
            : `http://localhost:8080/api/archivo/${fotoPerfil}`)
        : "https://png.pngtree.com/png-clipart/20201224/ourmid/pngtree-panda-bamboo-bamboo-shoots-simple-strokes-cartoon-with-pictures-small-fresh-png-image_2625172.jpg";

    //console.log("En CardMedico, el médico es:", medico)

    return(
        <div className="w-[330px] h-[500px] grid grid-rows-3 rounded-sm border shadow-xl">
            <div className="row-span-1">
                <div className="row-span-1">
                <img src={imagenFinal} alt="Foto del médico" className="w-full h-full object-cover" />
            </div>
            </div>
            <div className="row-span-2 flex flex-col justify-around gap-8 text-left p-4 bg-white text-black">
                <h3 className="font-bold">Dr. {medico.nombres} {medico.apellidos}</h3>
                <p className="font-bold italic">{medico.especialidad}</p>
                <p>{medico.descripcion}</p>
                <div className="inline-block w-32">
                    <Button size="lg" className="w-full" onClick={() => navigate(`horarios`)}>Agendar Cita</Button>
                </div>
            </div>
            
        </div>
    );
}

export default CardMedico;