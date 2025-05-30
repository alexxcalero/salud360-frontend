import { errorToast, successToast, ToastProps } from "@/components/Toast";
import { Toaster } from "@/components/ui/sonner";
import { createContext, ReactNode, useCallback, useContext } from "react";

interface Context {
  createToast: (state: "success" | "error", props: ToastProps) => void;
}

const toastContext = createContext<Context | undefined>(undefined);

export function useToasts() {
  const context = useContext(toastContext);
  if (!context) throw new Error("Se requiere el ToastProvider");
  return context;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const createToast = useCallback(
    (state: "success" | "error", props: ToastProps) => {
      switch (state) {
        case "error":
          errorToast(props);
          break;
        case "success":
          successToast(props);
          break;
      }
    },
    []
  );
  return (
    <toastContext.Provider value={{ createToast }}>
      {children}
      <div className="fixed">
        <Toaster />
      </div>
    </toastContext.Provider>
  );
}
