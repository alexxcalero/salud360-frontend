import { baseAPI } from "./baseAPI";

export const enviarNotificacion = async (notificacion: any) => {
  return baseAPI.post("/notificaciones", notificacion, {
    auth: {
      username: "admin",
      password: "admin123"
    }
  });
};
