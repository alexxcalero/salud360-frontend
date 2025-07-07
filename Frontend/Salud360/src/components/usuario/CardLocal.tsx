import DAB from "@/assets/DAB.jpg";
import Button from "../Button";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";


interface Props{
    local: any;
}


function CardLocal({local}: Props){


    //console.log("En CardLocal, el local es:", local)
    const navigate = useNavigate();
    const [isLaptop, setIsLaptop] = useState(false);


    const updateLayout = () => {
        const width = window.innerWidth;
        //console.log("El innerWidth es:", width)
        setIsLaptop(width < 1540);
        //console.log ("setIsLaptop debe ser", width < 1540)
        //console.log("Estamos en laptop?", isLaptop)
    }


    useEffect(() => {
        updateLayout();
        window.addEventListener("resize", updateLayout); // Actualizar en cambio de tamaño de ventana


        return () => {
        window.removeEventListener("resize", updateLayout); // Limpiar el evento cuando el componente se desmonte
        };
    }, []);


    return (
    <div className={`h-[600px] relative flex flex-row justify-center items-center ${isLaptop ? 'w-[900px]' : 'w-[1500px]'}`}>
      <div className={`absolute top-1/2 -translate-y-1/2 ${isLaptop ? 'left-[140px]' : 'left-[280px]'} `}>
        <img src={ local.imagen ? (local.imagen.startsWith("http") || local.imagen.startsWith("data:") ? local.imagen : `http://localhost:8080/api/archivo/${local.imagen}`)
        : "https://png.pngtree.com/png-clipart/20201224/ourmid/pngtree-panda-bamboo-bamboo-shoots-simple-strokes-cartoon-with-pictures-small-fresh-png-image_2625172.jpg"}
        alt={`Imagen del local ${local.nombre}`}className={`object-cover rounded-md shadow-xl ${isLaptop ? 'w-[200px] h-[160px]' : 'w-120 h-90'}`}  />
      </div>
      <div
        className={`flex flex-col gap-16 m-8 py-8 pr-8 bg-gray-50 border-2 border-[#2A86FF] rounded-xl justify-center
            ${isLaptop ? 'w-[650px] h-[450px] pl-64' : 'pl-144'}`
        }
      >
        <h2>{local.nombre}</h2>
        <div className="flex flex-row justify-around gap-16 text-left">
          <div className="flex flex-col gap-4">
            <p className="font-bold">HORARIO:</p>
            <div className="flex flex-col gap-2">
              <p>Lun a Vie : 6am - 11pm</p>
              <p>Sab y Feriados: 6am - 4pm</p>
              <p>Dom: 7am - 1pm</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-bold">UBICACIÓN:</p>
            <div className="flex flex-col gap-2">
              <p>{local.direccion}</p>
            </div>
          </div>
        </div>
        <div>
          <Button variant="primary" size="lg" onClick={() => navigate("horarios")}>
            Reservar Clase
          </Button>
        </div>
      </div>
    </div>
  );
}


export default CardLocal;