import { baseAPI } from "./baseAPI";
import { z } from "zod";
import { localSchema } from "@/schemas/local";

export const getAllLocalesAPI = async () => {
  const response = await baseAPI.get("/locales", {
    auth: {
      username: "admin",
      password: "admin123",
    },
  });
  const parsed = z.array(localSchema).parse(response.data);

  if (response.status !== 200) throw new Error("Respuesta inválida de la API");

  return parsed;
};
