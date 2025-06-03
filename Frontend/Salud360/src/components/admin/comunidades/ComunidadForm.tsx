import InputLabel from "@/components/InputLabel";
import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import { useNavigate } from "react-router";
import { useState } from "react";

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

  const toggle = (id: number, selected: number[], setSelected: (val: number[]) => void) => {
    if (readOnly) return;
    setSelected(
      selected.includes(id)
        ? selected.filter(item => item !== id)
        : [...selected, id]
    );
  };

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
    updated[index][field] = value;
    console.log("El nuevo objeto membresía es:", updated)
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
        <InputLabel label="Nombre *" htmlFor="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} disabled={readOnly} />
        <InputLabel label="Descripción *" htmlFor="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} disabled={readOnly} />
        <InputLabel label="Propósito *" htmlFor="proposito" value={proposito} onChange={(e) => setProposito(e.target.value)} disabled={readOnly} />
      </div>

      <div className="mt-6">
        <p className="font-semibold mb-2">Seleccione los servicios que ofrece su comunidad:</p>
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
          <p className="font-medium">Añada las membresías asociadas a la comunidad</p>
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

        <div className="border rounded-lg overflow-auto">
          <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_2fr_1fr_auto] bg-blue-500 text-white py-2 px-4 text-sm font-semibold min-w-[1000px]">
            <span>Nombre</span>
            <span>Tipo</span>
            <span>Tope</span>
            <span>Max. Reservas</span>
            <span>Precio</span>
            <span>Descripción</span>
            <span>Ícono</span>
            <span></span> {/* Espacio del tachito */}
          </div>

          {nuevasMembresias.map((m, index) => (
            <div key={m.id} className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_2fr_1fr_auto] border-t text-sm py-2 px-4 gap-2 min-w-[1000px]">
              <input
                type="text"
                placeholder="Nombre"
                value={m.nombre}
                onChange={(e) => handleChangeMembresia(index, "nombre", e.target.value)}
                className="border p-1 rounded"
                disabled={readOnly}
              />
              <input
                type="text"
                placeholder="Tipo"
                value={m.tipo}
                onChange={(e) => handleChangeMembresia(index, "tipo", e.target.value)}
                className="border p-1 rounded"
                disabled={readOnly}
              />
              <input
                type="number"
                placeholder="Tope"
                value={m.cantUsuarios}
                onChange={(e) => handleChangeMembresia(index, "cantUsuarios", parseInt(e.target.value))}
                className="border p-1 rounded"
                disabled={readOnly}
              />
              <input
                type="number"
                placeholder="Máx. Reservas"
                value={m.maxReservas}
                onChange={(e) => handleChangeMembresia(index, "maxReservas", parseInt(e.target.value))}
                className="border p-1 rounded"
                disabled={readOnly}
              />
              <input
                type="number"
                placeholder="Precio"
                value={m.precio}
                onChange={(e) => handleChangeMembresia(index, "precio", parseFloat(e.target.value))}
                className="border p-1 rounded"
                disabled={readOnly}
              />
              <input
                type="text"
                placeholder="Descripción"
                value={m.descripcion}
                onChange={(e) => handleChangeMembresia(index, "descripcion", e.target.value)}
                className="border p-1 rounded"
                disabled={readOnly}
              />
              <input
                type="text"
                placeholder="Ícono"
                value={m.icono}
                onChange={(e) => handleChangeMembresia(index, "icono", e.target.value)}
                className="border p-1 rounded"
                disabled={readOnly}
              />
              <button
                type="button"
                onClick={() => handleRemoveMembresia(index)}
                className="text-gray-600 hover:text-red-600"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <p className="font-medium mb-2">Los locales asociados a la comunidad son:</p>
        <div className="border rounded-lg overflow-hidden">
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

      {!readOnly && (
        <div className="flex gap-4 mt-6">
          <Button variant="primary" size="md" onClick={() => navigate("/admin/comunidades")}>Volver</Button>
          <div className="ml-auto">
            <Button variant="primary" size="md" onClick={onSubmit}>
              {buttonText}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ComunidadForm;
