import Progression from "../Progression";
import { IComunidad } from "@/models/comunidad";
import { IMembresia } from "@/models/membresia";
import { useNavigate } from "react-router";
import { ShoppingCart } from "lucide-react";
import FormularioTarjeta from "../FormularioTarjeta";
import { afiliarPorPasarelaAPI } from "@/services/afiliacion.service";
import { useContext } from "react";
import { AuthContext } from "@/hooks/AuthContext";
import { useFetchHandler } from "@/hooks/useFetchHandler";
import { useToasts } from "@/hooks/ToastContext";
import { postMedioDePagoAPI } from "@/services/medioDePago.service";
import { IMedioDePago } from "@/models/medioDePago";

const MetodoTarjeta = ({
  comunidad,
  membresia,
  medioDePago,
}: {
  comunidad: IComunidad;
  membresia: IMembresia;
  medioDePago?: IMedioDePago;
}) => {
  const navigate = useNavigate();
  const { usuario } = useContext(AuthContext);
  const { fetch } = useFetchHandler();
  const { createToast } = useToasts();
  return (
    <div>
      <Progression currentStep={1} steps={3} />
      <div className="mt-4">
        <FormularioTarjeta
          disabled={Boolean(medioDePago)}
          defaultValues={medioDePago}
          submitHandler={async (data) => {
            const nuevoMedioDePago =
              medioDePago ?? (await postMedioDePagoAPI(data));
            fetch(async () => {
              const boleta = await afiliarPorPasarelaAPI(
                comunidad,
                membresia,
                usuario,
                nuevoMedioDePago
              );
              if (boleta) {
                createToast("success", {
                  title: "¡Afiliación completa!",
                  description: "¡Te afiliaste correctamente a la comunidad!",
                });
                navigate(`/usuario/pasarela-pagos/exito`, {
                  state: {
                    comunidad,
                    boleta,
                  },
                });
              } else
                throw new Error("Hubo un error al tratar de realizar el pago");
            });
          }}
          cancelHandler={() => {
            navigate("/usuario/pasarela-pagos/", {
              state: { comunidad, membresia },
            });
          }}
          submitBtnContent={
            <>
              <ShoppingCart size={16} /> Comprar
            </>
          }
        />
      </div>
    </div>
  );
};

export default MetodoTarjeta;
