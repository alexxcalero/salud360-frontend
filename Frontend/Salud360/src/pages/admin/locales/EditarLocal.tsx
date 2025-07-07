import LocalesForms from "@/components/admin/locales/LocalesForms";
import useLocalForm from "@/hooks/useLocalForm";
import { useEffect, useState } from "react";
import ModalValidacion from "@/components/ModalValidacion";
import { useNavigate, useParams } from "react-router";
import { baseAPI } from "@/services/baseAPI";

function EditarLocal(){
    const [loading, setLoading] = useState(true);
    const {id} = useParams();
    const navigate = useNavigate();

    const [showModalValidacion, setShowModalValidacion] = useState(false);
    const [mensajeValidacion, setMensajeValidacion] = useState("");

    //Para la imagen actual y nueva
    const [imagenFile, setImagenFile] = useState<File | null>(null);
    const [imagenActual, setImagenActual] = useState<string | null>(null);
    
    const {
        nombre, setNombre,
        telefono, setTelefono,
        descripcion, setDescripcion,
        direccion, setDireccion,
        tipo, setTipo,
        servicios, setServicios,
        setLocalAPI
    } = useLocalForm();
    
    //const [serviciosSeleccionados, setServiciosSeleccionados] = useState([]);

    useEffect(() => {
        baseAPI.get(`/locales/${id}`, {
          auth: {
            username: "admin",
            password: "admin123"
          }
        })
          .then(res => {
            //console.log("Datos cargados en detalleLocal:", res.data); // VER ESTO EN LA CONSOLA
            setLocalAPI(res.data)
            //console.log("Servicio:", res.data);
            //console.log("idServicio:", res.data.servicio.idServicio);
            setLoading(false);
            setImagenActual(res.data.imagen); //Para que no se loquee si no se sube imagen
            //setServiciosSeleccionados([res.data.servicio.idServicio]);
          })
          .catch(err => {
            console.error("Error cargando el servicio", err);
            setLoading(false);
          });
          
      }, []);

    if (loading) {
      return <p>Cargando local...</p>; // o un spinner
    }


    //VALIDACIONES DE CAMPOS 
    const validarCampos = (): boolean => {
        //const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
        const soloNumeros = /^[0-9]+$/;

        if (!nombre || nombre.trim() === "") {
            setMensajeValidacion("El nombre del local no debe estar vacíos.");
            setShowModalValidacion(true);
        return false;
        }

        if (!telefono || !soloNumeros.test(telefono) || telefono.length !== 9) {
            setMensajeValidacion("El teléfono debe tener exactamente 9 dígitos numéricos.");
            return false;
        }

        if (!direccion || direccion.trim() === "") {
            setMensajeValidacion("La dirección no puede estar vacía.");
            setShowModalValidacion(true);
        return false;
        }

        if (!descripcion || descripcion.trim() === "") {
            setMensajeValidacion("La descripción no puede estar vacía.");
            setShowModalValidacion(true);
        return false;
        }

        if (!tipo || tipo.trim() === "") {
            setMensajeValidacion("El tipo no puede estar vacío.");
            setShowModalValidacion(true);
        return false;
        }

        if (!servicios || servicios.toString().trim() === "") {
            setMensajeValidacion("Debe seleccionar un servicio.");
            setShowModalValidacion(true);
        return false;
        }

        return true;
    }


    const handleEditarLocal = async() => {

        if (!validarCampos()) {
            setShowModalValidacion(true);
            return;
        }
        //console.log("El contenido de los servicios a enviar es:", servicios)
        //Para la imagen:
        let nombreArchivo = imagenActual;

        if (imagenFile) {
        const formData = new FormData();
        formData.append("archivo", imagenFile);
        try {
            const res = await baseAPI.post("/archivo", formData, {
            auth: {
                username: "admin",
                password: "admin123"
            }
            });
            nombreArchivo = res.data.nombreArchivo;
        } catch (error) {
            console.error("Error al subir imagen:", error);
            setMensajeValidacion("No se pudo subir la imagen.");
            setShowModalValidacion(true);
            return;
        }
        }
        
        try{
            const response = await baseAPI.put(`/locales/${id}`, 
                {
                    nombre,
                    descripcion,
                    direccion,
                    telefono,
                    tipoServicio: tipo,
                    //servicio: servicios.map(id => ({idServicio: id})),
                    servicio: { idServicio: servicios },
                    imagen: nombreArchivo
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

            //console.log("A punto de navegar a successCrear")
            navigate("/admin/locales/successEditar", {
                state: { created: true }
            });
        }
        catch(err){
            console.error("Error al crear local:", err);
            alert("Hubo un error al crear el local");
        }
    }

    return(
        <>
        <div className="w-full px-10 py-8 text-left">
            <LocalesForms
                title= "Editar Local"
                nombre={nombre}
                setNombre={setNombre}
                telefono={telefono}
                setTelefono={setTelefono}
                descripcion={descripcion}
                setDescripcion={setDescripcion}
                direccion={direccion}
                setDireccion={setDireccion}
                tipo={tipo}
                setTipo={setTipo}
                servicios={servicios}
                setServicios={setServicios}
                readOnly={false}
                onSubmit={handleEditarLocal}
                buttonText="Guardar"
                imagenActual={imagenActual}
                onImagenSeleccionada={(file) => setImagenFile(file)}
            />
        </div>
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

export default EditarLocal;