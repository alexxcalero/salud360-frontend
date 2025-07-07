import Button from "@/components/Button";
import CardMisComunidades from "@/components/usuario/CardMisComunidades";
import { AuthContext } from "@/hooks/AuthContext";
import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router";
import { AlertTriangle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { baseAPI } from "@/services/baseAPI";
import ModalError from "@/components/ModalError";
import ModalExito from "@/components/ModalExito";
import { useToasts } from "@/hooks/ToastContext";

/*
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
}*/

function Comunidades(){
    const [comunidades, setComunidades] = useState([]);
    const [comunidadesInactivas, setComunidadesInactivas] = useState([]);
    const [afiliaciones, setAfiliaciones] = useState([]);
    
    const [membresiaActual, setMembresiaActual] = useState<any>();
    const [comunidadActual, setComunidadActual] = useState<any>();
    const [afiliacionActual, setAfiliacionActual] = useState<any>();
    const [waiting, setWaiting] = useState(true);

    const [showModalCancelar, setShowModalCancelar] = useState(false);
    const [showModalSuspender, setShowModalSuspender] = useState(false);
    const [showModalReactivar, setShowModalReactivar] = useState(false);

    const [showModalExitoCancelar, setShowModalExitoCancelar] = useState(false);
    const [showModalExitoSuspender, setShowModalExitoSuspender] = useState(false);
    const [showModalExitoReactivar, setShowModalExitoReactivar] = useState(false);

    const [maxDias, setMaxDias] = useState(0);

    const {usuario, logout, loading} = useContext(AuthContext);
    //const [afiliaciones, setAfiliaciones] = useState<AfiliacionResumenDTO[]>([]);
    if (loading || !usuario) return null;

    const id = usuario.idCliente;

    const { createToast } = useToasts();

    //setComunidades(usuario.comunidades)

    const fetchComunidades = () => {
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
            //console.log("Datos cargados:", res.data); // VER ESTO EN LA CONSOLA
            setComunidades(res.data);
           // console.log("Comunidadessssss:", res.data);
        })
        .catch((error) => {
            console.error("Error al obtener comunidades activas:", error);
        });
    }
    
    const fetchAfiliaciones = () => {
        baseAPI.get(`/cliente/${id}/afiliaciones-cliente`,{ auth: {
            username: "admin",
            password: "admin123"
        }})
        .then((response) => {
            setAfiliaciones(response.data);
            //console.log("Afiliaciones cargadas:", afiliaciones);
        })
        .catch((error) => {
            console.error("Error al obtener afiliaciones:", error);
        });
    }

    const fetchComunidadesInactivas = () => {
        baseAPI.get(`/cliente/comunidades-inactivas`, {
            params: {
                idCliente: id,
            },
            auth: {
            username: "admin",
            password: "admin123",
            },
        })
        .then((res) => {
            //console.log("Datos cargados:", res.data); // VER ESTO EN LA CONSOLA
            setComunidadesInactivas(res.data);
            //console.log("Comunidades inactivas:", res.data);
        })
        .catch((error) => {
            console.error("Error al obtener comunidades inactivas:", error);
        });
    }

    const fetchMaxDias = () => {
        baseAPI.get(`/reglas/max-dias-suspension`, {
            auth: {
                username: "admin",
                password: "admin123",
            },
        })
        .then((res) => {
            console.log("Datos cargados:", res.data); // VER ESTO EN LA CONSOLA
            setMaxDias(res.data.maxDiasSuspension);
            console.log("Días Máximos:", res.data);
        })
        .catch((error) => {
            console.error("Error al obtener Días Máximos:", error);
        });
    }

    const refreshDatos = () => {
        fetchComunidades();
        fetchAfiliaciones();
        fetchMaxDias();
        fetchComunidadesInactivas();
    };


    useEffect(() => {
        window.scrollTo(0, 0); //Para que apenas cargue aparezca en el tope de la página.
        refreshDatos();
        setWaiting(false);
    }, []);


    const tieneComunidades = !waiting && comunidades.length !== 0
    const tieneInactivas = !waiting && comunidadesInactivas.length !== 0;

    const [activo, setActivo] = useState(true);
    const [diasSuspension, setDiasSuspension] = useState(1);

    const handleCancelar = (afiliacion: any, comunidad: any) => {
    //console.log("HOLAAAAAAAAAAAAAAAAAAAAAAAAA", afiliacion)
    setAfiliacionActual(afiliacion)
    setMembresiaActual(afiliacion.membresia)
    setComunidadActual(comunidad)
    setShowModalCancelar(true);
  };

  const handleCancelarAfiliacion = (): void => {
    //console.log("&&&&&&&&ESTAMOS CANCELANDO, CON EL DELETE:")

    baseAPI.delete(`/afiliaciones/${afiliacionActual.idAfiliacion}`)
    .then(() => {
      setShowModalExitoCancelar(true);
      setShowModalCancelar(false);
    })
    .catch(() => console.log("Error"));
  }

  const handleSuspender = (afiliacion: any, comunidad: any) => {
    setAfiliacionActual(afiliacion)
    setMembresiaActual(afiliacion.membresia)
    setComunidadActual(comunidad)
    setShowModalSuspender(true);
  };

  const handleSuspenderAfiliacion = (): void => {
    baseAPI.put(`/afiliaciones/${afiliacionActual.idAfiliacion}/suspender`, null, {
        params: {
        dias: diasSuspension
        }
    })
    .then(() => {
        setShowModalExitoSuspender(true);
        setShowModalSuspender(false);
    })
    .catch((err) => {
        const mensaje = err?.response?.data?.message || "Error al suspender membresía."
        console.log("Error al suspender membresía:", mensaje)

        createToast("error", {
            title: "Error al suspender membresía",
            description: mensaje,
        });


    });
}

  const handleReactivar = (afiliacion: any, comunidad: any) => {
    setAfiliacionActual(afiliacion)
    setMembresiaActual(afiliacion.membresia)
    setComunidadActual(comunidad)
    setShowModalReactivar(true);
  };

  const handleReactivarAfiliacion = (): void => {
    baseAPI.put(`/afiliaciones/${afiliacionActual.idAfiliacion}/reactivar`)
    .then(() => {
      setShowModalExitoReactivar(true);
      setShowModalReactivar(false);
    })
    .catch(() => console.log("Error"));
  }


    function transformarImagen(imagen: string){
      return(imagen && (imagen.startsWith("http") || imagen.startsWith("data:"))
      ? imagen
      : imagen
        ? `http://localhost:8080/api/archivo/${imagen}`
        : "https://png.pngtree.com/png-clipart/20201224/ourmid/pngtree-panda-bamboo-bamboo-shoots-simple-strokes-cartoon-with-pictures-small-fresh-png-image_2625172.jpg");
    }

    const comunidadesAMostrar = (tieneComunidades && activo) || (!tieneComunidades && tieneInactivas && activo)
    ? comunidades
    : comunidadesInactivas;



    return(
        <section className="flex flex-col gap-16">
            <title>Mis comunidades</title>

            <div className="w-full flex flex-col gap-4 justify-center py-8 px-32">
                <div className="flex gap-4 justify-between items-center">
                  <h1>Mis comunidades</h1>
                  <div className="flex flex-row justify-around gap-4">
                    <p>{activo ? "Activas" : "Inactivas"}</p>
                    <Switch checked={activo} onCheckedChange={setActivo} className="data-[state=checked]:bg-blue-500 bg-gray-300 transition-colors duration-300"/>
                    </div>
                  <NavLink to="/usuario/comunidades/explorarComunidades"><Button size="lg" className="w-64">Explorar Más</Button></NavLink>
                </div>
                <hr/>
            </div>

            {comunidadesAMostrar.length === 0 ? (
                <div className="text-center flex flex-col items-center gap-4 mt-32">
                    <AlertTriangle className="text-red-500 w-32 h-32" />
                    <h1>{activo ? 'NO PERTENECES A NINGUNA COMUNIDAD.' : 'NO TIENES COMUNIDADES INACTIVAS'}</h1>
                    <h3>Haz click en <span className="text-[#2A86FF] italic">Explorar Más</span> para ver las comunidades que tenemos para ti.</h3>
                </div>
                ) : (
                <div className="mx-auto grid grid-cols-3 gap-16 justify-center mb-16">
                    {comunidadesAMostrar.map((comunidad: any) => {
                    const afiliacion = afiliaciones.find((a) => a.comunidad.idComunidad === comunidad.idComunidad);
                    return (
                        <div className="col-span-1" key={comunidad.idComunidad}>
                        <CardMisComunidades
                            id={comunidad.idComunidad}
                            image={transformarImagen(comunidad.imagen)}
                            title={comunidad.nombre}
                            subtitle={comunidad.descripcion}
                            afiliacion={afiliacion}
                            activo={activo}
                            onAbandonar={() => handleCancelar(afiliacion, comunidad)}
                            onSuspender={() => handleSuspender(afiliacion, comunidad)}
                            onReactivar={() => handleReactivar(afiliacion, comunidad)}
                        />
                        </div>
                    );
                    })}
                </div>
                )}




            {showModalCancelar && (
                <>
                    <div className="fixed inset-0 bg-black/60 z-40" />
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <ModalError modulo="¿Estás seguro de que quieres abandonar la comunidad?" detalle={`Comunidad: ${comunidadActual.nombre}`} detalle2={"Se cancelarán todas tus reservas y serás retirado de la comunidad inmediatamente."} buttonConfirm="Aceptar" onConfirm={() => {
                        handleCancelarAfiliacion();
                        }} onCancel={() => setShowModalCancelar(false)} />
                    </div>
                </>
            )}
            
            {showModalSuspender && (
            <>
                <div className="fixed inset-0 bg-black/60 z-40" />
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="bg-white rounded-2xl shadow-xl w-[500px] p-8 space-y-6">
                    <h2 className="text-2xl font-bold text-red-600">
                    ¿Estás seguro de que quieres suspender tu membresía?
                    </h2>

                    <p className="text-gray-700 text-lg">
                    Comunidad: <span className="font-semibold">{comunidadActual?.nombre}</span>
                    </p>

                    <div className="flex flex-col gap-2 items-center text-center">
                    <label htmlFor="dias" className="font-medium text-gray-800">
                        ¿Cuántos días deseas suspender?
                    </label>
                    <label htmlFor="texto" className="text-sm">El número máximo de días para suspender es: <span className="text-[#2A86FF] font-bold">{maxDias}</span></label>
                    <input
                        type="number"
                        id="dias"
                        min={1}
                        max={maxDias}
                        value={diasSuspension}
                        onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value) && value >= 1 && value <= maxDias) {
                            setDiasSuspension(value);
                        }
                        }}
                        className="border border-gray-300 rounded-md px-4 py-2 w-24"
                    />
                    </div>

                    <div className="flex flex-col gap-4 mt-6 w-full">
                    <button
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-3 rounded-md w-full transition"
                        onClick={() => handleSuspenderAfiliacion()}
                    >
                        Suspender
                    </button>
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-3 rounded-md w-full transition"
                        onClick={() => setShowModalSuspender(false)}
                    >
                        Volver
                    </button>
                    </div>
                </div>
                </div>
            </>
            )}

            {showModalReactivar && (
                <>
                <div className="fixed inset-0 bg-black/60 z-40" />
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <ModalError modulo="¿Estás seguro de que quieres reactivar tu membresía?" detalle={`Comunidad: ${membresiaActual.nombre}`} buttonConfirm="Reactivar" onConfirm={() => {
                    handleReactivarAfiliacion();
                    }} onCancel={() => setShowModalReactivar(false)} />
                </div>
                </>
            )}

            {showModalExitoSuspender && (
                <>
                <div className="fixed inset-0 bg-black/60 z-40" />
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <ModalExito modulo="¡Membresía suspendida correctamente!" detalle="La membresía fue suspendida correctamente" onConfirm={() => {
                    setShowModalExitoSuspender(false);
                    refreshDatos();
                    }} />
                </div>
                </>
            )}

            {showModalExitoCancelar && (
                <>
                <div className="fixed inset-0 bg-black/60 z-40" />
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <ModalExito modulo="¡Comunidad abandonada correctamente!" detalle="La comunidad fue abandonada correctamente" onConfirm={() => {
                    setShowModalExitoCancelar(false);
                    refreshDatos();
                    }} />
                </div>
                </>
            )}

            {showModalExitoReactivar && (
                <>
                <div className="fixed inset-0 bg-black/60 z-40" />
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <ModalExito modulo="¡Membresía reactivada correctamente!" detalle="La membresía fue reactivada correctamente" onConfirm={() => {
                    refreshDatos();
                    setShowModalExitoReactivar(false);
                    }} />
                </div>
                </>
            )}








        </section>
    )
}

export default Comunidades;