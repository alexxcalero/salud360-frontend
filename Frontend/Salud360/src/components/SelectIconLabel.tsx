import Label from "./Label"
import { ReactNode } from "react"

interface Props {
  icon: ReactNode
  htmlFor: string
  label: string
  value: string
  onChange: React.ChangeEventHandler<HTMLSelectElement>
  options: { value: string; label: string }[]
}

function SelectIconLabel({ icon, htmlFor, label, value, onChange, options }: Props) {
  return (
    <div>
      <Label htmlFor={htmlFor}>{label}</Label>
      <div className="relative flex items-center">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
          {icon}
        </div>
        <select
          id={htmlFor}
          name={htmlFor}
          value={value}
          onChange={onChange}
          className="w-full pl-10 pr-4 py-2 border-[#6A6262] border-2 rounded-[5px] py-2.45 px-4"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default SelectIconLabel

