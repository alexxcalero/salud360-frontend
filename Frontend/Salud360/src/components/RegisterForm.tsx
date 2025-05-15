// src/components/RegisterForm.tsx
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    tipoDocumento: "",
    numeroDocumento: "",
    fechaNacimiento: "",
    lugarResidencia: "",
    correo: "",
    confirmarCorreo: "",
    contraseña: "",
    confirmarContraseña: "",
    telefono: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Formulario enviado:", formData)
    //Conxeion al back 
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input placeholder="Nombres" name="nombres" value={formData.nombres} onChange={handleChange} required />
        <Input placeholder="Apellidos" name="apellidos" value={formData.apellidos} onChange={handleChange} required />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select name="tipoDocumento" value={formData.tipoDocumento} onChange={handleChange} className="border p-2 rounded-md" required>
          <option value="">Tipo de documento</option>
          <option value="DNI">DNI</option>
          <option value="CE">Carné de extranjería</option>
        </select>
        <Input placeholder="Número de documento" name="numeroDocumento" value={formData.numeroDocumento} onChange={handleChange} required />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input type="date" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} required />
        <Input placeholder="Lugar de residencia" name="lugarResidencia" value={formData.lugarResidencia} onChange={handleChange} required />
      </div>

      <Input placeholder="Correo electrónico" name="correo" type="email" value={formData.correo} onChange={handleChange} required />
      <Input placeholder="Confirmar correo electrónico" name="confirmarCorreo" type="email" value={formData.confirmarCorreo} onChange={handleChange} required />

      <Input placeholder="Contraseña" name="contraseña" type="password" value={formData.contraseña} onChange={handleChange} required />
      <Input placeholder="Confirmar contraseña" name="confirmarContraseña" type="password" value={formData.confirmarContraseña} onChange={handleChange} required />

      <Input placeholder="Teléfono" name="telefono" value={formData.telefono} onChange={handleChange} required />

      <Button type="submit" className="w-full mt-4">Registrarse</Button>
    </form>
  )
}
