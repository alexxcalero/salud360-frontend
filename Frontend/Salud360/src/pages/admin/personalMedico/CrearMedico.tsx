import PersonalMedicoForms from "@/components/admin/personalMedico/PersonalMedicoForms";
import usePersonalMedicoForm from "@/hooks/usePersonalMedicoForm";
//import UnderConstruction from "@/pages/UnderConstruction";
import ModalValidacion from "@/components/ModalValidacion";
import  { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { baseAPI } from "@/services/baseAPI";

function CrearMedico() {
  const navigate = useNavigate();


  const [showModalValidacion, setShowModalValidacion] = useState(false);
  const [mensajeValidacion, setMensajeValidacion] = useState("");
  //Para la imagen
    const [imagenFile, setImagenFile] = useState<File | null>(null);

  const {
    nombres,
    setNombres,
    apellidos,
    setApellidos,
    tipoDoc,
    setTipoDoc,
    DNI,
    setDNI,
    //telefono,
    //setTelefono,
    especialidad,
    setEspecialidad,
    //correo,
    //setCorreo,
    genero,
    setGenero,
    //fechaNacimiento,
    //setFechaNacimiento,
    //contrasenha,
   // setContrasenha,
    descripcion,
    setDescripcion,
  } = usePersonalMedicoForm();

  
  //VALIDACIONES DE CAMPOS 
    const validarCampos = (): boolean => {
    const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    const soloNumeros = /^[0-9]+$/;

    if (!nombres || !soloLetras.test(nombres)) {
      setMensajeValidacion("Los nombres deben contener solo letras y no estar vacíos.");
      setShowModalValidacion(true);
      return false;
    }

    if (!apellidos || !soloLetras.test(apellidos)) {
      setMensajeValidacion("Los apellidos deben contener solo letras y no estar vacíos.");
      setShowModalValidacion(true);
      return false;
    }

    if (!DNI || !soloNumeros.test(DNI) || DNI.length !== 8) {
      setMensajeValidacion("El DNI debe tener exactamente 8 dígitos numéricos.");
      setShowModalValidacion(true);
      return false;
    }


    if (!especialidad || especialidad.trim() === "") {
      setMensajeValidacion("La especialidad no puede estar vacía.");
      setShowModalValidacion(true);
      return false;
    }

    if (!descripcion || descripcion.trim() === "") {
      setMensajeValidacion("La descripción no puede estar vacía.");
      setShowModalValidacion(true);
      return false;
    }
    //modb t
    if (!tipoDoc || tipoDoc === "") {
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



  const handleCrearMedico = async () => {

    if (!validarCampos()) {
            setShowModalValidacion(true);
            return;
    }
    

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


    try {
      const sexo = genero;
      //console.log("Nombre de la imagen subida:", nombreArchivo);
      const response = await baseAPI.post(
        "/admin/medicos",
        {
          nombres,
          apellidos,
          numeroDocumento: DNI,
          sexo,
          especialidad,
          descripcion,
          fotoPerfil: nombreArchivo ?? null,
          tipoDocumento: {
            idTipoDocumento: tipoDoc,
          }
          
        },
        {
          auth: {
            username: "admin",
            password: "admin123",
          },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      //console.log("Medico creado:", response.data);
      //alert("Medico creado exitosamente");
      //console.log("A punto de navegar a successCrear")
      navigate("/admin/personalMedico/successCrear", {
          state: { created: true }
      });
    } catch (err) {
      console.error("Error al crear medio:", err);
      alert("Hubo un error al crear el medico");
    }
  };

  return (
    <>
    <div>
      <PersonalMedicoForms
        title="Registrar Medico"
        subtitle="Rellene los siguientes campos para completar el registro del medico."
        nombres={nombres}
        setNombres={setNombres}
        apellidos={apellidos}
        setApellidos={setApellidos}
        tipoDoc={tipoDoc}
        setTipoDoc={setTipoDoc}
        DNI={DNI}
        setDNI={setDNI}
        especialidad={especialidad}
        setEspecialidad={setEspecialidad}
        genero={genero}
        setGenero={setGenero}
        descripcion={descripcion}
        setDescripcion={setDescripcion}
        onSubmit={handleCrearMedico}
        buttonText="Crear Medico"
        readOnly={false}
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

export default CrearMedico;
