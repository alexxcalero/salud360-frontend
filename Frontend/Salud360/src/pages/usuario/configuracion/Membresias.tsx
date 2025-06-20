import Spinner from "@/components/Spinner";
import CardMembresia from "@/components/usuario/config/CardMembresia";
import CardMembresiaLanding from "@/components/landing/CardMembresía";
import { AuthContext } from "@/hooks/AuthContext";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import axios from "axios";
import { AlertTriangle } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import ModalError from "@/components/ModalError";
import ModalExito from "@/components/ModalExito";

interface MembresiaFake {
  comunidad: string;
  precio: number;
  fechaRenovacion: string;
  state: "idle" | "suspended" | "canceled";
  selected: boolean;
}

const Membresias = () => {

  const [afiliaciones, setAfiliaciones] = useState([]);
  const [membresiaActual, setMembresiaActual] = useState<any>();
  const [comunidadActual, setComunidadActual] = useState<any>();
  const [afiliacionActual, setAfiliacionActual] = useState<any>();
  const [waiting, setWaiting] = useState(true);

  const [showDetalleMembresia, setShowDetalleMembresia] = useState(false);
  const [showModalCancelar, setShowModalCancelar] = useState(false);
  const [showModalSuspender, setShowModalSuspender] = useState(false);
  const [showModalReactivar, setShowModalReactivar] = useState(false);

  const [showModalExitoCancelar, setShowModalExitoCancelar] = useState(false);
  const [showModalExitoSuspender, setShowModalExitoSuspender] = useState(false);
  const [showModalExitoReactivar, setShowModalExitoReactivar] = useState(false);

  const { usuario, logout, loading } = useContext(AuthContext);

  if (loading || !usuario) return null;

  const id = usuario.idCliente;

  const fetchComunidad = async () => {
    try {
      console.log("El id del usuario es:", id)
      const res = await axios.get(`http://localhost:8080/api/cliente/${id}/afiliaciones-cliente`, {
        auth: {
          username: "admin",
          password: "admin123",
        },
      });
      console.log("Afiliaciones del Usuario:", res.data)
      setAfiliaciones(res.data);
    } catch (error) {
      console.error("Error cargando Afiliaciones", error);
    } finally {
      setWaiting(false);
    }
  };

  useEffect(() => {
    fetchComunidad();
  }, []);

  const tieneAfiliaciones = !waiting && afiliaciones.length > 0;
  //const tieneAfiliaciones = !waiting && afiliaciones !== undefined;


  /*
  const _dataExample: MembresiaFake[] = [
    {
      comunidad: "Comunidad 1",
      precio: 100,
      fechaRenovacion: "2023-10-01",
      state: "idle",
      selected: false,
    },
    {
     */

  const formatFecha = (isoString: string): string => {
    const fecha = new Date(isoString);
    if (isNaN(fecha.getTime())) return "Fecha inválida";

    // Formatear solo la fecha (sin hora)
    return new Intl.DateTimeFormat("es-PE", {
      dateStyle: "short",
    }).format(fecha);
  };


  console.log("tieneAfiliaciones es:", tieneAfiliaciones)

  const handleDetalles = (afiliacion: any) => {

      setMembresiaActual(afiliacion.membresia)
      setComunidadActual(afiliacion.comunidad)

      /*const idMembresia = afiliacion.membresia.idMembresia;
      axios.get(`http://localhost:8080/api/membresias/${idMembresia}`, {
        auth: {
          username: "admin",
          password: "admin123"
        }
      })
      .then(res => {
        console.log("Datos cargados:", res.data); // VER ESTO EN LA CONSOLA
        setMembresiaActual(res.data);
        console.log("Membresía:", res.data);
      })
      .catch(err => console.error("Error cargando membresía", err));*/

      setShowDetalleMembresia(true);
  };

  const handleCancelar = (afiliacion: any) => {
    setAfiliacionActual(afiliacion)
    setMembresiaActual(afiliacion.membresia)
    setShowModalCancelar(true);
  };

  const handleCancelarAfiliacion = (): void => {
    console.log("&&&&&&&&ESTAMOS CANCELANDO, CON EL DELETE:")

    axios.delete(`http://localhost:8080/api/afiliaciones/${afiliacionActual.idAfiliacion}`)
    .then(() => {
      setShowModalExitoCancelar(true);
      setShowModalCancelar(false);
    })
    .catch(() => console.log("Error"));
  }

  const handleSuspender = (afiliacion: any) => {
    setAfiliacionActual(afiliacion)
    setMembresiaActual(afiliacion.membresia)
    setShowModalSuspender(true);
  };

  const handleSuspenderAfiliacion = (): void => {
    axios.put(`http://localhost:8080/api/afiliaciones/${afiliacionActual.idAfiliacion}/suspender`)
    .then(() => {
      setShowModalExitoSuspender(true);
      setShowModalSuspender(false);
    })
    .catch(() => console.log("Error"));
  }

  const handleReactivar = (afiliacion: any) => {
    setAfiliacionActual(afiliacion)
    setMembresiaActual(afiliacion.membresia)
    setShowModalReactivar(true);
  };

  const handleReactivarAfiliacion = (): void => {
    axios.put(`http://localhost:8080/api/afiliaciones/${afiliacionActual.idAfiliacion}/reactivar`)
    .then(() => {
      setShowModalExitoReactivar(true);
      setShowModalReactivar(false);
    })
    .catch(() => console.log("Error"));
  }



  return (
    <div className="p-8">
      <title>Membresías</title>
      <h1 className="text-left mb-4">Membresías</h1>

      {!waiting &&
        <>
          {(tieneAfiliaciones) ? (
            <>
              <ul className="flex flex-col gap-4">
                {afiliaciones.map(
                  (afiliacion: any, index) => (
                    <li key={index}>
                      <CardMembresia
                        comunidad={afiliacion.comunidad.nombre}
                        precio={afiliacion.membresia.precio as number}
                        fechaRenovacion={formatFecha(afiliacion.membresia.fechaCreacion) as string}
                        state={afiliacion.estado as "Activado" | "Suspendido" | "Cancelado"} 
                        onDetalles={() => handleDetalles(afiliacion)} 
                        onCancelar={() => handleCancelar(afiliacion)} 
                        onSuspender={() => handleSuspender(afiliacion)}  
                        onReactivar={() => handleReactivar(afiliacion)}                    />
                    </li>
                  )
                )}
              </ul>

              {/*<div className="mt-4 w-full flex justify-center">
                <Spinner />
              </div>*/}
            </>
          ) : (
            <div className="text-center flex flex-col items-center gap-4 mt-32">
              <AlertTriangle className="text-red-500 w-32 h-32" />
              <h1>NO TIENES NINGUNA MEMBRESÍA.</h1>
              <h3>Haz click en <span className="text-[#2A86FF] italic">Comunidades</span> para ver las comunidades que tenemos para ti.</h3>
            </div>
          )}
        </>
      }

      {showDetalleMembresia && (
          <>
            <div className="fixed inset-0 bg-black/60 z-40" />
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div>
                <CardMembresiaLanding membresia={membresiaActual} servicios={comunidadActual.servicios} readOnly={true} onClick={() => {setShowDetalleMembresia(false)}}/>
              </div>
            </div>
          </>
        )}

      {showModalCancelar && (
          <>
            <div className="fixed inset-0 bg-black/60 z-40" />
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <ModalError modulo="¿Estás seguro de que quieres cancelar tu membresía?" detalle={`Membresía: ${membresiaActual.nombre}`} buttonConfirm="Aceptar" onConfirm={() => {
                  handleCancelarAfiliacion();
                }} onCancel={() => setShowModalCancelar(false)} />
              </div>
          </>
      )}
      
      {showModalSuspender && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40" />
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <ModalError modulo="¿Estás seguro de que quieres suspender tu membresía?" detalle={`Membresía: ${membresiaActual.nombre}`} buttonConfirm="Suspender" onConfirm={() => {
              handleSuspenderAfiliacion();
            }} onCancel={() => setShowModalSuspender(false)} />
          </div>
        </>
      )}

      {showModalReactivar && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40" />
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <ModalError modulo="¿Estás seguro de que quieres reactivar tu membresía?" detalle={`Membresía: ${membresiaActual.nombre}`} buttonConfirm="Reactivar" onConfirm={() => {
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
              fetchComunidad();
            }} />
          </div>
        </>
      )}

      {showModalExitoCancelar && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40" />
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <ModalExito modulo="¡Membresía cancelada correctamente!" detalle="La membresía fue cancelada correctamente" onConfirm={() => {
              setShowModalExitoCancelar(false);
              fetchComunidad();
            }} />
          </div>
        </>
      )}

      {showModalExitoReactivar && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40" />
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <ModalExito modulo="¡Membresía reactivada correctamente!" detalle="La membresía fue reactivada correctamente" onConfirm={() => {
              setShowModalExitoReactivar(false);
              fetchComunidad();
            }} />
          </div>
        </>
      )}





    </div>
  );
};

export default Membresias;

/*
{afiliaciones.map(
          (afiliacion: any, index) => (
            <li key={index}>
              <CardMembresia
                comunidad="Comunidad FAKE"
                precio={afiliacion.membresia.precio as number}
                fechaRenovacion={afiliacion.membresia.fechaCreacion as string}
                state={afiliacion.estado as "idle" | "suspended" | "canceled"}
              />
            </li>
          )
        )}
*/