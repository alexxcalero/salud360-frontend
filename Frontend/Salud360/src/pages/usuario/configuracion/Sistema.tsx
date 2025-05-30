import Button from "@/components/Button";
import MethodCard from "@/components/usuario/config/CardMetodoPago";
import { AuthContext } from "@/hooks/AuthContext";
import { useUsuario } from "@/hooks/useUsuario";
import { useContext } from "react";
import { useNavigate } from "react-router";

const ConfigSistema = () => {

  const {usuario, logout, loading} = useContext(AuthContext)
      
  if (loading || !usuario) return null;


  const {
    notiCorreo,
    notiSMS,
    notiWhatsApp
  } = usuario;

  const navigate = useNavigate();
  const _dataEjemplo = [
    {
      method: "mastercard",
      numero: "1234567890123456",
    },
    {
      method: "visa",
      numero: "1234567890123456",
    },
    {
      method: "mastercard",
      numero: "1234567890123456",
    },
  ];
  return (
    <div className="p-8">
      <form action="">
        <h1 className="text-left mb-4">Configuración de sistema</h1>
        <section>
          <h2 className="text-left">Notificaciones</h2>
          <span className="text-left block mb-2">
            Permitir notificaciones en:
          </span>
          <ul className="flex flex-col gap-2 w-max items-start">
            <li>
              <input
                type="checkbox"
                name=""
                id=""
                className="h-min mr-2"
                defaultChecked={notiCorreo}
              />
              <label>Correo electrónico</label>
            </li>
            <li>
              <input
                type="checkbox"
                name=""
                id=""
                className="h-min mr-2"
                defaultChecked={notiSMS}
              />{" "}
              <label>SMS</label>
            </li>
            <li>
              <input
                type="checkbox"
                name=""
                id=""
                className="h-min mr-2"
                defaultChecked={notiWhatsApp}
              />{" "}
              <label>Whatsapp</label>
            </li>
          </ul>
        </section>
        <hr className="my-2" />
        <section>
          <h2 className="text-left my-4">Privacidad</h2>
          <ul className="flex flex-col gap-2 w-max items-start">
            <li>
              <input
                type="radio"
                name="visibilidad"
                value="publico"
                id="publico"
                className="h-min mr-2"
              />
              <label htmlFor="publico" className="inline">
                Público
              </label>
            </li>
            <li>
              <input
                type="radio"
                name="visibilidad"
                value="privado"
                id="privado"
                className="h-min mr-2"
              />
              <label htmlFor="privado">Privado</label>
            </li>
          </ul>
        </section>
        <hr className="my-2" />
        <section>
          <h2 className="text-left my-4">Métodos de pago guardados</h2>
          <ul className="flex flex-col gap-4">
            {_dataEjemplo.map((item, index) => (
              <li>
                <MethodCard
                  key={index}
                  method={item.method as "mastercard" | "visa"}
                  numero={item.numero}
                />
              </li>
            ))}
          </ul>
        </section>
        <section className="flex gap-4 mt-8 justify-end">
          <Button onClick={() => navigate(-1)} variant="outline">
            Volver
          </Button>
          <Button type="submit">Aplicar cambios</Button>
        </section>
      </form>
    </div>
  );
};

export default ConfigSistema;
