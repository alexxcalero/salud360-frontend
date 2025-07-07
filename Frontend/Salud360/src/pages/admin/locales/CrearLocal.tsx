import LocalesForms from "@/components/admin/locales/LocalesForms";
import useLocalForm from "@/hooks/useLocalForm";
import ModalValidacion from "@/components/ModalValidacion";
import  { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { baseAPI } from "@/services/baseAPI";

function CrearLocal(){
    const navigate = useNavigate();

    const [showModalValidacion, setShowModalValidacion] = useState(false);
    const [mensajeValidacion, setMensajeValidacion] = useState("");

    const {
        nombre, setNombre,
        telefono, setTelefono,
        descripcion, setDescripcion,
        direccion, setDireccion,
        tipo, setTipo,
        servicios, setServicios,
        aforo, setAforo
        //setLocalAPI
    } = useLocalForm();

    //Para la imagen
    const [imagenFile, setImagenFile] = useState<File | null>(null);


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
            setShowModalValidacion(true);
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

    
    const handleCrearLocal = async () => {
        if (!validarCampos()) {
            return;
        }
            

        //Para la imagen
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
            setMensajeValidacion("No se pudo subir la imagen.");
            setShowModalValidacion(true);
            return;
        }
        }
        

        try {

            setAforo(0);
            // 🔍 Validar si ya existe un local con ese nombre y servicio
            const { data: existe } = await baseAPI.get(
                "/locales/validar-existencia",
                {
                    params: {
                        nombre: nombre,
                        idServicio: servicios
                    },
                    auth: {
                        username: "admin",
                        password: "admin123"
                    }
                }
            );

            if (existe) {
                setMensajeValidacion("Ya existe un local con ese nombre para el servicio seleccionado.");
                setShowModalValidacion(true);
                return;
            }

            // ✅ Si no existe, procede a crear el local
            await baseAPI.post("/locales",
                {
                    nombre,
                    descripcion,
                    direccion,
                    telefono,
                    aforo,
                    tipoServicio: tipo,
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
                    }
                });

            navigate("/admin/locales/successCrear", {
                state: { created: true }
            });
        } catch (err) {
            console.error("Error al crear local:", err);
            setMensajeValidacion("Hubo un error al crear el local.");
            setShowModalValidacion(true);
        }
    };

    return(
        <>
        <div className="w-full px-10 py-8 text-left">
            <LocalesForms
                title= "Registrar Local"
                subtitle="Rellene los siguientes campos para completar el registro del local."
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
                onSubmit={handleCrearLocal}
                buttonText="Crear Local"
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

    )

}

export default CrearLocal;
