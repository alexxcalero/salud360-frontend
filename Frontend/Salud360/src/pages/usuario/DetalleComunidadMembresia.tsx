import { AuthContext } from "@/hooks/AuthContext";
import { useFetchHandler } from "@/hooks/useFetchHandler";
import { IComunidad } from "@/models/comunidad";
import { baseAPI } from "@/services/baseAPI";
import { getComunidadByIdAPI } from "@/services/comunidades.service";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import CardMembresiaLanding from "@/components/landing/CardMembresía";
import ModalError from "@/components/ModalError";
import ModalExito from "@/components/ModalExito";

function DetalleComunidadMembresia() {
  const [_comunidad, setComunidad] = useState<IComunidad>();


  const { id: idComunidad } = useParams();
  const navigate = useNavigate();
  
  const { fetch } = useFetchHandler();
  useEffect(() => {
    fetch(async () => {
      const data = await getComunidadByIdAPI(Number(idComunidad));
      setComunidad(data);
    });
  }, []);
  
  console.log("En DetalleComunidadMembresia la comunidad es:", _comunidad)
  
  const [showModalCancelar, setShowModalCancelar] = useState(false);
  const [showModalSuspender, setShowModalSuspender] = useState(false);


  const [showModalExitoCancelar, setShowModalExitoCancelar] = useState(false);
  const [showModalExitoSuspender, setShowModalExitoSuspender] = useState(false);

  //const { id: idComunidad } = useParams();

  const { usuario, loading } = useContext(AuthContext);
  const [afiliacion, setAfiliacion] = useState<any>();
  const [membresia, setMembresia] = useState<any>();
  if (loading || !usuario) return null;
  const idCliente = usuario.idCliente;

  const fetchAfiliaciones = () => {
      baseAPI.get(`/cliente/${idCliente}/afiliaciones-cliente`, {
        auth: {
          username: "admin",
          password: "admin123"
        }
      })
        .then(res => {
          console.log("&& Datos cargados:", res.data); // VER ESTO EN LA CONSOLA
          console.log("&& Afiliaciones:", res.data);

          const afiliacionActual = res.data.find((afiliacion: any) => {
            //console.log("afiliacion.comunidad.idComunidad", afiliacion.comunidad.idComunidad, "estado:", afiliacion.estado.toLowerCase());
            //console.log("useParams id:", idComunidad)
            //console.log("primero:", afiliacion.comunidad.idComunidad === parseInt(idComunidad))
            //console.log("segundo", afiliacion.estado.toLowerCase() === "activado")
            return (
              afiliacion.comunidad.idComunidad === parseInt(idComunidad) &&
              afiliacion.estado.toLowerCase() === "activado"
            );
          });

          if (afiliacionActual) {
            setAfiliacion(afiliacionActual);
            setMembresia(afiliacionActual.membresia);
          } else {
            console.log("No se encontró una afiliación activa para esta comunidad");
            navigate("/usuario/comunidades", {
                state: { created: true },
              });
          }

        })
        .catch(err => console.error("Error cargando afiliaciones", err));
  }

  useEffect(() => {
    fetchAfiliaciones(); //hago esto para que al eliminar un usuario y darle a "volver" se actualice todo automaticamente
  }, []);

  const handleCancelarAfiliacion = (): void => {
    console.log("&&&&&&&&ESTAMOS CANCELANDO, CON EL DELETE:")

    baseAPI.delete(`/afiliaciones/${afiliacion.idAfiliacion}`)
    .then(() => {
      setShowModalExitoCancelar(true);
      setShowModalCancelar(false);
    })
    .catch(() => console.log("Error"));
  }

  const handleSuspenderAfiliacion = (): void => {
    baseAPI.put(`/afiliaciones/${afiliacion.idAfiliacion}/suspender`)
    .then(() => {
      setShowModalExitoSuspender(true);
      setShowModalSuspender(false);
    })
    .catch(() => console.log("Error"));
  }
  
  console.log ("_comunidad es:", _comunidad, " y membresía es:", membresia, "ambos son:", _comunidad && membresia)

  return (
    <section className="flex flex-col gap-8 items-center my-8">
      <title>Membresías de comunidad</title>
      <div className="">
        <h1>Membresía actual</h1>
      </div>

      <div>
        {(_comunidad != undefined && membresia != undefined) && (
          <CardMembresiaLanding
            comunidad={_comunidad}
            membresia={membresia}
            servicios={_comunidad.servicios}
            readOnly={true}
            onClick={() => {}}
            flujoUsuario={true}
            onCancelar={() => setShowModalCancelar(true)}
            onSuspender={() => setShowModalSuspender(true)}
          />
        )}
      </div>

      {showModalCancelar && (
          <>
              <div className="fixed inset-0 bg-black/60 z-40" />
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                  <ModalError modulo="¿Estás seguro de que quieres cancelar tu membresía?" detalle={`Membresía: ${membresia.nombre}`} buttonConfirm="Aceptar" onConfirm={() => {
                  handleCancelarAfiliacion();
                  }} onCancel={() => setShowModalCancelar(false)} />
              </div>
          </>
      )}

      {showModalSuspender && (
            <>
            <div className="fixed inset-0 bg-black/60 z-40" />
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <ModalError modulo="¿Estás seguro de que quieres suspender tu membresía?" detalle={`Membresía: ${membresia.nombre}`} buttonConfirm="Suspender" onConfirm={() => {
                handleSuspenderAfiliacion();
                }} onCancel={() => setShowModalSuspender(false)} />
            </div>
            </>
        )}

      {showModalExitoSuspender && (
          <>
          <div className="fixed inset-0 bg-black/60 z-40" />
          <div className="fixed inset-0 z-50 flex items-center justify-center">
              <ModalExito modulo="¡Membresía suspendida correctamente!" detalle="La membresía fue suspendida correctamente" onConfirm={() => {
              setShowModalExitoSuspender(false);
              navigate("/usuario/comunidades", {
                state: { created: true },
              });
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
              navigate("/usuario/comunidades", {
                state: { created: true },
              });
              }} />
          </div>
          </>
      )}
    

    </section>
  );
}

export default DetalleComunidadMembresia;
