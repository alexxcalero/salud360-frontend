import { useState } from "react";

function useRol() {
  const [nombre, setNombre] = useState("");
  const [usuariosAsignados, setUsuariosAsignados] = useState<number>(0);
  const [fechaCreacion, setFechaCreacion] = useState("");

  return {
    nombre, setNombre,
    usuariosAsignados, setUsuariosAsignados,
    fechaCreacion, setFechaCreacion
  };
}

export default useRol;