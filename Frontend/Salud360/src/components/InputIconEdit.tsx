import InputEdit from "./InputEdit"

interface Props {
  icon: React.ReactNode
  type?: string
  placeholder?: string
  value?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  name?: string
  id?: string
}

function InputIconEdit({
  icon,
  type = "text",
  placeholder = "",
  value,
  onChange,
  name = "",
  id = ""
}: Props) {
  return (
    <div className="relative w-full">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
        {icon}
      </span>
      <InputEdit
        type={type}
        placeholder={placeholder}
        leftPadding="pl-10"
        value={value}
        onChange={onChange}
        name={name}
        id={id}
      />
    </div>
  )
}

export default InputIconEdit
