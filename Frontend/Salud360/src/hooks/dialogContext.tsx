import AlertModal from "@/components/modals/alertModal";
import ErrorModal from "@/components/modals/errorModal";
import InfoModal from "@/components/modals/infoModal";
import SuccessModal from "@/components/modals/successModal";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

// ======================================
// Valores esperados para cada modal/dialogo
// ======================================
interface ModalInterface {
  title?: string;
  description?: string;
}

interface AlertModalInterface extends ModalInterface {
  onConfirm?: () => Promise<any>;
  buttonLabel?: string;
}

// ======================================
// Valores esperados en el context
// ======================================
interface DialogContext {
  callSuccessDialog: (_: ModalInterface) => void;
  callErrorDialog: (_: ModalInterface) => void;
  callAlertDialog: (_: AlertModalInterface) => void;
  callInfoDialog: (_: AlertModalInterface) => void;
}

// ======================================
// Temas de manejo de contextos
// ======================================
const dialogContext = createContext<DialogContext | undefined>(undefined);

export function useDialog() {
  const context = useContext(dialogContext);
  if (!context) throw new Error("Falta el DialogProvider");

  return context;
}

export function DialogProvider({ children }: { children: ReactNode }) {
  // ======================================
  // States para mostrar modales
  // ======================================
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);

  // ======================================
  // States para manejar los datos de cada modal
  // ======================================
  const [dataSuccess, setDataSuccess] = useState<ModalInterface>({
    title: "",
    description: "",
  });
  const [dataError, setDataError] = useState<ModalInterface>({
    title: "",
    description: "",
  });
  const [dataAlert, setDataAlert] = useState<AlertModalInterface>({
    title: "",
    description: "",
    onConfirm: undefined,
  });
  const [dataInfo, setDataInfo] = useState<AlertModalInterface>({
    title: "",
    description: "",
    onConfirm: undefined,
  });

  // ======================================
  // Funciones para llamar modales/dialogos
  // ======================================
  const callSuccessDialog = useCallback((d: ModalInterface) => {
    setDataSuccess(d);
    setOpenSuccess(true);
  }, []);
  const callErrorDialog = useCallback((d: ModalInterface) => {
    setDataError(d);
    setOpenError(true);
  }, []);
  const callAlertDialog = useCallback((d: AlertModalInterface) => {
    setDataAlert(d);
    setOpenAlert(true);
  }, []);
  const callInfoDialog = useCallback((d: AlertModalInterface) => {
    setDataInfo(d);
    setOpenInfo(true);
  }, []);

  return (
    <dialogContext.Provider
      value={{
        callSuccessDialog,
        callErrorDialog,
        callAlertDialog,
        callInfoDialog,
      }}
    >
      {children}
      <div className="fixed z-4900">
        <SuccessModal
          open={openSuccess}
          setOpen={setOpenSuccess}
          {...dataSuccess}
        />
        <ErrorModal open={openError} setOpen={setOpenError} {...dataError} />
        <AlertModal open={openAlert} setOpen={setOpenAlert} {...dataAlert} />
        <InfoModal open={openInfo} setOpen={setOpenInfo} {...dataInfo} />
      </div>
    </dialogContext.Provider>
  );
}
