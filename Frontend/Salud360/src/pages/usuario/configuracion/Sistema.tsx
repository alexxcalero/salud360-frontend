import Button from "@/components/Button";
import MethodCard from "@/components/usuario/config/CardMetodoPago";
import { AuthContext } from "@/hooks/AuthContext";
import { useUsuario } from "@/hooks/useUsuario";
import useUsuarioForm from "@/hooks/useUsuarioForm";
import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";

const ConfigSistema = () => {

  const {usuario, logout, loading} = useContext(AuthContext)
      
  if (loading || !usuario) return null;

  const id = usuario.idCliente;

  const {
    nombres, setNombres,
    apellidos, setApellidos,
    tipoDoc, setTipoDoc,
    DNI, setDNI,
    telefono, setTelefono,
    direccion, setDireccion,
    correo, setCorreo,
    genero, setGenero,
    fechaNacimiento, setFechaNacimiento,
    notiPorCorreo, setNotiPorCorreo,
    notiPorSMS, setNotiPorSMS,
    notiPorWhatsApp, setNotiPorWhatsApp,
    setUsuarioAPI
  } = useUsuarioForm();

  const fetchUsuario = () => {
    axios.get(`http://localhost:8080/api/admin/clientes/${id}`, {
      auth: {
        username: "admin",
        password: "admin123"
      }
    })
      .then(res => {
        console.log("Datos cargados:", res.data); // VER ESTO EN LA CONSOLA
        setUsuarioAPI(res.data)
        console.log("$$*$$$$****Usuario del back:", res.data);
        //setLoading(false);
      })
      .catch(err => {
        console.error("Error cargando el usuario", err);
        //setLoading(false);
      });

  }

  useEffect(() => {
    fetchUsuario()
    window.scrollTo(0, 0); //Para que apenas cargue aparezca en el tope de la página.
  }, []);

  //console.log("notiCorreo:", notificacionPorCorreo, "notiSMS:", notificacionPorSMS, "notiWhatsApp:", notificacionPorWhatsApp);

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

  const handleActualizarNotificaciones = async () => {
    console.log("notiCorreo:", notiPorCorreo, "notiSMS:", notiPorSMS, "notiWhatsApp:", notiPorWhatsApp);


    try {
      const response = await axios.put(`http://localhost:8080/api/admin/clientes/${id}`,
        {
          nombres,
          apellidos,
          numeroDocumento: DNI,
          correo,
          telefono,
          notificacionPorCorreo: notiPorCorreo,
          notificacionPorSMS: notiPorSMS,
          notificacionPorWhatsApp: notiPorWhatsApp,
          sexo: genero,
          fechaNacimiento,
          direccion,
          tipoDocumento: {
              idTipoDocumento: tipoDoc
          },
        },
        {
          auth: {
            username: "admin",
            password: "admin123"
          },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Notificaciones actualizadas:", response.data);
      //alert("Usuario editado exitosamente");
      navigate("/usuario/configuracion/successCambiarNotificaciones", {
        state: { created: true }
      });
    }
    catch (err) {
      console.error("Error al editar contraseña:", err);
      alert("Hubo un error al editar la contraseña");
    }

  }


  return (
    <div className="flex flex-col gap-4 p-8">
        <title>Configuración del sistema</title>
        <h1 className="text-left mb-4">Configuración de sistema</h1>
        <section>
          <h2 className="text-left my-4">Notificaciones</h2>
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
                checked={notiPorCorreo}
                onChange={(e) => setNotiPorCorreo(e.target.checked)}
              />{" "}
              <label>Correo electrónico</label>
            </li>
            <li>
              <input
                type="checkbox"
                name=""
                id=""
                className="h-min mr-2"
                checked={notiPorSMS}
                onChange={(e) => setNotiPorSMS(e.target.checked)}
              />{" "}
              <label>SMS</label>
            </li>
            <li>
              <input
                type="checkbox"
                name=""
                id=""
                className="h-min mr-2"
                checked={notiPorWhatsApp}
                onChange={(e) => setNotiPorWhatsApp(e.target.checked)}
              />{" "}
              <label>Whatsapp</label>
            </li>
          </ul>
          <div className="mt-8">
              <Button type="submit" size="lg" onClick={handleActualizarNotificaciones}>Actualizar notificaciones</Button>
          </div>
        </section>
        <hr className="mt-2 border border-gray-300" />
        <section>
          <h2 className="text-left my-4">Métodos de pago guardados</h2>
          <ul className="flex flex-col gap-4 py-2">
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
    </div>
  );
};

export default ConfigSistema;
