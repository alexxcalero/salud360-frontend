import Spinner from "@/components/Spinner";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useRef,
} from "react";

interface Context {
  isLoading: () => boolean;
  setLoading: (_: boolean) => void;
}

const loadingContext = createContext<Context | undefined>(undefined);

export function useLoading() {
  const context = useContext(loadingContext);
  if (!context) throw new Error("Se requiere el LoadingProvider");
  return context;
}

export function LoadingContext({ children }: { children: ReactNode }) {
  const loadingNodeRef = useRef<HTMLDivElement>(null);

  const setLoading = useCallback((show: boolean) => {
    if (!loadingNodeRef.current) return;

    if (show) loadingNodeRef.current.style.display = "flex";
    else loadingNodeRef.current.style.display = "none";
  }, []);

  const isLoading = useCallback(
    () => Boolean(loadingNodeRef.current?.classList.contains("flex")),
    []
  );

  return (
    <loadingContext.Provider value={{ isLoading, setLoading }}>
      <div
        ref={loadingNodeRef}
        className={
          "fixed top-0 left-0 right-0 bottom-0 backdrop-blur-md justify-center items-center z-5000 bg-white/70 hidden"
        }
      >
        <Spinner />
      </div>
      {children}
    </loadingContext.Provider>
  );
}
