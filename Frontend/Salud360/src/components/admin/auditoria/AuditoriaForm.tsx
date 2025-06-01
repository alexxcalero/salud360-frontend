import Button from "@/components/Button";
import { useNavigate } from "react-router";
import Input from "@/components/input/Input";
import { type DataAuditoria } from "@/models/auditoria";

interface Props {
  initialData: DataAuditoria;
  title?: string;
  subtitle?: string;
}

function AuditoriaForm({ initialData, title = "", subtitle = "" }: Props) {
  const navigate = useNavigate();

  return (
    <div className="w-full px-10 py-6">
      <form action="">
        <h1 className="text-4xl font-bold mb-2">{title}</h1>
        <h2 className="text-lg text-gray-700 mb-6">{subtitle}</h2>

        <div className="grid grid-cols-1 gap-4">
          <Input
            label="Id de la auditoría"
            name="id-auditoria"
            required={false}
            disabled={true}
            defaultValue={initialData.idAuditoria.toString()}
          />
          <Input
            label="Nombre de tabla"
            name="nombre-tabla"
            required={false}
            disabled={true}
            defaultValue={initialData.nombreTabla}
          />
          <Input
            label="Descripcion"
            name="descripcion"
            required={false}
            disabled={true}
            defaultValue={initialData.descripcion}
          />
          <Input
            label="Fecha de modificación"
            name="fecha-modificacion"
            required={false}
            disabled={true}
            defaultValue={initialData.fechaModificacion}
          />
          <Input
            label="Id del usuario modificador"
            name="id-usuario-modificador"
            required={false}
            disabled={true}
            defaultValue={initialData.idUsuarioModificador.toString()}
          />
        </div>
        <div>
          <div className="flex gap-4 mt-6 justify-end">
            <Button
              variant="outline"
              size="md"
              onClick={() => navigate("/admin/auditorias")}
            >
              Volver
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AuditoriaForm;
