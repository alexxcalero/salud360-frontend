import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

import useComunidadForm from "@/hooks/useComunidadForm";
import ComunidadForm from "@/components/admin/comunidades/ComunidadForm";

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

  const [membresias, setMembresias] = useState<any[]>([]);
  const [membresiasSeleccionadas, setMembresiasSeleccionadas] = useState<number[]>([]);

  const [locales, setLocales] = useState<any[]>([]);
  const [localesSeleccionados, setLocalesSeleccionados] = useState<number[]>([]);

  const [serviciosDisponibles, setServiciosDisponibles] = useState<any[]>([]);
  const [imagen, setImagen] = useState<File | null>(null);

  // ✅ Aquí se mantiene el estado de membresías nuevas y se pasa correctamente al form
  const [nuevasMembresias, setNuevasMembresias] = useState<Item[]>([]);

  // Cargar datos iniciales
  useEffect(() => {
    axios.get("http://localhost:8080/api/servicios", {
      auth: { username: "admin", password: "admin123" }
    }).then(res => setServiciosDisponibles(res.data))
      .catch(err => console.error("Error cargando servicios", err));

    axios.get("http://localhost:8080/api/membresias", {
      auth: { username: "admin", password: "admin123" }
    }).then(res => setMembresias(res.data))
      .catch(err => console.error("Error cargando membresías", err));

    axios.get("http://localhost:8080/api/locales", {
      auth: { username: "admin", password: "admin123" }
    }).then(res => setLocales(res.data))
      .catch(err => console.error("Error cargando locales", err));
  }, []);

  const handleCrearComunidad = async () => {
    try {

      console.log("Las membresias a enviar son:", nuevasMembresias)      

      const requestBody = {
        nombre,
        activo: true,
        descripcion,
        proposito,
        membresias: nuevasMembresias,
        servicios: servicios.map(id => ({ idServicio: id })),
        imagen: imagen ?? null, // si no hay imagen, enviamos null (o puedes omitir este campo si no aplica)
      };

      console.log("Enviando datos de comunidad:", requestBody);

      const response = await axios.post("http://localhost:8080/api/comunidades", requestBody, {
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
        imagen={imagen}
        setImagen={setImagen}
        onSubmit={handleCrearComunidad}
        buttonText="Crear comunidad"
      />
    </div>
  );
}

export default CrearComunidad;