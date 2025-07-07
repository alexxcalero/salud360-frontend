import { IComunidad } from "@/models/comunidad";
import { baseAPI } from "./baseAPI";

interface Cliente {
  idCliente: number;
}

export interface NuevoTestimonio {
  idTestimonio?: number;
  comentario: string;
  calificacion: number;
  idComunidad?: number;
  comunidad?: IComunidad;
  cliente: Cliente;
}

export const crearTestimonio = async (testimonio: NuevoTestimonio) => {
  const res = await baseAPI.post("/testimonios", testimonio, {
    auth: {
      username: "admin",
      password: "admin123",
    },
  });

  if (res.status !== 200 && res.status !== 201) {
    throw new Error("No se pudo registrar el testimonio");
  }

  return res.data;
};

export const editarTestimonio = async (
  idTestimonio: number,
  testimonio: NuevoTestimonio
) => {
  const res = await baseAPI.put(`/testimonios/${idTestimonio}`, testimonio, {
    auth: {
      username: "admin",
      password: "admin123",
    },
  });

  if (res.status !== 200) {
    throw new Error("No se pudo editar el testimonio");
  }

  return res.data;
};

export const eliminarTestimonio = async (idTestimonio: number) => {
  const res = await baseAPI.delete(`/testimonios/${idTestimonio}`, {
    auth: {
      username: "admin",
      password: "admin123",
    },
  });

  if (res.status !== 200) {
    throw new Error("No se pudo eliminar el testimonio");
  }

  return res.data;
};



