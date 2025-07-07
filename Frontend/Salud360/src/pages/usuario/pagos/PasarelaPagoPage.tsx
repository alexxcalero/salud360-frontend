import Button from "@/components/Button";
import DetallesMembresia from "@/components/usuario/membresia/DetallesMembresia";
import MetodoPlin from "@/components/usuario/membresia/metodos/MetodoPlin";
import MetodoTarjeta from "@/components/usuario/membresia/metodos/MetodoTarjeta";
import MetodoYape from "@/components/usuario/membresia/metodos/MetodoYape";
import Progression from "@/components/usuario/membresia/Progression";
import { AuthContext } from "@/hooks/AuthContext";
import { useToasts } from "@/hooks/ToastContext";
import { useFetchHandler } from "@/hooks/useFetchHandler";
import { IComunidad } from "@/models/comunidad";
import { IMedioDePago } from "@/models/medioDePago";
import { IMembresia } from "@/models/membresia";
import { afiliarPorPasarelaAPI } from "@/services/afiliacion.service";
import { postMedioDePagoAPI } from "@/services/medioDePago.service";
import { DateTime } from "luxon";
import { useContext, useState } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";

const PasarelaPagoPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { usuario } = useContext(AuthContext);
  const { fetch } = useFetchHandler();
  const { createToast } = useToasts();

  if (!location.state) {
    navigate("/usuario");
    return;
  }

  const {
    comunidad,
    membresia: membresiaParam,
    metodo,
    mediosDePagoSeleccionado,
    tipo,
  } = location.state as {
    tipo: "nuevo" | "guardado";
    comunidad?: IComunidad;
    membresia?: IMembresia;
    metodo?: string;
    mediosDePagoSeleccionado?: IMedioDePago;
  };

  if (!comunidad || !membresiaParam || (!metodo && !mediosDePagoSeleccionado)) {
    navigate("/usuario");
    return;
  }

  const [membresia, setMembresia] = useState(membresiaParam);
  //console.log(mediosDePagoSeleccionado);


  return (
    <div className="w-full h-full flex justify-center items-center">
      <title>Pasarela de pagos</title>

      <div className="grid grid-cols-[1fr_auto_2fr] bg-white shadow-md max-w-300 p-4 m-4 gap-4">
        <div className="grow-1">
          <DetallesMembresia
            comunidad={comunidad}
            membresia={membresia}
            setMembresia={setMembresia}
          />
        </div>
        <div className="w-[1px] h-full bg-neutral-300"></div>

        {tipo === "guardado" && (
          <MetodoTarjeta
            comunidad={comunidad}
            membresia={membresia}
            medioDePago={mediosDePagoSeleccionado}
          />
        )}
        {metodo === "tarjeta" && tipo === "nuevo" && (
          <MetodoTarjeta comunidad={comunidad} membresia={membresia} />
        )}
        {metodo === "plin" && (
          <MetodoPlin comunidad={comunidad} membresia={membresia} />
        )}
        {metodo === "yape" && (
          <MetodoYape comunidad={comunidad} membresia={membresia} />
        )}
        {metodo === "efectivo" && (
          <div className="h-full">
            <Progression currentStep={1} steps={3} />

            <div className="flex flex-col gap-4 h-full">
              <h2 className="text-lg font-semibold text-center">
                Pagar con efectivo
              </h2>
              <p className="text-left p-4 rounded-md border-1 border-blue-700 bg-blue-500/20 text-blue-700">
                Para pagar con efectivo, por favor visita nuestra oficina
                principal o contacta a nuestro equipo de soporte para más
                detalles.
              </p>
              <div className="flex justify-center gap-2 justify-self-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    navigate("/usuario/pasarela-pagos/", {
                      state: { comunidad, membresia },
                    });
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={async () => {
                    fetch(async () => {
                      const idCliente = usuario.idCliente;
                      const nuevoMedioDePago = await postMedioDePagoAPI({
                        tipo: "efectivo",
                        ncuenta: "efectivazo compa",
                        vencimiento: DateTime.now()
                          .plus({ years: 1 })
                          .toISO({ includeOffset: false }),
                        cvv: 100,
                        usuario: {
                          idUsuario: idCliente,
                        },
                      });
                      const boleta = await afiliarPorPasarelaAPI(
                        comunidad,
                        membresia,
                        usuario,
                        nuevoMedioDePago
                      );
                      if (boleta) {
                        createToast("success", {
                          title: "¡Afiliación completa!",
                          description:
                            "¡Te afiliaste correctamente a la comunidad!",
                        });
                        navigate(`/usuario/pasarela-pagos/exito`, {
                          state: {
                            comunidad,
                            boleta,
                          },
                        });
                      } else
                        throw new Error(
                          "Hubo un error al tratar de realizar el pago"
                        );
                    });
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Continuar
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasarelaPagoPage;
