import { Input as ShadInput } from "@/components/ui/input"
import { useState, useEffect, useRef } from "react"

interface Props {
  type?: string
  placeholder?: string
  leftPadding?: string
  value?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  name?: string
  id?: string
}

function InputEdit({
  type = "text",
  placeholder = "",
  leftPadding = "",
  value = "",
  onChange = () => {},
  name = "",
  id = ""
}: Props) {
  const [inputType, setInputType] = useState(type)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Detecta cambios cuando es tipo contraseña
  useEffect(() => {
    if (type === "password" && value && value.length > 0) {
      // Mostrar como texto temporalmente
      setInputType("text")

      if (timeoutRef.current) clearTimeout(timeoutRef.current)

      timeoutRef.current = setTimeout(() => {
        setInputType("password")
      }, 1000) // Oculta después de 1 segundo
    }
  }, [value, type])

  return (
    <ShadInput
      id={id}
      name={name}
      type={inputType}
      placeholder={placeholder}
      className={`border-[#6A6262] border-2 rounded-[5px] py-5 px-4 ${leftPadding}`}
      value={value}
      onChange={onChange}
    />
  )
}

export default InputEdit
