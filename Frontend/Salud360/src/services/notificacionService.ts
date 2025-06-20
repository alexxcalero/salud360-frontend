import axios from "axios";

export const enviarNotificacion = async (notificacion: any) => {
  return axios.post("http://localhost:8080/api/notificaciones", notificacion, {
    auth: {
      username: "admin",
      password: "admin123"
    }
  });
};
