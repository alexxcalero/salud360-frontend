import Button from "@/components/Button";
import { useNavigate } from "react-router";

function SeleccionarTipo(){

    const navigate = useNavigate();

    return(

        <div className="min-h-screen bg-gray-50 flex justify-center items-center">
            <div className="flex flex-col bg-white gap-16 p-16 mx-auto my-auto justify-center items-center border-2 rounded-sm border-[#2A86FF] shadow-lg">

                <h1>¿Qué tipo de cuenta deseas crear?</h1>

                <div className="w-full flex flex-col gap-4">
                    <div className="inline-block w-full"><Button size="lg" className="w-full" onClick={() => navigate("/admin/usuarios/crear/usuario")}>Crear Usuario</Button></div>
                    <div className="inline-block w-full"><Button size="lg" className="w-full" onClick={() => navigate("/admin/usuarios/crear/admin")}>Crear Administrador</Button></div>
                </div>

                <Button size="lg" variant="danger" onClick={() => navigate(-1)}>Volver</Button>

            </div>
        </div>
        
    );
}

export default SeleccionarTipo;