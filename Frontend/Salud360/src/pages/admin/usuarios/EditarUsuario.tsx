import  { useEffect, useState } from "react";
import { useParams } from "react-router";
import UsuariosForms from "@/components/admin/usuarios/UsuariosForms";
import useUsuarioForm from "@/hooks/useUsuarioForm";
import { useNavigate } from "react-router";
import ModalValidacion from "@/components/ModalValidacion";
import { baseAPI } from "@/services/baseAPI";


function EditarUsuario(){
    const [loading, setLoading] = useState(true);
    const {id} = useParams();

    const navigate = useNavigate();

    const [showModalValidacion, setShowModalValidacion] = useState(false);
    const [mensajeValidacion, setMensajeValidacion] = useState("");

    //Para la imagen actual y nueva
    const [imagenFile, setImagenFile] = useState<File | null>(null);
    const [imagenActual, setImagenActual] = useState<string | null>(null);

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
        contrasenha, //setContrasenha,
        setUsuarioAPI
    } = useUsuarioForm();

    useEffect(() => {


        baseAPI.get(`/admin/clientes/${id}`, {
          auth: {
            username: "admin",
            password: "admin123"
          }
        })
          .then(res => {
            //console.log("Datos cargados:", res.data); // VER ESTO EN LA CONSOLA
            setUsuarioAPI(res.data);
            setImagenActual(res.data.fotoPerfil || null);
            //console.log("Usuario:", res.data);
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

    if (!tipoDoc || tipoDoc.trim() === "") {
      setMensajeValidacion("Debe seleccionar un tipo de documento.");
      setShowModalValidacion(true);
      return false;
    }

    if (!genero || genero.trim() === "") {
      setMensajeValidacion("Debe seleccionar un género.");
      setShowModalValidacion(true);
      return false;
    }

    const fechaIngresada = new Date(fechaNacimiento);
    const hoy = new Date();
    if (isNaN(fechaIngresada.getTime()) || fechaIngresada >= hoy) {
      setMensajeValidacion("La fecha de nacimiento debe ser válida y anterior a hoy.");
      return false;
    }
    return true;
  };   



    const handleEditarUsuario = async() => {

      
      //console.log("Genero en onSubmit de admin:", genero);
      //console.log("TipoDoc en onSubmit de admin:", tipoDoc);

      if (!validarCampos()) {
            setShowModalValidacion(true);
            return;
        }

        let nombreArchivo = imagenActual;

      if (imagenFile) {
        const formData = new FormData();
        formData.append("archivo", imagenFile);

        try {
          const res = await axios.post("http://localhost:8080/api/archivo", formData, {
            auth: { username: "admin", password: "admin123" }
          });
          nombreArchivo = res.data.nombreArchivo;
        } catch (error) {
          console.error("Error al subir imagen:", error);
          alert("No se pudo subir la imagen.");
          return;
        }
      }



        try{
            const sexo = genero;

            const response = await baseAPI.put(`/admin/clientes/${id}`, 
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
                    fotoPerfil: nombreArchivo ?? null,
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

            //console.log("Usuario editado:", response.data);
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
                imagenActual={imagenActual}
        onImagenSeleccionada={(file) => setImagenFile(file)}
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