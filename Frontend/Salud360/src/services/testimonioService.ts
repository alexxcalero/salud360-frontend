import { baseAPI } from "./baseAPI";

interface Autor {
  idCliente: number;
}

interface NuevoTestimonio {
  comentario: string;
  calificacion: number;
  idComunidad: number;
  autor: Autor;
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

