import ServiciosForm from "@/components/admin/servicios/ServiciosForm";
import useServicioForms from "@/hooks/useServicioForms";
import ModalValidacion from "@/components/ModalValidacion";
import  { useState } from "react";
import { useNavigate } from "react-router";
import { baseAPI } from "@/services/baseAPI";

function CrearServicio(){

    const navigate = useNavigate();

    const [showModalValidacion, setShowModalValidacion] = useState(false);
    const [mensajeValidacion, setMensajeValidacion] = useState("");

    //Para la imagen
    const [imagenFile, setImagenFile] = useState<File | null>(null); 
    const [imagenSeleccionada, setImagenSeleccionada] = useState<File | null>(null); 

    const {
        nombre, setNombre,
        descripcion, setDescripcion,
        tipo, setTipo,
        locales, setLocales
        //setServicioAPI
    } = useServicioForms();


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

        //console.log("El contenido de los locales a enviar es:", locales)

        //PARA IMAGEN IGUALMENTE
        let nombreArchivo = null;
        
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
                  alert("No se pudo subir la imagen.");
                  return;
                }
              }
        
        try{
            const response = await baseAPI.post("/servicios", 
                {
                    nombre,
                    descripcion,
                    tipo,
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
            navigate("/admin/servicios/successCrear", {
                state: { created: true }
            });
        }
        catch(err){
            console.error("Error al crear usuario:", err);
            alert("Hubo un error al crear el servicio");
        }
    }

    return(
        <>
        <div className="w-full px-10 py-8 text-left">
            <ServiciosForm
                title= "Registrar Servicio"
                subtitle="Rellene los siguientes campos para completar el registro del servicio."
                nombre={nombre}
                setNombre={setNombre}
                descripcion={descripcion}
                setDescripcion={setDescripcion}
                tipo={tipo}
                setTipo={setTipo}
                locales={locales}
                setLocales={setLocales}
                readOnly={false}
                onSubmit={handleCrearServicio}
                buttonText="Crear Servicio"
                onImagenSeleccionada={(file) => {
            setImagenSeleccionada(file); 
            setImagenFile(file);        
          }}
          imagenSeleccionada={imagenSeleccionada} 
          imagenActual={null} 
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

export default CrearServicio;
