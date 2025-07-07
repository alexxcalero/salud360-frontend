import ServiciosForm from "@/components/admin/servicios/ServiciosForm";
import useServicioForms from "@/hooks/useServicioForms";
import { useEffect, useState } from "react";
import ModalValidacion from "@/components/ModalValidacion";
import { useNavigate, useParams } from "react-router";
import { baseAPI } from "@/services/baseAPI";

function EditarServicio(){

    const [loading, setLoading] = useState(true);
    const {id} = useParams();
    const navigate = useNavigate();


    const [showModalValidacion, setShowModalValidacion] = useState(false);
    const [mensajeValidacion, setMensajeValidacion] = useState("");

    //Para la imagen actual y nueva
    const [imagenFile, setImagenFile] = useState<File | null>(null);
    const [imagenActual, setImagenActual] = useState<string | null>(null);
    const [imagenSeleccionada, setImagenSeleccionada] = useState<File | null>(null);

    const {
        nombre, setNombre,
        descripcion, setDescripcion,
        tipo, setTipo,
        locales, //setLocales,
        setServicioAPI
    } = useServicioForms();

    useEffect(() => {
        baseAPI.get(`/servicios/${id}`, {
          auth: {
            username: "admin",
            password: "admin123"
          }
        })
          .then(res => {
            //console.log("Datos cargados en editarServicio:", res.data); // VER ESTO EN LA CONSOLA
            setServicioAPI(res.data)
            setLoading(false);
            setImagenActual(res.data.imagen || null);
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
    //const soloNumeros = /^[0-9]+$/;

    if (!nombre || nombre.trim() === "") {
      setMensajeValidacion("El nombre del servicio no debe estar vacíos.");
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


    return true;
    };


    const handleCrearServicio = async() => {

        if (!validarCampos()) {
            setShowModalValidacion(true);
            return;
        }

        let nombreArchivo = imagenActual;

      if (imagenFile) {
        const formData = new FormData();
        formData.append("archivo", imagenFile);

        try {
          const res = await baseAPI.post("/archivo", formData, {
            auth: { username: "admin", password: "admin123" }
          });
          nombreArchivo = res.data.nombreArchivo;
        } catch (error) {
          console.error("Error al subir imagen:", error);
          alert("No se pudo subir la imagen.");
          return;
        }
      }

        //console.log("El contenido de los locales a enviar es:", locales)
        try{
            const response = await baseAPI.put(`/servicios/${id}`, 
                {
                    nombre,
                    descripcion,
                    tipo,
                    imagen: nombreArchivo,
                    locales: {idLocal: locales},
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
            navigate("/admin/servicios/successCrear", {
                state: { created: true }
            });
        }
        catch(err){
            console.error("Error al editar servicio:", err);
            alert("Hubo un error al editar el servicio");
        }
    }

    return(
        <>
        <div className="w-full px-10 py-8 text-left">
            <ServiciosForm
                title= "Editar servicio"
                nombre={nombre}
                setNombre={setNombre}
                descripcion={descripcion}
                setDescripcion={setDescripcion}
                tipo={tipo}
                setTipo={setTipo}
                readOnly={false}
                onSubmit={handleCrearServicio}
                buttonText="Guardar"
                onImagenSeleccionada={(file) => {
                setImagenSeleccionada(file);
                setImagenFile(file);
                }}
                imagenSeleccionada={imagenSeleccionada}
                imagenActual={imagenActual}
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
    )


}

export default EditarServicio