import { useState } from "react";

function useComunidadForm() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [proposito, setProposito] = useState("");
  const [servicios, setServicios] = useState<number[]>([]);
  const [membresias, setMembresias] = useState<number[]>([]);
  const [locales, setLocales] = useState<number[]>([]);
  const [imagen, setImagen] = useState<File | null>(null); // nuevo

  return {
    nombre, setNombre,
    descripcion, setDescripcion,
    proposito, setProposito,
    servicios, setServicios,
    membresias, setMembresias,
    locales, setLocales,
    imagen, setImagen
  };
}

export default useComunidadForm;