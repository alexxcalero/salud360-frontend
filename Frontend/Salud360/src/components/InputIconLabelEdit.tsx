import Label from "./Label"
import InputIconEdit from "./InputIconEdit"

interface Props {
  icon: React.ReactNode
  type?: string
  placeholder?: string
  htmlFor: string
  label: React.ReactNode
  value?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

function InputIconLabelEdit({
  icon,
  type = "text",
  placeholder = "",
  htmlFor,
  label,
  value,
  onChange
}: Props) {
  return (
    <div>
      <Label htmlFor={htmlFor}>{label}</Label>
      <InputIconEdit
        icon={icon}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={htmlFor}
        id={htmlFor}
      />
    </div>
  )
}

export default InputIconLabelEdit