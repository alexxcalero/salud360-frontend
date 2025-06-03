import InputIconLabelEdit from "@/components/InputIconLabelEdit"
import SelectIconLabel from "@/components/SelectIconLabel"
import { Mail, Calendar, Shield } from "lucide-react"

interface Props {
  data: any
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}

function ReporteUsuarioForm({ data, onChange }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InputIconLabelEdit
        icon={<Mail className="w-5 h-5" />} htmlFor="correoUsuario"
        label="Correo del usuario"
        value={data.correoUsuario} onChange={onChange}
      />
      <InputIconLabelEdit
        icon={<Calendar className="w-5 h-5" />} htmlFor="fechaFin"
        type="date" label="Fecha fin"
        value={data.fechaFin} onChange={onChange}
      />
      <SelectIconLabel
        icon={<Shield className="w-5 h-5" />} htmlFor="idServicio"
        label="Servicio"
        value={data.idServicio} onChange={onChange}
        options={[{ value: "", label: "-- select one option --" }]}
      />
      <SelectIconLabel
        icon={<Shield className="w-5 h-5" />} htmlFor="idLocal"
        label="Local"
        value={data.idLocal} onChange={onChange}
        options={[{ value: "", label: "-- select one option --" }]}
      />
    </div>
  )
}

export default ReporteUsuarioForm