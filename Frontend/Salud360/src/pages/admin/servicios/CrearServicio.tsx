import ServiciosForm from "@/components/admin/servicios/ServiciosForm";
import useServicioForms from "@/hooks/useServicioForms";
import axios from "axios";
import ModalValidacion from "@/components/ModalValidacion";
import  { useState, useEffect } from "react";
import { useNavigate } from "react-router";

function CrearServicio(){

    const navigate = useNavigate();

    const [showModalValidacion, setShowModalValidacion] = useState(false);
    const [mensajeValidacion, setMensajeValidacion] = useState("");

    const {
        nombre, setNombre,
        descripcion, setDescripcion,
        tipo, setTipo,
        locales, setLocales,
        setServicioAPI
    } = useServicioForms();


    //VALIDACIONES DE CAMPOS 
    const validarCampos = (): boolean => {
    const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    const soloNumeros = /^[0-9]+$/;

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

        console.log("El contenido de los locales a enviar es:", locales)
        try{
            const response = await axios.post("http://localhost:8080/api/servicios", 
                {
                    nombre,
                    descripcion,
                    tipo,
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

            console.log("A punto de navegar a successCrear")
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
