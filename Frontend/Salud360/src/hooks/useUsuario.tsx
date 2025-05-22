import { IUsuario } from "@/models/usuario";
import { createContext, useContext, useState } from "react";

interface UsuarioContext {
  datos: IUsuario;
  newNotifications: boolean;
  setNewNotifications: (value: boolean) => void;
}

const usuarioContext = createContext<UsuarioContext | undefined>(undefined);
export function useUsuario() {
  const context = useContext(usuarioContext);
  if (!context)
    throw new Error("useUsuario debe ser usado dentro de un UsuarioProvider");

  return context;
}

export function UsuarioProvider({ children }: { children: React.ReactNode }) {
  const [newNotifications, setNewNotifications] = useState(true);
  return (
    <usuarioContext.Provider
      value={{
        datos: {
          nombres: "Jhon",
          apellidos: "Doe",
          correo: "jhon.Doe@gmail.com",
          telefono: "944 888 777",
          fechaNacimiento: "",
          sexo: "Masculino",
          fotoPerfil:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcZwpLhxc-tDfENv02giQ5iKKZ3WWt9uyvKg&s",
          numeroDocumento: "",
          // TipoDocumento: "",
          notiCorreo: false,
          notiSMS: false,
          notiWhatsapp: true,
          activo: false,
          fechaCreacion: "2024-24-07",
          fechaDesactivacion: "",
        },
        newNotifications,
        setNewNotifications,
      }}
    >
      {children}
    </usuarioContext.Provider>
  );
}
