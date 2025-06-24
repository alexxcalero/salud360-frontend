import InputIconLabel from "@/components/InputIconLabel";
import InputLabel from "@/components/InputLabel";
import StarRating from "@/components/StarRating";
import UnderConstruction from "@/pages/UnderConstruction";
import { baseAPI } from "@/services/baseAPI";
import { Mail, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
//import { useParams } from "react-router";

function DetalleTestimonio(){

    const [loading, setLoading] = useState(true);
    const [testimonio, setTestimonio] = useState();
    const [autor, setAutor] = useState();
    const [comunidad, setComunidad] = useState();
    const { id } = useParams();

    useEffect(() => {
        baseAPI.get(`/testimonios/${id}`, {
            auth: {
                username: "admin",
                password: "admin123"
            }
        })
            .then(res => {
                console.log("Datos cargados:", res.data); // VER ESTO EN LA CONSOLA
                setTestimonio(res.data)
                setAutor(res.data.autor)
                console.log("Testimonio:", res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error cargando el usuario", err);
                setLoading(false);
            });

    }, []);

    if (loading) {
        return <p>Cargando testimonio...</p>; // o un spinner
    }

    console.log("El autor es:", autor)

    function EstadoBadge({ activo }: { activo: boolean }) {
        const clases = activo
            ? "bg-green-600 text-green-50"
            : "bg-red-600 text-red-50";

        return (
            <span className={`px-2 py-1 rounded text-xs font-medium ${clases}`}>
            {activo ? "Activo" : "Inactivo"}
            </span>
        );
    }

    //const {id} = useParams();

    //A diferencia de todos los 'DetalleModulo' aca no hago un componente forms reutilizable ya que
    //los testimonios no se pueden crear ni editar, solo ver.
    return(
        <section className="w-full flex flex-col gap-8 px-20 py-14 text-left">
                <h1 className="text-4xl font-bold mb-2">Detalles del testimonio</h1>
                <div className="flex flex-col gap-8">
                    <div>
                        <h3>Información del autor</h3>
                        <div className="grid grid-cols-2 gap-8 items-center w-full my-6">
                            <div className="col-span-1 flex flex-col gap-6">
                                <InputLabel type="email" placeholder="Ingrese los nombres" htmlFor="email" label="Nombres" value={autor.nombres} disabled={true} />
                                <InputIconLabel icon={<Mail className="w-5 h-5" />} placeholder="Mail" type="email" htmlFor="email" label="Email" value={autor.correo} disabled={true} />
                            </div>
                            <div className="col-span-1 flex flex-col gap-6">
                                <InputLabel type="email" placeholder="Ingrese los apellidos" htmlFor="email" label="Apellidos" value={autor.apellidos} disabled={true} />
                                <InputIconLabel icon={<Phone className="w-5 h-5" />} placeholder="Teléfono" type="text" htmlFor="tel" label="Telefono" value={autor.correo} disabled={true} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3>Información del testimonio</h3>

                        <div className="grid grid-rows-2 gap-8 items-center w-full my-6">
                            <div className="row-span-1">
                                <div className="w-full h-48 rounded-md flex flex-col items-center justify-center cursor-pointer">
                                    <InputLabel type="text" placeholder="Ingrese el comentario" htmlFor="text" label="Comentario" value={testimonio.comentario} disabled={true} className="w-full h-full" />
                                </div>
                            </div>
                            <div className="row-span-1">

                                <div className="grid grid-cols-2 gap-8 items-center w-full">
                                    <div className="col-span-1 flex flex-col gap-6">
                                        <div className="flex flex-row gap-2 items-center">
                                            <p className="font-bold">Calificación:</p>
                                            <StarRating rating={testimonio.calificacion} />
                                            <small>({testimonio.calificacion} estrellas)</small>
                                        </div>

                                        <p className="font-bold">Fecha de Creación: <span className="font-normal">{testimonio.fechaCreacion}</span></p>
                                    </div>
                                    <div className="col-span-1 flex flex-col gap-6">
                                        <div className="flex flex-row gap-2 items-center">
                                            <p className="font-bold">Estado:</p>
                                            <EstadoBadge activo={testimonio.activo} />
                                        </div>
                                        {!testimonio.activo && <p className="font-bold">Fecha de desactivación:</p>}
                                    </div>
                                </div>

                            </div>
                        </div>



                    </div>
                    <div>
                        <h3>Comunidad relacionada</h3>
                    </div>
                </div>
            <UnderConstruction/>
        </section>
    );
}

export default DetalleTestimonio;