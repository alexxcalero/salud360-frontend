import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function LoginForm() {
  const [formData, setFormData] = useState({
    correo: "",
    contraseña: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Datos enviados:", formData)
    // Aquí puedes hacer una petición con Axios al backend
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        name="correo"
        type="email"
        placeholder="Correo electrónico"
        value={formData.correo}
        onChange={handleChange}
        required
      />
      <Input
        name="contraseña"
        type="password"
        placeholder="Contraseña"
        value={formData.contraseña}
        onChange={handleChange}
        required
      />
      <Button type="submit" className="w-full">
        Iniciar Sesión
      </Button>
    </form>
  )
}
