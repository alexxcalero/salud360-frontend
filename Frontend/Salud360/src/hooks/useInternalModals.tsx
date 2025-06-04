import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

interface InternalModals {
  activeModal?: string;
  setActiveModal?: (_: string) => void;
  reload: () => void;
  reloadState: boolean;
}

const internalModalsContext = createContext<InternalModals | undefined>(
  undefined
);

export const useInternalModals = () => {
  const context = useContext(internalModalsContext);
  if (!context) throw new Error("Falta el contexto de useInternals");
  return context;
};

export function InternalModalsProvider({ children }: { children: ReactNode }) {
  const [activeModal, setActiveModal] = useState<string>();
  const [reloadState, setReloadState] = useState(false);
  const reload = useCallback(() => {
    setReloadState((prev) => !prev);
  }, []);
  return (
    <internalModalsContext.Provider
      value={{ activeModal, setActiveModal, reload, reloadState }}
    >
      {children}
    </internalModalsContext.Provider>
  );
}
