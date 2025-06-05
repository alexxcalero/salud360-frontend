import { medicoSchema } from "@/schemas/medico";
import { baseAPI } from "./baseAPI";
import { z } from "zod";

export const getMedicos = async () => {
  const response = await baseAPI.get("/admin/medicos", {
    auth: {
      username: "admin",
      password: "admin123",
    },
  });
  const parsed = z.array(medicoSchema).parse(response.data);

  if (response.status !== 200) throw new Error("Respuesta inválida de la API");

  return parsed;
};
