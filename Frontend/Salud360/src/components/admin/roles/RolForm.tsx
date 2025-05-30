import InputLabel from "@/components/InputLabel";
import Button from "@/components/Button";
import { useNavigate } from "react-router";

interface Props {
  nombre: string;
  setNombre: (val: string) => void;
  usuariosAsignados?: number;
  fechaCreacion?: string;
  onSubmit?: () => void;
  buttonText?: string;
  readOnly?: boolean;
}

function RolForm({
  nombre, setNombre,
  usuariosAsignados = 0,
  fechaCreacion = "-",
  onSubmit = () => {},
  buttonText = "Registrar rol",
  readOnly = false
}: Props) {

  const navigate = useNavigate();

  return (
    <div className="w-full px-10 py-6">
      <h1 className="text-4xl font-bold mb-2">{readOnly ? "Detalles del Rol" : buttonText}</h1>
      <h2 className="text-lg text-gray-700 mb-6">{readOnly ? "Información del rol registrado" : "Complete los campos para registrar un nuevo rol."}</h2>

      <div className="grid grid-cols-1 gap-4">
        <InputLabel
          label="Nombre del Rol *"
          htmlFor="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          readOnly={readOnly}
        />
      </div>

      {readOnly && (
        <div className="mt-4 space-y-2">
          <p><strong>Usuarios asignados:</strong> {usuariosAsignados}</p>
          <p><strong>Fecha de creación:</strong> {fechaCreacion}</p>
        </div>
      )}

      {!readOnly && (
        <div className="flex gap-4 mt-6">
          <Button variant="primary" size="md" onClick={() => navigate("/admin/roles")}>Volver</Button>
          <div className="ml-auto">
            <Button variant="primary" size="md" onClick={onSubmit}>{buttonText}</Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RolForm;
