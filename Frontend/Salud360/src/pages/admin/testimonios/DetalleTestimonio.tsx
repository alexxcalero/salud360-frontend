import UnderConstruction from "@/pages/UnderConstruction";
import { useParams } from "react-router";

function DetalleTestimonio(){

    
    const {id} = useParams();

    //A diferencia de todos los 'DetalleModulo' aca no hago un componente forms reutilizable ya que
    //los testimonios no se pueden crear ni editar, solo ver.
    return(
        <section className="w-full px-20 py-14 text-left">
                <h1 className="text-4xl font-bold mb-2">Detalles del testimonio</h1>
            <UnderConstruction/>
        </section>
    );
}

export default DetalleTestimonio;