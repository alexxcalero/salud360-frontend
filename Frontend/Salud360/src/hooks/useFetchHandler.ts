import { useLoading } from "@/hooks/LoadingContext";
import { useToasts } from "@/hooks/ToastContext";
import axios from "axios";
import { useCallback } from "react";

export function useFetchHandler() {
  const { setLoading } = useLoading();
  const { createToast } = useToasts();

  return {
    fetch: useCallback(async (func: () => Promise<void>) => {
      setLoading(true);
      try {
        func();
      } catch (error) {
        if (error instanceof Error) {
          createToast("error", { title: "Error", description: error.message });
        }
        if (axios.isAxiosError(error)) {
          // Error generado por Axios
          if (error.response) {
            // El servidor respondió con un código fuera del rango 2xx
            createToast("error", {
              title: `${error.response.status} ${error.message}`,
              description: error.response.data,
            });
          } else if (error.request) {
            // No hubo respuesta del servidor
            createToast("error", {
              title: "No hubo respuesta del servidor",
              description: error.request,
            });
          } else {
            // Otro error durante la configuración de la solicitud
            createToast("error", {
              title: "Error en la solicitud",
              description: error.message,
            });
          }
        }
      } finally {
        setLoading(false);
      }
    }, []),
  };
}
