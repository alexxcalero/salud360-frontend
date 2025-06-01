import Spinner from "@/components/Spinner";
import { createContext, ReactNode, useContext, useState } from "react";

interface Context {
  loading: boolean;
  setLoading: (_: boolean) => void;
}

const loadingContext = createContext<Context | undefined>(undefined);

export function useLoading() {
  const context = useContext(loadingContext);
  if (!context) throw new Error("Se requiere el LoadingProvider");
  return context;
}

export function LoadingContext({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false);

  return (
    <loadingContext.Provider value={{ loading, setLoading }}>
      {loading && (
        <div className="fixed top-0 left-0 right-0 bottom-0 backdrop-blur-md flex justify-center items-center z-50">
          <Spinner />
        </div>
      )}
      {children}
    </loadingContext.Provider>
  );
}
