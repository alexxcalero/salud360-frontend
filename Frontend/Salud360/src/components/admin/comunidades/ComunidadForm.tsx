import InputLabel from "@/components/InputLabel";
import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import { useNavigate } from "react-router";

interface Servicio {
  idServicio: number;
  nombre: string;
}

interface Item {
  id: number;
  nombre: string;
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
  imagen,
  setImagen,
  readOnly = false
}: Props) {

  const navigate = useNavigate();

  const toggle = (id: number, selected: number[], setSelected: (val: number[]) => void) => {
    if (readOnly) return;
    setSelected(
      selected.includes(id)
        ? selected.filter(item => item !== id)
        : [...selected, id]
    );
  };

  return (
    <div className="w-full px-10 py-6">
      <h1 className="text-4xl font-bold mb-2">{title}</h1>
      <h2 className="text-lg text-gray-700 mb-6">{subtitle}</h2>

      <div className="grid grid-cols-1 gap-4">
        <InputLabel label="Nombre *" htmlFor="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} readOnly={readOnly} />
        <InputLabel label="Descripción *" htmlFor="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} readOnly={readOnly} />
        <InputLabel label="Propósito *" htmlFor="proposito" value={proposito} onChange={(e) => setProposito(e.target.value)} readOnly={readOnly} />
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
        <p className="font-medium mb-2">Seleccione las membresías asociadas a la comunidad</p>
        <div className="border rounded-lg overflow-hidden">
          <div className="grid grid-cols-4 bg-blue-500 text-white py-2 px-4 text-sm font-semibold">
            <span>Nombre</span>
            <span>Tipo</span>
            <span>Tope</span>
            <span>Precio</span>
          </div>
          {membresiasDisponibles.map((m) => (
            <div
              key={m.id}
              className="grid grid-cols-4 border-t text-sm py-2 px-4 hover:bg-gray-100 cursor-pointer"
              onClick={() => !readOnly && toggle(m.id, membresiasSeleccionadas, setMembresiasSeleccionadas)}
            >
              <span>{m.nombre}</span>
              <span>{m.tipo || "-"}</span>
              <span>{m.tope || "-"}</span>
              <span>{m.precio || "-"}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <p className="font-medium mb-2">Seleccione los locales asociados a la comunidad</p>
        <div className="border rounded-lg overflow-hidden">
          <div className="grid grid-cols-2 bg-blue-500 text-white py-2 px-4 text-sm font-semibold">
            <span>Nombre</span>
            <span>Dirección</span>
          </div>
          {localesDisponibles.map((l) => (
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
