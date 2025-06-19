import { useState, useEffect, useContext } from "react";
import Button from "@/components/Button";
import axios from "axios";
import { AuthContext } from "@/hooks/AuthContext";
import { useNavigate } from "react-router";
import ModalError from "@/components/ModalError";
import { useUsuario } from "@/hooks/useUsuario";
import useUsuarioForm from "@/hooks/useUsuarioForm";
import ModalValidacion from "@/components/ModalValidacion";
import MethodCard from "@/components/usuario/config/CardMetodoPago";
import ModalExito from "@/components/ModalExito";

const ConfigSistema = () => {

  const [showModalExito, setShowModalExito] = useState(false);

  const { usuario, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchMetodoPago = () => {
    axios.get(`http://localhost:8080/api/mediosDePago/usuario/${id}`, {
      auth: { username: "admin", password: "admin123" }
    })
    .then(res => {
      setMetodosPago(res.data || []); // Asegúrate de actualizar el estado
    })
    .catch(err => {
      console.error("Error cargando los métodos de pago", err);
      setMetodosPago([]); // En caso de error, aseguramos que sea un array vacío
    });
  };

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
      auth: { username: "admin", password: "admin123" }
    })
      .then(res => setUsuarioAPI(res.data))
      .catch(err => console.error("Error cargando el usuario", err));
  };

  useEffect(() => {
    // Obtener los métodos de pago del cliente
    fetchUsuario()
    axios.get(`http://localhost:8080/api/mediosDePago/usuario/${id}`, {
      auth: { username: "admin", password: "admin123" }
    })
      .then(res => {
        setMetodosPago(res.data || []); // Asegúrate de que metodosPago sea un array vacío si no hay datos
      })
      .catch(err => {
        setMetodosPago([]); // En caso de error, aseguramos que sea un array vacío
      });

    window.scrollTo(0, 0);
  }, [id]);

  // Estados para el modal y los datos de la tarjeta
  const [metodosPago, setMetodosPago] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newCard, setNewCard] = useState({
    method: "mastercard", // Default method
    numero: "",
    nombreTitular: "",
    fechaVencimiento: "",
    cvv: "",
  });

  const [isLoading, setIsLoading] = useState(false); // Estado para manejar la carga
  const [mensajeError, setMensajeError] = useState("");
  const [showModalValidacion, setShowModalValidacion] = useState(false);

  const textoValido = (texto: string) => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9 ,.;-]*$/.test(texto);

  const validarCampos = () => {
    // Validar que todos los campos requeridos estén llenos
    if (!newCard.numero.trim() || !newCard.nombreTitular.trim() || !newCard.fechaVencimiento.trim()) {
      setMensajeError("Los campos Número de tarjeta, Titular y Fecha de vencimiento son obligatorios.");
      setShowModalValidacion(true);
      return false;
    }

    // Validar que el nombre del titular solo tenga caracteres válidos
    if (!textoValido(newCard.nombreTitular)) {
      setMensajeError("El nombre del titular contiene caracteres no permitidos.");
      setShowModalValidacion(true);
      return false;
    }

    // Validar que el número de tarjeta tenga más de 16 dígitos
    if (newCard.numero.trim().length < 16) {
      setMensajeError("El número de tarjeta debe tener al menos 16 dígitos.");
      setShowModalValidacion(true);
      return false;
    }

    // Validar que el CVV tenga exactamente 3 dígitos
    if (newCard.cvv.trim().length !== 3) {
      setMensajeError("El CVV debe tener exactamente 3 dígitos.");
      setShowModalValidacion(true);
      return false;
    }

    // Validar que la fecha de vencimiento no sea menor que el año actual
    const fechaVencimiento = new Date(newCard.fechaVencimiento);
    const [year, month] = newCard.fechaVencimiento.split("-").map(Number);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // getMonth() es base 0

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      setMensajeError("La tarjeta está vencida.");
      setShowModalValidacion(true);
      return false;
    }

    // Validar que el mes de la tarjeta no esté en el pasado
    if (fechaVencimiento.getFullYear() === currentYear && fechaVencimiento.getMonth() < new Date().getMonth()) {
      setMensajeError("La tarjeta está vencida.");
      setShowModalValidacion(true);
      return false;
    }

    // Si todo es válido, retornar true
    return true;
  };

  // Abrir y cerrar el modal
  const handleAbrirModal = () => setShowModal(true);
  const handleCerrarModal = () => setShowModal(false);
  const [modalExitoTexto, setModalExitoTexto] = useState("");
  const [modalExitoTipo, setModalExitoTipo] = useState("");

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

      setModalExitoTipo("notificaciones");  // Establece el tipo de modal
      setModalExitoTexto("¡Notificaciones actualizadas correctamente!");
      setShowModalExito(true);
    }
    catch (err) {
      console.error("Error al editar notificacion:", err);
    }

  }

  // Función para agregar un nuevo método de pago
  const handleAgregarMetodo = async () => {
    if (!validarCampos()) return;

    setIsLoading(true); // Establece el estado de carga

    try {
      const vencimientoISO = new Date(`${newCard.fechaVencimiento}-01`).toISOString();
      const data = {
        tipo: newCard.method,
        ncuenta: newCard.numero,
        cvv: newCard.cvv,
        vencimiento: vencimientoISO, // Usa la fecha convertida
        id_cliente: id,
        fechaDesactivacion: null, // Si es necesario
        usuario: {
          idUsuario: id,  // Usamos el idCliente como idUsuario
          correo: usuario.correo, // Correo del usuario
          rol: {
            idRol: 1073741824, // Asumiendo que este es el rol
            nombre: "cliente", // El nombre del rol
            descripcion: "Rol de cliente" // Descripción del rol
          }
        }
      };

      await axios.post("http://localhost:8080/api/mediosDePago", data, {
        auth: { username: "admin", password: "admin123" },
        headers: { "Content-Type": "application/json" },
      });

      setModalExitoTipo("metodoPago");  // Establece el tipo de modal
      setShowModalExito(true);

      // Limpiar los campos del formulario después de agregar el método de pago
      setNewCard({
        method: "mastercard", // Reset method to default
        numero: "",
        nombreTitular: "",
        fechaVencimiento: "",
        cvv: "",
      });

      setShowModal(false);
    } catch (err) {
      console.error("Error al agregar el método de pago", err);
    } finally {
      setIsLoading(false); // Restaurar estado de carga
    }
  };

  

  return (
    <div className="flex flex-col gap-4 p-8">
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
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-left">Tus métodos de pago:</h3>
          <Button onClick={handleAbrirModal} variant="primary">
            Agregar método de pago
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {metodosPago.length > 0 ? (
            metodosPago.map((metodo) => {
              return (
                <MethodCard
                  key={metodo.idMedioDePago}   // Asegúrate de usar un valor único
                  method={metodo.tipo as "mastercard" | "visa"}
                  numero={metodo.ncuenta}
                  id={metodo.idMedioDePago}   // Aquí estamos pasando el id del medio de pago
                  fetchMetodoPago={fetchMetodoPago}   // Pasas la función aquí
                />
              );
            })
          ) : (
            <p>No tienes métodos de pago registrados.</p>
          )}
        </div>
        
      </section>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full max-h-screen mt-20">
            <h3 className="text-lg mb-4">Agregar Método de Pago</h3>
            <form className="flex flex-col gap-4">
              <label>Tipo de tarjeta:</label>
              <select
                value={newCard.method}
                onChange={(e) => setNewCard({ ...newCard, method: e.target.value })}
                className="w-full p-2 border rounded"
              >
                <option value="mastercard">MasterCard</option>
                <option value="visa">Visa</option>
              </select>
              <label>Número de tarjeta:</label>
              <input
                type="text"
                value={newCard.numero}
                onChange={(e) => {
                  const rawValue = e.target.value.replace(/\D/g, ""); // Elimina todo lo que no sea dígito
                  const formattedValue = rawValue.replace(/(.{4})/g, "$1 ").trim(); // Agrupa cada 4 dígitos
                  setNewCard({ ...newCard, numero: formattedValue });
                }}
                className="w-full p-2 border rounded"
              />
              <label>Nombre del titular:</label>
              <input
                type="text"
                value={newCard.nombreTitular}
                onChange={(e) => setNewCard({ ...newCard, nombreTitular: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <label>Fecha de vencimiento:</label>
              <input
                type="month"
                value={newCard.fechaVencimiento}
                onChange={(e) => setNewCard({ ...newCard, fechaVencimiento: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <label>CVV:</label>
              <input
                type="text"
                value={newCard.cvv}
                onChange={(e) => setNewCard({ ...newCard, cvv: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <div className="flex justify-end gap-2 mt-4">
                <Button type="button" onClick={handleCerrarModal} variant="outline">Cancelar</Button>
                <Button type="button" onClick={handleAgregarMetodo} disabled={isLoading}>Agregar</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showModalValidacion && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40" />
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <ModalValidacion
              titulo="Error en los campos"
              mensaje={mensajeError}
              onClose={() => setShowModalValidacion(false)}
            />
          </div>
        </>
      )}

      {showModalExito && modalExitoTipo === "metodoPago" && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40" />
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <ModalExito
              modulo="¡Método de pago agregado correctamente!"  // El mensaje de éxito del método de pago
              detalle="El método de pago fue agregado correctamente"
              onConfirm={() => {
                setShowModalExito(false);
                fetchMetodoPago(); // Actualiza los métodos de pago
              }}
            />
          </div>
        </>
      )}

      {showModalExito && modalExitoTipo === "notificaciones" && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40" />
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <ModalExito
              modulo={modalExitoTexto}  // El mensaje de notificación
              detalle="Tus notificaciones han sido actualizadas con éxito."
              onConfirm={() => setShowModalExito(false)}  // Cerrar el modal cuando se confirme
            />
          </div>
        </>
      )}

    </div>
  );
};

export default ConfigSistema;