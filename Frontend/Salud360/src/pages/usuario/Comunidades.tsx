import Button from "@/components/Button";
import CardMisComunidades from "@/components/usuario/CardMisComunidades";
import { AuthContext } from "@/hooks/AuthContext";
import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router";
import { AlertTriangle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { p } from "node_modules/react-router/dist/development/lib-B8x_tOvL.d.mts";
import { baseAPI } from "@/services/baseAPI";

export interface MembresiaResumenDTO {
  idMembresia: number;
  nombre: string;
  descripcion: string;
  tipo: string;
  conTope: boolean;
  precio: number;
  cantUsuarios: number;
  maxReservas: number;
  icono: string;
  activo: boolean;
  fechaCreacion: string; // o Date si haces parsing
  fechaDesactivacion: string | null;
}

export interface AfiliacionResumenDTO {
  membresia: MembresiaResumenDTO;
  idAfiliacion: number;
  idComunidad: number;
  estado: string;
  fechaAfiliacion: string; // o Date
  fechaDesafiliacion: string | null;
}

function Comunidades(){
    
    //const [comunidades, setComunidades] = useState([]);
    const {usuario, logout, loading} = useContext(AuthContext);
    const [afiliaciones, setAfiliaciones] = useState<AfiliacionResumenDTO[]>([]);
    if (loading || !usuario) return null;

    const id = usuario.idUsuario;

    //setComunidades(usuario.comunidades)
    
    const comunidades = usuario.comunidades;
    console.log("Las comunidades del usuario son:", comunidades)
    const tieneComunidades = comunidades.length !== 0
    const tieneInactivas = false;

    const [activo, setActivo] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0); //Para que apenas cargue aparezca en el tope de la página.
        baseAPI
        .get("/afiliaciones",{ auth: {
            username: "admin",
            password: "admin123"
        }})
        .then((response) => {
            setAfiliaciones(response.data);
            console.log("Afiliaciones cargadas:", afiliaciones);
        })
        .catch((error) => {
            console.error("Error al obtener afiliaciones:", error);
        });
    }, []);

    return(
        <section className="flex flex-col gap-16">
            <title>Mis comunidades</title>
            <div className="flex flex-row justify-between items-center py-8 px-32 ">
                <h1>Mis comunidades</h1>
                {tieneComunidades && 
                    <div className="flex flex-row justify-around gap-4">
                        {
                            tieneInactivas &&
                            <>
                            {activo ?
                                <p>Activas</p>
                                :
                                <p>Inactivas</p>
                            }
                            
                            <Switch checked={activo} onCheckedChange={setActivo}/>
                            </>
                        }
                        {/*Tengo que instalar el switch de shadcn pero el p$%@ npm no me deja. Será para luego */}
                    </div>}
                <NavLink to="/usuario/comunidades/explorarComunidades"><Button size="lg" className="w-64">Explorar Más</Button></NavLink>
            </div>

            {!tieneComunidades ? (
              <div className="text-center flex flex-col items-center gap-4 mt-32">
                <AlertTriangle className="text-red-500 w-32 h-32" />
                <h1>NO PERTENECES A NINGUNA COMUNIDAD.</h1>
                <h3>Haz click en <span className="text-[#2A86FF] italic">Explorar Más</span> para ver las comunidades que tenemos para ti.</h3>
              </div>
            ):(
              <div className="mx-auto grid grid-cols-3 gap-16 justify-center mb-16">
                {comunidades.map((comunidad: any) => {
                    console.log("Afiliaciones cargadas:", afiliaciones);
                const afiliacion = afiliaciones.find((a) => a.idComunidad === comunidad.idComunidad);
                return (
                    <div className="col-span-1" key={comunidad.idComunidad}>
                    <CardMisComunidades
                        id={comunidad.idComunidad}
                        image={comunidad.imagen}
                        title={comunidad.nombre} 
                        subtitle={comunidad.descripcion}
                        afiliacion={afiliacion}
                        isMiComunidad={true}
                    />
                    </div>
                );
                })}
            </div>
            )}
        </section>
    )
}

export default Comunidades;