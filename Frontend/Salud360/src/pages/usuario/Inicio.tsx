import { AuthContext } from "@/hooks/AuthContext";
import { useContext, useEffect, useState } from "react";
import { User, Pencil, IdCard, PersonStanding, Settings, CreditCard, Calendar } from "lucide-react";
import AccesoRapido from "@/components/usuario/AccesoRapido";
import { Link } from "react-router";
import useUsuarioForm from "@/hooks/useUsuarioForm";
import CardLanding from "@/components/landing/CardLanding";
import CardMembresiaAdvertencia from "@/components/usuario/membresia/CardMembresiaAdvertencia";
import { baseAPI } from "@/services/baseAPI";

function Inicio(){

    const {usuario, loading} = useContext(AuthContext)
    const [comunidadRandom, setComunidadRandom] = useState<any>([]);
    const [comunidadesActivas, setComunidadesActivas] = useState(0);
      
    if (loading || !usuario) return null;

    const id = usuario.idCliente;
    //const tieneComunidades = usuario.comunidades.length !== 0

    const {
        nombres, //setNombres,
        apellidos, //setApellidos,
        //tipoDoc, setTipoDoc,
        DNI: numeroDocumento, //setDNI,
        telefono,// setTelefono,
        //direccion, setDireccion,
        correo, //setCorreo,
        genero: sexo, //setGenero,
        fechaNacimiento: rawFechaNacimiento, //setFechaNacimiento,
        //contrasenha, setContrasenha,
        fechaCreacion: rawFechaCreacion, //setFechaCreacion,
        fotoPerfil, //setFotoPerfil,
        nombreTipoDoc: tipoDocumento, //setNombreTipoDoc,
        comunidades, //setComunidades,
        setUsuarioAPI
    } = useUsuarioForm();

    const fetchComunidadAleatoria = () => {
        //console.log("El id del cliente a enviar es:", id)
        baseAPI.get("/cliente/aleatoria", {
            params: {
                idCliente: id
            },
            auth: {
                username: "admin",
                password: "admin123"
            }
        })
            .then(res => {
                //console.log("Datos cargados:", res.data); // VER ESTO EN LA CONSOLA
                setComunidadRandom(res.data);
                //console.log("*********Comunidad aleatoria:", res.data);
            })
            .catch(err => console.error("Error cargando comunidad random", err));
    }

    const fetchUsuario = () => {
        baseAPI.get(`/admin/clientes/${id}`, {
          auth: {
            username: "admin",
            password: "admin123"
          }
        })
          .then(res => {
            //console.log("Datos cargados:", res.data); // VER ESTO EN LA CONSOLA
            setUsuarioAPI(res.data)
           // console.log("$$*$$$$****Usuario del back:", res.data);
            //setLoading(false);
          })
          .catch(err => {
            console.error("Error cargando el usuario", err);
            //setLoading(false);
          });
          
    }

    const fetchComunidadesActivas = () => {
        baseAPI.get(`/cliente/comunidades-activas`, {
            params: {
                idCliente: id,
            },
            auth: {
            username: "admin",
            password: "admin123",
            },
        })
        .then((res) => {
          //  console.log("Datos cargados:", res.data); // VER ESTO EN LA CONSOLA
            setComunidadesActivas(res.data.length)
         //   console.log("Comunidadessssss:", res.data);
        })
        .catch((error) => {
            console.error("Error al obtener comunidades activas:", error);
        });
    }
    

    useEffect(() => {
        fetchComunidadAleatoria()
        fetchUsuario()
        fetchComunidadesActivas()
        window.scrollTo(0, 0); //Para que apenas cargue aparezca en el tope de la página.
    }, []);

    

    /*const {
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
     */

    //const tipoDocumento = rawTipoDocumento?.nombre;
    //const cantComunidades = usuario.comunidades.length;

   // console.log("Las comunidades activas son:", comunidades)

    const cantComunidades = comunidades.length;
    const fechaCreacion = new Date(rawFechaCreacion).toLocaleDateString("es-PE", {
            day: "2-digit",
            month: "long",
            year: "numeric",
    });
    const fechaNacimiento = new Date(rawFechaNacimiento).toLocaleDateString("es-PE", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });

    const accesosRapidos = [
        [IdCard, "Mis membresías", `${comunidadesActivas} membresías activas.`, "configuracion/membresias"],
        [PersonStanding, "Mis comunidades", comunidadesActivas == 1 ? `1 comunidad.` : `${comunidadesActivas} comunidades.`, "comunidades"],
        [Settings, "Mi configuración", `Configura tu perfil.`, "configuracion"],
        [CreditCard, "Mi historial de pago", `Administra tus pagos.`, "configuracion/historial-pagos"],
        [Calendar, "Mi calendario y reservas", `Observa tus reservas.`, "calendarioYReservas"],
    ]

    return (
        <section className="flex flex-col gap-16">
            <title>Bienvenido</title>

            <div>
                <div className=" p-8">
                    <h1>¡Bienvenido, {nombres}!</h1>
                </div>


                <div className="px-8">
                    <CardMembresiaAdvertencia activeButtons={true} />
                </div>
                
                <div className="w-full grid grid-cols-2 border border-gray-300">
                    <div className=" flex flex-col gap-4 p-8">
                        <div className="">
                            <h2>Datos personales:</h2>
                        </div>
                        <div className="w-full h-[460px] flex flex-row justify-start items-center gap-4 bg-gray-50 border border-[#2A86FF] rounded-sm p-4">
                            <div>
                                {fotoPerfil ? (
                                    <img
                                    src={`http://localhost:8080/api/archivo/${fotoPerfil}`}
                                    alt="Foto de perfil"
                                    className="w-24 h-24 rounded-full object-cover"
                                    />
                                ) : (
                                    <User color="black" className="w-24 h-24 border border-[#2A86FF] rounded-full" />
                                )}
                            </div>
                            <div className="flex flex-col gap-3 items-start ">
                                <div className="flex flex-row gap-4 items-center">
                                    <h3>{nombres} {apellidos}</h3>
                                    <Link to={"configuracion"}><Pencil className="text-[#2A86FF]"/></Link>
                                </div>
                                <div className="flex flex-col gap-2 items-start">
                                    <p className="italic">MONO SUPREMO ©</p>
                                    <p><span className="font-bold">{tipoDocumento}:</span> {numeroDocumento}</p>
                                    <p><span className="font-bold">Correo electrónico:</span> {correo}</p>
                                    <p><span className="font-bold">Teléfono:</span> {telefono}</p>
                                    <p><span className="font-bold">Sexo:</span> {sexo}</p>
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
                    <div className=" flex flex-col gap-4 p-8">
                        <div className="">
                            <h2>Te recomendamos:</h2>
                        </div>
                        <div className="flex mx-auto border border-[#2A86FF] rounded-sm ">
                            <CardLanding id={comunidadRandom.idComunidad} 
                            image={comunidadRandom.imagen}
                            title={comunidadRandom.nombre} 
                            subtitle={comunidadRandom.descripcion}/>
                        </div>
                    </div>
                </div>
            </div>

                            

            <div>
                <div className=" p-8">
                    <h1>Accesos Rápidos</h1>
                </div>
                
                <div className="w-full flex flex-wrap gap-y-2 justify-center p-8 border border-gray-300">
                    {/*<AccesoRapido icon={<Pencil className="text-black"/>} title="Mis membresías" subtitle={`${cantComunidades} activas`}/>*/}
                    {accesosRapidos.map(([Icon, title, subtitle, route]: any, index) => (
                        <div className="m-auto" key={index}>
                            <AccesoRapido icon={<Icon className="w-16 h-16 text-black "/>} title={title} subtitle={subtitle} route={route}/>
                        </div>
                    ))}
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