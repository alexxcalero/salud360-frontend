import Label from "./Label"
import { ReactNode } from "react"

interface Props {
  icon: ReactNode
  htmlFor: string
  label: string
  //rb numeber -> string
  value: number
  required?: boolean
  onChange: React.ChangeEventHandler<HTMLSelectElement>
  options: { value: number; content: string }[]
}

function SelectIconLabelNum({ icon, htmlFor, label, value, required, onChange, options }: Props) {
  return (
    <div>
      <Label htmlFor={htmlFor} required={required}>{label}</Label>
      <div className="relative flex items-center">
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          {icon}
        </div>

        <select
          id={htmlFor}
          name={htmlFor}
          value={value}
          onChange={onChange}
          className="w-full pl-9 pr-4 py-2 border-[#6A6262] border-2 rounded-[5px] px-4"
        >
          <option value="" disabled hidden>
            Escoge una opción
          </option>

          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.content}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default SelectIconLabelNum
