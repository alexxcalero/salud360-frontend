import { AuthContext } from "@/hooks/AuthContext";
import UnderConstruction from "../UnderConstruction";
import { useContext } from "react";
import { User, Pencil } from "lucide-react";

function Inicio(){

    const {usuario, logout, loading} = useContext(AuthContext)
      
    if (loading || !usuario) return null;

    
    const {
        nombres,
        apellidos,
        correo,
        telefono,
        fechaNacimiento: rawFechaNacimiento,
        sexo,
        fotoPerfil,
        numeroDocumento,
        tipoDocumento: rawTipoDocumento,
        fechaCreacion: rawFechaCreacion //Lo renombro así para formatearlo
    } = usuario;

    const tipoDocumento = rawTipoDocumento?.nombre;

    const cantComunidades = 2;

    const fechaCreacion = new Date(usuario.fechaCreacion).toLocaleDateString("es-PE", {
            day: "2-digit",
            month: "long",
            year: "numeric",
    });

    const fechaNacimiento = new Date(usuario.fechaCreacion).toLocaleDateString("es-PE", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });

    return (
        <section className="flex flex-col">
            <div className="border border-amber-700 p-8">
                <h1>¡Bienvenido, {nombres}!</h1>
            </div>
            <div className="w-full grid grid-cols-2 border-b-cyan-500">
                <div className="border border-b-fuchsia-600 p-8">
                    <div className="w-full flex flex-row justify-start items-center gap-4 border border-gray-300 rounded-sm p-4">
                        <div>
                            {fotoPerfil ? (
                            <img
                                src={fotoPerfil}
                                alt="Foto de perfil"
                                className="w-24 h-24 rounded-full"
                            />
                            ):
                            <User color="black" className="w-24 h-24 border border-[#2A86FF] rounded-full"/>
                            }
                        </div>
                        <div className="flex flex-col gap-3 items-start">
                            <div className="flex flex-row gap-4 items-center">
                                <h3>{nombres} {apellidos}</h3>
                                <Pencil className="text-[#2A86FF]"/>
                            </div>
                            <div className="flex flex-col gap-2 items-start">
                                <p>MONO SUPREMO</p>
                                <p><span className="font-bold">{tipoDocumento}:</span> {numeroDocumento}</p>
                                <p><span className="font-bold">Fecha de Nacimiento:</span> {fechaNacimiento}</p>
                                <p>Miembro de <span className="font-bold">{cantComunidades} comunidades</span> </p>
                                <p><span className="font-bold">Miembro desde:</span> {fechaCreacion}</p>
                                <div className="bg-[#13C296]/10 text-[#13C296] font-bold py-1 px-2  rounded-md">
                                    Activo
                                </div>
                            </div>
                        </div>
                        

                    </div>
                    

                </div>



                <div className="border border-b-teal-300">
                    b

                </div>
            </div>
        </section>
    )
}

export default Inicio;

/*
<section className="h-full grid grid-rows-12 border border-emerald-800 p-1">
            <div className="row-span-2 border border-amber-700 p-8">
                <h1>¡Bienvenido, {nombres}!</h1>
            </div>
            <div className="row-span-10 border border-b-blue-700">
                s
            </div>
            <div className="row-span-2 border border-b-fuchsia-500 p-8">
                <h1>Probando</h1>
            </div>
        </section>
*/