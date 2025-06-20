import { useLoading } from "@/hooks/LoadingContext";
import { useToasts } from "@/hooks/ToastContext";
import axios from "axios";
import { useCallback } from "react";

export function useFetchHandler() {
  const { setLoading } = useLoading();
  const { createToast } = useToasts();

  return {
    fetch: useCallback(
      async (func: () => Promise<any>) => {
        setLoading(true);
        let noErrorFlag = true;
        try {
          await func();
        } catch (error) {
          console.error(error);
          if (axios.isAxiosError(error)) {
            // Error generado por Axios
            if (error.response) {
              // El servidor respondió con un código fuera del rango 2xx
              createToast("error", {
                title: `${error.response.data.status} ${error.response.data.error}`,
                description: `${error.response.data.message ?? error.message}`,
              });
            } else if (error.request) {
              // No hubo respuesta del servidor
              createToast("error", {
                title: `${error.status} Error`,
                description: `${error.message}`,
              });
            } else {
              // Otro error durante la configuración de la solicitud
              createToast("error", {
                title: "Error en la solicitud",
                description: error.message,
              });
            }
          } else if (error instanceof Error) {
            createToast("error", {
              title: "Error",
              description: error.message,
            });
          } else {
            createToast("error", {
              title: "Error",
              description: "Error desconocido",
            });
          }
          noErrorFlag = false;
        } finally {
          setLoading(false);
          return noErrorFlag;
        }
      },
      [setLoading, createToast]
    ),
  };
}
