import InputLabel from "@/components/InputLabel";
import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import { useNavigate } from "react-router";
import { useState } from "react";
import ModalError from "@/components/ModalError";
import ModalValidacion from "@/components/ModalValidacion";

interface Servicio {
  idServicio: number;
  nombre: string;
}

interface Item {
  nombre: string;
  conTope: boolean;
  direccion?: string;
  tipo?: string;
  cantUsuarios?: number;
  precio?: number;
  [key: string]: any;
}

interface Props {
  title?: string;
  subtitle?: string;
  nombre: string;
  setNombre: (val: string) => void;
  descripcion: string;
  setDescripcion: (val: string) => void;
  proposito: string;
  setProposito: (val: string) => void;
  serviciosDisponibles: Servicio[];
  serviciosSeleccionados: number[];
  setServiciosSeleccionados: (ids: number[]) => void;
  onSubmit?: () => void;
  buttonText?: string;
  membresiasDisponibles: Item[];
  membresiasSeleccionadas: number[];
  setMembresiasSeleccionadas: (ids: number[]) => void;
  localesDisponibles: Item[];
  localesSeleccionados: number[];
  setLocalesSeleccionados: (ids: number[]) => void;
  nuevasMembresias: Item[]; // ⬅️ Agrega este
  setNuevasMembresias: (items: Item[]) => void; // ⬅️ Y este también
  imagen: File | null;
  setImagen: (file: File | null) => void;
  readOnly?: boolean;
}

function ComunidadForm({
  title = "", subtitle = "",
  nombre, setNombre,
  descripcion, setDescripcion,
  proposito, setProposito,
  serviciosDisponibles,
  serviciosSeleccionados,
  setServiciosSeleccionados,
  onSubmit = () => {},
  buttonText = "Crear comunidad",
  membresiasDisponibles,
  membresiasSeleccionadas,
  setMembresiasSeleccionadas,
  localesDisponibles,
  localesSeleccionados,
  setLocalesSeleccionados,
  nuevasMembresias,
  setNuevasMembresias,
  imagen,
  setImagen,
  readOnly = false
}: Props) {

  const navigate = useNavigate();
  //const [nuevasMembresias, setNuevasMembresias] = useState<Item[]>([]);
  const textoValido = (texto: string) => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9 ,.;-]*$/.test(texto);

  const validarCampos = () => {
    if (!nombre.trim() || !descripcion.trim() || !proposito.trim()) {
      setMensajeError("Los campos Nombre, Descripción y Propósito son obligatorios.");
      setShowModalValidacion(true);
      return false;
    }

    if (!textoValido(nombre)) {
      setMensajeError("El nombre de la comunidad contiene caracteres no permitidos.");
      setShowModalValidacion(true);
      return false;
    }

    if (!textoValido(descripcion)) {
      setMensajeError("La descripción contiene caracteres no permitidos.");
      setShowModalValidacion(true);
      return false;
    }

    if (!textoValido(proposito)) {
      setMensajeError("El propósito contiene caracteres no permitidos.");
      setShowModalValidacion(true);
      return false;
    }

    for (let i = 0; i < nuevasMembresias.length; i++) {
      const m = nuevasMembresias[i];
      const camposTexto = [m.nombre, m.tipo, m.descripcion, m.icono];
      if (!camposTexto.every((txt) => textoValido(txt))) {
        setMensajeError(`Uno o más campos de membresías contienen caracteres inválidos (fila ${i + 1}).`);
        setShowModalValidacion(true);
        return false;
      }
    }

    return true;
  };

  const toggle = (id: number, selected: number[], setSelected: (val: number[]) => void) => {
    if (readOnly) return;
    setSelected(
      selected.includes(id)
        ? selected.filter(item => item !== id)
        : [...selected, id]
    );
  };

  const [showModalValidacion, setShowModalValidacion] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  const handleAddMembresia = () => {
    setNuevasMembresias([
      ...nuevasMembresias,
      {
        nombre: "",
        conTope: true,
        tipo: "",
        cantUsuarios: 0,
        maxReservas: 0,
        precio: 0,
        descripcion: "",
        icono: "",
      }
    ]);
  };
  
  

  const handleChangeMembresia = (index: number, field: string, value: any) => {
    const updated = [...nuevasMembresias];

    // Si se está cambiando el valor de "conTope"
    if (field === "conTope") {
      updated[index]["conTope"] = value;
      updated[index]["maxReservas"] = value ? 0 : -1; // si tiene tope: inicia en 0, sino -1
    } else {
      // Si es maxReservas y el campo conTope es false, forzamos -1
      if (field === "maxReservas" && !updated[index].conTope) {
        updated[index][field] = -1;
      } else {
        updated[index][field] = value;
      }
    }

    setNuevasMembresias(updated);
  };

  const localesFiltrados = localesDisponibles.filter(local =>
    serviciosSeleccionados.includes(local.idServicio)
  );

  const handleRemoveMembresia = (index: number) => {
    const updated = [...nuevasMembresias];
    updated.splice(index, 1);
    setNuevasMembresias(updated);
  };

  return (
    <div className="w-full px-10 py-6">
      <h1 className="text-4xl font-bold mb-2">{title}</h1>
      <h2 className="text-lg text-gray-700 mb-6">{subtitle}</h2>

      <div className="grid grid-cols-1 gap-4">
        <InputLabel label="Nombre" htmlFor="nombre" value={nombre} required={true && !readOnly} onChange={(e) => setNombre(e.target.value)} disabled={readOnly} />
        <InputLabel label="Descripción" htmlFor="descripcion" value={descripcion} required={true && !readOnly} onChange={(e) => setDescripcion(e.target.value)} disabled={readOnly} />
        <InputLabel label="Propósito" htmlFor="proposito" value={proposito} required={true && !readOnly} onChange={(e) => setProposito(e.target.value)} disabled={readOnly} />
      </div>

      <div className="mt-6">
        <p className="font-semibold mb-2">Seleccione los servicios que ofrece su comunidad: {!readOnly && <span className="text-red-500">*</span>} </p>
        <div className="bg-gray-100 p-4 rounded-md space-y-2">
          {serviciosDisponibles.map((servicio) => (
            <div key={servicio.idServicio} className="flex items-center space-x-2">
              <Checkbox
                id={`servicio-${servicio.idServicio}`}
                checked={serviciosSeleccionados.includes(servicio.idServicio)}
                onChange={() => toggle(servicio.idServicio, serviciosSeleccionados, setServiciosSeleccionados)}
                disabled={readOnly}
              />
              <label htmlFor={`servicio-${servicio.idServicio}`} className="text-sm text-gray-800">
                {servicio.nombre}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <div className="flex justify-between items-center mb-2">
          <p className="font-medium">Añada las membresías asociadas a la comunidad: {!readOnly && <span className="text-red-500">*</span>} </p>
          {!readOnly && (
            <button
              type="button"
              onClick={handleAddMembresia}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded"
            >
              +
            </button>
          )}
        </div>

        <div className="w-full overflow-x-auto rounded-lg border">
          <table className="min-w-[1000px] w-full text-sm">
            <thead>
              <tr className="bg-blue-500 text-white font-semibold">
                <th className="py-2 px-4">Nombre</th>
                <th className="py-2 px-4">Tipo</th>
                <th className="py-2 px-4">Tope</th>
                <th className="py-2 px-4">Cant. Usuarios</th>
                <th className="py-2 px-4">Max. Reservas</th>
                <th className="py-2 px-4">Precio (S/.)</th>
                <th className="py-2 px-4">Descripción</th>
                <th className="py-2 px-4">Ícono</th>
                <th className="py-2 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {nuevasMembresias.map((m, index) => (
                <tr key={index} className="border-t">
                  <td className="p-2">
                    <input type="text" value={m.nombre} onChange={(e) => handleChangeMembresia(index, "nombre", e.target.value)} className="border p-1 rounded w-full" disabled={readOnly} />
                  </td>
                  <td className="p-2">
                    <input type="text" value={m.tipo} onChange={(e) => handleChangeMembresia(index, "tipo", e.target.value)} className="border p-1 rounded w-full" disabled={readOnly} />
                  </td>
                  <td className="p-2">
                    <select value={m.conTope ? "true" : "false"} onChange={(e) => handleChangeMembresia(index, "conTope", e.target.value === "true")} className="border p-1 rounded w-full" disabled={readOnly}>
                      <option value="true">Sí</option>
                      <option value="false">No</option>
                    </select>
                  </td>
                  <td className="p-2">
                    <input type="number" value={m.cantUsuarios} min={0} onChange={(e) => handleChangeMembresia(index, "cantUsuarios", Math.max(0, parseInt(e.target.value)))} className="border p-1 rounded w-full" disabled={readOnly} />
                  </td>
                  <td className="p-2">
                    <input type="number" value={m.conTope ? m.maxReservas ?? "" : ""} min={0} onChange={(e) => handleChangeMembresia(index, "maxReservas", e.target.value === "" ? "" : Math.max(0, parseInt(e.target.value)))} className="border p-1 rounded w-full" disabled={readOnly || !m.conTope} />
                  </td>
                  <td className="p-2">
                    <input type="number" value={m.precio} min={0} onChange={(e) => handleChangeMembresia(index, "precio", Math.max(0, parseFloat(e.target.value)))} className="border p-1 rounded w-full" disabled={readOnly} />
                  </td>
                  <td className="p-2">
                    <input type="text" value={m.descripcion} onChange={(e) => handleChangeMembresia(index, "descripcion", e.target.value)} className="border p-1 rounded w-full" disabled={readOnly} />
                  </td>
                  <td className="p-2">
                    <input type="text" value={m.icono} onChange={(e) => handleChangeMembresia(index, "icono", e.target.value)} className="border p-1 rounded w-full" disabled={readOnly} />
                  </td>
                  <td className="p-2 text-center">
                    <button type="button" onClick={() => handleRemoveMembresia(index)} className="text-gray-600 hover:text-red-600">🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6">
        <p className="font-medium mb-2">Los locales asociados a la comunidad son:</p>
        <div className="w-full overflow-x-auto border rounded-lg">
          <div className="grid grid-cols-2 bg-blue-500 text-white py-2 px-4 text-sm font-semibold">
            <span>Nombre</span>
            <span>Dirección</span>
          </div>
          {localesFiltrados.map((l) => (
            <div
              key={l.id}
              className="grid grid-cols-2 border-t text-sm py-2 px-4 hover:bg-gray-100 cursor-pointer"
              onClick={() => !readOnly && toggle(l.id, localesSeleccionados, setLocalesSeleccionados)}
            >
              <span>{l.nombre}</span>
              <span>{l.direccion || "-"}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <p className="font-medium mb-2">Seleccione una imagen de perfil</p>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImagen(e.target.files?.[0] || null)}
          className="border p-2"
          disabled={readOnly}
        />

        {imagen && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-1">Vista previa:</p>
            <img
              src={URL.createObjectURL(imagen)}
              alt="Vista previa"
              className="w-32 h-32 object-cover rounded border"
            />
          </div>
        )}
      </div>


      <div className="flex flex-row justify-between">
        <Button variant="primary" size="lg" className="my-4" onClick={() => navigate(-1)}>Volver</Button>
        {!readOnly && (
          <Button variant="primary" size="lg" className="my-4" onClick={() => {
            if (validarCampos()) {
              onSubmit();
            }
          }}>{buttonText}</Button>
        )}
      </div>

      {showModalValidacion && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40" />
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <ModalValidacion
              titulo="Error en los campos"
              mensaje={mensajeError}
              onClose={() => setShowModalValidacion(false)}
            />
          </div>
        </>
      )}

    </div>
    
  );

  

}

export default ComunidadForm;
