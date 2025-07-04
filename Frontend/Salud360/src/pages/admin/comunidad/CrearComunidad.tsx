import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

import useComunidadForm from "@/hooks/useComunidadForm";
import ComunidadForm from "@/components/admin/comunidades/ComunidadForm";
import { baseAPI } from "@/services/baseAPI";

interface Item {
  nombre: string;
  conTope: boolean;
  direccion?: string;
  tipo?: string;
  cantUsuarios?: number;
  precio?: number;
  [key: string]: any;
}

function CrearComunidad() {
  const navigate = useNavigate();

  const {
    nombre, setNombre,
    descripcion, setDescripcion,
    proposito, setProposito,
    servicios, setServicios
  } = useComunidadForm();
  //Para la imagen
    const [imagenFile, setImagenFile] = useState<File | null>(null);
  
    
  const [membresias, setMembresias] = useState<any[]>([]);
  const [membresiasSeleccionadas, setMembresiasSeleccionadas] = useState<number[]>([]);

  const [locales, setLocales] = useState<any[]>([]);
  const [localesSeleccionados, setLocalesSeleccionados] = useState<number[]>([]);

  const [serviciosDisponibles, setServiciosDisponibles] = useState<any[]>([]);

  // ✅ Aquí se mantiene el estado de membresías nuevas y se pasa correctamente al form
  const [nuevasMembresias, setNuevasMembresias] = useState<Item[]>([]);

  // Cargar datos iniciales
  useEffect(() => {
    baseAPI.get("/servicios", {
      auth: { username: "admin", password: "admin123" }
    }).then(res => setServiciosDisponibles(res.data))
      .catch(err => console.error("Error cargando servicios", err));

    baseAPI.get("/membresias", {
      auth: { username: "admin", password: "admin123" }
    }).then(res => setMembresias(res.data))
      .catch(err => console.error("Error cargando membresías", err));

    baseAPI.get("/locales", {
      auth: { username: "admin", password: "admin123" }
    }).then(res => setLocales(res.data))
      .catch(err => console.error("Error cargando locales", err));
  }, []);

  const handleCrearComunidad = async () => {
    try {

      console.log("Las membresias a enviar son:", nuevasMembresias)      

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

      const requestBody = {
        nombre,
        activo: true,
        descripcion,
        proposito,
        membresias: nuevasMembresias,
        servicios: servicios.map(id => ({ idServicio: id })),
        imagen: nombreArchivo,
      };

      console.log("Enviando datos de comunidad:", requestBody);

      const response = await baseAPI.post("/comunidades", requestBody, {
        auth: {
          username: "admin",
          password: "admin123"
        },
        headers: {
          "Content-Type": "application/json"
        }
      });

      console.log("✅ Comunidad creada:", response.data);
      //alert("Usuario creado exitosamente");
      console.log("A punto de navegar a successCrear")
      navigate("/admin/comunidades/successCrear", {
        state: { created: true }
      });
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        console.error("Respuesta del servidor:", err.response?.data);
        console.error("Código de estado:", err.response?.status);
        console.error("Encabezados:", err.response?.headers);
      } else {
        console.error("Error desconocido:", err);
      }
      alert("Hubo un error al crear la comunidad");
    }
  };

  return (
    <div className="w-full px-10 py-8 text-left">
      <ComunidadForm
        title="Registro Comunidad"
        subtitle="Complete los datos para crear una comunidad."
        nombre={nombre}
        setNombre={setNombre}
        descripcion={descripcion}
        setDescripcion={setDescripcion}
        proposito={proposito}
        setProposito={setProposito}
        serviciosDisponibles={serviciosDisponibles}
        serviciosSeleccionados={servicios}
        setServiciosSeleccionados={setServicios}
        membresiasDisponibles={membresias}
        membresiasSeleccionadas={membresiasSeleccionadas}
        setMembresiasSeleccionadas={setMembresiasSeleccionadas}
        nuevasMembresias={nuevasMembresias}
        setNuevasMembresias={setNuevasMembresias}
        localesDisponibles={locales}
        localesSeleccionados={localesSeleccionados}
        setLocalesSeleccionados={setLocalesSeleccionados}
        
        onSubmit={handleCrearComunidad}
        buttonText="Crear comunidad"
        onImagenSeleccionada={(file) => setImagenFile(file)}
      />
    </div>
  );
}

export default CrearComunidad;