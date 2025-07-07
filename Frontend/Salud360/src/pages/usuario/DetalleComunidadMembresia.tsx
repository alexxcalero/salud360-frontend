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
import { useToasts } from "@/hooks/ToastContext";

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
  
  //console.log("En DetalleComunidadMembresia la comunidad es:", _comunidad)
  
  const [showModalCancelar, setShowModalCancelar] = useState(false);
  const [showModalSuspender, setShowModalSuspender] = useState(false);


  const [showModalExitoCancelar, setShowModalExitoCancelar] = useState(false);
  const [showModalExitoSuspender, setShowModalExitoSuspender] = useState(false);

  //const { id: idComunidad } = useParams();

  const { createToast } = useToasts();

  const { usuario, loading } = useContext(AuthContext);
  const [afiliacion, setAfiliacion] = useState<any>();
  const [membresia, setMembresia] = useState<any>();
  if (loading || !usuario) return null;
  const idCliente = usuario.idCliente;
  const [diasSuspension, setDiasSuspension] = useState(1);

  const fetchAfiliaciones = () => {
      baseAPI.get(`/cliente/${idCliente}/afiliaciones-cliente`, {
        auth: {
          username: "admin",
          password: "admin123"
        }
      })
        .then(res => {
          //console.log("&& Datos cargados:", res.data); // VER ESTO EN LA CONSOLA
          //console.log("&& Afiliaciones:", res.data);

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
            //console.log("No se encontró una afiliación activa para esta comunidad");
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
    //console.log("&&&&&&&&ESTAMOS CANCELANDO, CON EL DELETE:")

    baseAPI.delete(`/afiliaciones/${afiliacion.idAfiliacion}`)
    .then(() => {
      setShowModalExitoCancelar(true);
      setShowModalCancelar(false);
    })
    .catch(() => console.log("Error"));
  }

  const handleSuspenderAfiliacion = (): void => {
    baseAPI
      .put(`/afiliaciones/${afiliacion.idAfiliacion}/suspender`, null, {
        params: {
          dias: diasSuspension,
        },
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
  };
  
  //console.log ("_comunidad es:", _comunidad, " y membresía es:", membresia, "ambos son:", _comunidad && membresia)

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
            <div className="bg-white rounded-2xl shadow-xl w-[500px] p-8 space-y-6">
              <h2 className="text-2xl font-bold text-red-600">
                ¿Estás seguro de que quieres suspender tu membresía?
              </h2>

              <p className="text-gray-700 text-lg">
                Comunidad: <span className="font-semibold">{_comunidad?.nombre}</span>
              </p>

              <div className="flex flex-col gap-2 items-center text-center">
                <label htmlFor="dias" className="font-medium text-gray-800">
                  ¿Cuántos días deseas suspender?
                </label>
                <input
                  type="number"
                  id="dias"
                  min={1}
                  max={7}
                  value={diasSuspension}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (!isNaN(value) && value >= 1 && value <= 7) {
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
