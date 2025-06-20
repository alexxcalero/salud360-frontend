import { DateTime } from "luxon";
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
  selectedData?: any;
  selectedDateTime?: DateTime;
  setSelectedData: (_: unknown | undefined) => void;
  setSelectedDateTime: (_: DateTime | undefined) => void;
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
  const [selectedData, setSelectedData] = useState<any>();
  const [selectedDateTime, setSelectedDateTime] = useState<DateTime>();
  const reload = useCallback(() => {
    setReloadState((prev) => !prev);
  }, []);
  return (
    <internalModalsContext.Provider
      value={{
        activeModal,
        setActiveModal,
        reload,
        reloadState,
        selectedData,
        selectedDateTime,
        setSelectedData,
        setSelectedDateTime,
      }}
    >
      {children}
    </internalModalsContext.Provider>
  );
}
