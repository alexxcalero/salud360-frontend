import  { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import UsuariosForms from "@/components/admin/usuarios/UsuariosForms";
import useUsuarioForm from "@/hooks/useUsuarioForm";
import { useNavigate } from "react-router";
import ModalValidacion from "@/components/ModalValidacion";


function EditarUsuario(){
    const [loading, setLoading] = useState(true);
    const {id} = useParams();

    const navigate = useNavigate();

    const [showModalValidacion, setShowModalValidacion] = useState(false);
    const [mensajeValidacion, setMensajeValidacion] = useState("");

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
        contrasenha, setContrasenha,
        setUsuarioAPI
    } = useUsuarioForm();

    useEffect(() => {
        axios.get(`http://localhost:8080/api/admin/clientes/${id}`, {
          auth: {
            username: "admin",
            password: "admin123"
          }
        })
          .then(res => {
            console.log("Datos cargados:", res.data); // VER ESTO EN LA CONSOLA
            setUsuarioAPI(res.data);
            console.log("Usuario:", res.data);
            setLoading(false);
          })
          .catch(err => {
            console.error("Error cargando el usuario", err);
            setLoading(false);
          });
      }, []);
    
    if (loading) {
      return <p>Cargando usuario...</p>; // o un spinner
    }


  //VALIDACIONES DE CAMPOS 
    const validarCampos = (): boolean => {
    const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    const soloNumeros = /^[0-9]+$/;
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nombres || !soloLetras.test(nombres)) {
      setMensajeValidacion("Los nombres deben contener solo letras y no estar vacíos.");
      return false;
    }

    if (!apellidos || !soloLetras.test(apellidos)) {
      setMensajeValidacion("Los apellidos deben contener solo letras y no estar vacíos.");
      return false;
    }

    if (!DNI || !soloNumeros.test(DNI) || DNI.length !== 8) {
      setMensajeValidacion("El DNI debe tener exactamente 8 dígitos numéricos.");
      return false;
    }

    if (!telefono || !soloNumeros.test(telefono) || telefono.length !== 9) {
      setMensajeValidacion("El teléfono debe tener exactamente 9 dígitos numéricos.");
      return false;
    }

    if (!correo.trim() || !regexCorreo.test(correo)) {
      setMensajeValidacion("El correo electrónico ingresado no es válido.");
      setShowModalValidacion(true);
      return false;
    }

    if (!direccion || direccion.trim() === "") {
      setMensajeValidacion("La dirección no puede estar vacía.");
      return false;
    }

    if (!contrasenha || contrasenha.trim() === "") {
      setMensajeValidacion("La contraseña no puede estar vacía.");
      return false;
    }

    if (!tipoDoc || tipoDoc === 0) {
      setMensajeValidacion("Debe seleccionar un tipo de documento.");
      setShowModalValidacion(true);
      return false;
    }

    if (!genero || genero.trim() === "") {
      setMensajeValidacion("Debe seleccionar un género.");
      setShowModalValidacion(true);
      return false;
    }
    return true;
  };   



    const handleEditarUsuario = async() => {

      if (!validarCampos()) {
            setShowModalValidacion(true);
            return;
        }

        try{
            const sexo = genero;

            const response = await axios.put(`http://localhost:8080/api/admin/clientes/${id}`, 
                {
                    nombres,
                    apellidos,
                    numeroDocumento: DNI,
                    correo,
                    contrasenha: (contrasenha == "xxxxxxxx" ) && contrasenha,
                    telefono,
                    sexo,
                    fechaNacimiento,
                    notificacionPorCorreo: true,
                    notificacionPorSMS: true,
                    notificacionPorWhatsApp: true,
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

            console.log("Usuario editado:", response.data);
            //alert("Usuario editado exitosamente");
            navigate("/admin/usuarios/successEditar", {
                state: { created: true }
            });
        }
        catch (err){
            console.error("Error al editar usuario:", err);
            alert("Hubo un error al editar el usuario");
        }
    }

    
    return(
      <>
            <UsuariosForms
                title="Editar usuario"
                nombres={nombres}
                setNombres={setNombres}
                apellidos={apellidos}
                setApellidos={setApellidos}
                tipoDoc={tipoDoc}
                setTipoDoc={setTipoDoc}
                DNI={DNI}
                setDNI={setDNI}
                telefono={telefono}
                setTelefono={setTelefono}
                correo={correo}
                setCorreo={setCorreo}
                direccion={direccion}
                setDireccion={setDireccion}
                genero={genero}
                setGenero={setGenero}
                fechaNacimiento={fechaNacimiento}
                setFechaNacimiento={setFechaNacimiento}
                onSubmit={handleEditarUsuario}
                buttonText="Guardar"
                readOnly={false}
            />
      {showModalValidacion && (
                <div className="fixed inset-0 bg-black/60 z-40">
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <ModalValidacion
                    titulo="Error en los campos"
                    mensaje={mensajeValidacion}
                    onClose={() => setShowModalValidacion(false)}
                    />
                </div>
                </div>
            )}
        </>
        
    );
}

export default EditarUsuario;

//Ver CrearUsuario