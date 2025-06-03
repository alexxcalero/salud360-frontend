import InputIconLabelEdit from "@/components/InputIconLabelEdit"
import SelectIconLabel from "@/components/SelectIconLabel"
import { Calendar, MapPin } from "lucide-react"

interface Props {
  data: any
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}

function ReporteServicioForm({ data, onChange }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <InputIconLabelEdit
        icon={<Calendar className="w-5 h-5" />} htmlFor="fechaInicio"
        type="date" label="Fecha inicio"
        value={data.fechaInicio} onChange={onChange}
      />
      <InputIconLabelEdit
        icon={<Calendar className="w-5 h-5" />} htmlFor="fechaFin"
        type="date" label="Fecha fin"
        value={data.fechaFin} onChange={onChange}
      />
      <SelectIconLabel
        icon={<MapPin className="w-5 h-5" />} htmlFor="idLocal"
        label="Locales"
        value={data.idLocal} onChange={onChange}
        options={[{ value: "", label: "-- select one option --" }]}
      />
    </div>
  )
}

export default ReporteServicioForm