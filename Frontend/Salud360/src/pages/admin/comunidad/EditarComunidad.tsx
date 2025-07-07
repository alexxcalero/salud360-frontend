import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

import useComunidadForm from "@/hooks/useComunidadForm";
import ComunidadForm from "@/components/admin/comunidades/ComunidadForm";
import { baseAPI } from "@/services/baseAPI";
import ModalError from "@/components/ModalError";

function EditarComunidad() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    nombre, setNombre,
    descripcion, setDescripcion,
    proposito, setProposito,
    servicios, setServicios
  } = useComunidadForm();

  //Para la imagen actual y nueva
    const [imagenFile, setImagenFile] = useState<File | null>(null);
    const [imagenActual, setImagenActual] = useState<string | null>(null);
    
  
  const [membresias, setMembresias] = useState<any[]>([]);
  const [membresiasSeleccionadas, setMembresiasSeleccionadas] = useState<number[]>([]);
  const [locales, setLocales] = useState<any[]>([]);
  const [localesSeleccionados, setLocalesSeleccionados] = useState<number[]>([]);
  const [serviciosDisponibles, setServiciosDisponibles] = useState<any[]>([]);
  const [nuevasMembresias, setNuevasMembresias] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [datosCargados, setDatosCargados] = useState(false);
  const [bloquearPrecios, setBloquearPrecios] = useState(false);

  const [mensajeError, setMensajeError] = useState("Hubo un error al editar la comunidad.");
  const [mostrarError, setMostrarError] = useState(false);

  const [showModalErrorValidacion, setShowModalErrorValidacion] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [comunidadRes, serviciosRes, membresiasRes, localesRes] = await Promise.all([
          baseAPI.get(`/comunidades/${id}`, {
            auth: { username: "admin", password: "admin123" }
          }),
          baseAPI.get("/servicios", {
            auth: { username: "admin", password: "admin123" }
          }),
          baseAPI.get("/membresias", {
            auth: { username: "admin", password: "admin123" }
          }),
          baseAPI.get("/locales", {
            auth: { username: "admin", password: "admin123" }
          })
        ]);

        const comunidad = comunidadRes.data;

        // ✅ Bloquear precios si tiene miembros
        setBloquearPrecios((comunidad.cantMiembros ?? 0) > 0);

        // ✅ Solo cargar una vez los valores si no están ya cargados
        if (!datosCargados) {
          setNombre(comunidad.nombre);
          setDescripcion(comunidad.descripcion);
          setProposito(comunidad.proposito);
          setServicios(comunidad.servicios.map((s: any) => s.idServicio));
          setMembresiasSeleccionadas(comunidad.membresias?.map((m: any) => m.idMembresia));
          setLocalesSeleccionados(comunidad.locales?.map((l: any) => l.idLocal));
          setNuevasMembresias((prev) =>
            prev.length === 0
              ? (comunidad.membresias || []).map((m: any) => ({
                  ...m,
                  tipo: m.tipo ?? "Mensual", // lo del tipo pe
                  readOnly: m.cantUsuarios > 0, // ← ✅ aquí se marca
                }))
              : prev
          );
          setImagenActual(comunidad.imagen || null);
          setDatosCargados(true);
        }

        setServiciosDisponibles(serviciosRes.data);
        setMembresias(membresiasRes.data);
        setLocales(localesRes.data);

      } catch (error) {
        setMensajeError("Hubo un error al editar la comunidad.");
        setMostrarError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, datosCargados]);

  const handleEditarComunidad = async () => {
    try {
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
          setMensajeError("No se pudo subir la imagen. Verifique el formato o el tamaño del archivo.");
          setShowModalErrorValidacion(true);
          return;
        }
      }

      if (nuevasMembresias.length === 0) {
        setMensajeError("Debe existir al menos una membresía en la comunidad.");
        setShowModalErrorValidacion(true);
        return;
      }

      const membresiasInvalidas = nuevasMembresias.some((m) => {
        const esNueva = !m.idMembresia;

        console.log("Estamos aqui:", m.tipo)
        console.log("La membresía es:", m)

        const camposObligatorios = [
          m.nombre?.trim(),
          m.tipo?.trim(),
          m.descripcion?.trim(),
          m.precio,
          m.cantUsuarios,
          m.maxReservas,
        ];

        // Si es nueva y al menos un campo está vacío → inválida
        return (
          esNueva &&
          camposObligatorios.some(
            (valor) =>
              valor === undefined ||
              valor === null ||
              valor === "" ||
              (typeof valor === "number" && isNaN(valor))
          )
        );
      });

      if (membresiasInvalidas) {
        setMensajeError("No puede guardar membresías con campos vacíos. Complete todos los campos requeridos.");
        setShowModalErrorValidacion(true);
        return;
      }

      const payload: any = {
        nombre,
        descripcion,
        proposito,
        servicios: servicios.map(id => ({ idServicio: id })), // ← este es el correcto
        membresias: nuevasMembresias.map((m) => {
          if (m.idMembresia && m.readOnly) {
            return { idMembresia: m.idMembresia };
          }

          return {
            ...(m.idMembresia ? { idMembresia: m.idMembresia } : {}),
            nombre: m.nombre,
            tipo: m.tipo,
            precio: m.precio,
            descripcion: m.descripcion,
            cantUsuarios: m.cantUsuarios,
            maxReservas: m.maxReservas,
            conTope: m.conTope,
            icono: m.icono || null,
          };
        }),
      };

      if (nombreArchivo) {
        payload.imagen = nombreArchivo;
      }
      //console.log("Payload final:", JSON.stringify(payload, null, 2));
      //console.log("PAYLOAD A ENVIAR:", JSON.stringify(payload, null, 2));

      const response = await baseAPI.put(`/comunidades/${id}`, payload, {
        auth: {
          username: "admin",
          password: "admin123"
        },
        headers: {
          "Content-Type": "application/json"
        }
      });

      //console.log("✅ Comunidad editada:", response.data);
      //alert("Usuario creado exitosamente");
      //console.log("A punto de navegar a successCrear")
      navigate("/admin/comunidades/successEditar", {
        state: { created: true }
      });

    } catch (error) {
      console.error("❌ Error al editar comunidad:", error);
      setMensajeError("Hubo un error al editar la comunidad.");
      setMostrarError(true);
    }
  };

  if (loading) return <p className="p-6">Cargando comunidad...</p>;

  return (
    <div className="w-full px-10 py-8 text-left">
      <ComunidadForm
        title="Editar Comunidad"
        subtitle="Modifique los datos de la comunidad."
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
        imagen={imagenFile}
        setImagen={setImagenFile}
        imagenActual={imagenActual}
        onImagenSeleccionada={(file) => setImagenFile(file)}
        onSubmit={handleEditarComunidad}
        buttonText="Guardar cambios"
        readOnlyPrecios={bloquearPrecios}
      />

      {mostrarError && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40" />
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <ModalError
              modulo="Error al editar comunidad"
              detalle={mensajeError}
              buttonConfirm="Aceptar"
              onConfirm={() => setMostrarError(false)}
              onCancel={() => setMostrarError(false)}
            />
          </div>
        </>
      )}

      {showModalErrorValidacion && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40" />
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <ModalError
              modulo="Validación requerida"
              detalle={mensajeError}
              buttonConfirm="Aceptar"
              onConfirm={() => setShowModalErrorValidacion(false)}
              onCancel={() => setShowModalErrorValidacion(false)}
            />
          </div>
        </>
      )}

    </div>

  );


}

export default EditarComunidad;