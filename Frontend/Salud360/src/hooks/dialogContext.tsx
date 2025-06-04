import AlertModal from "@/components/modals/alertModal";
import ErrorModal from "@/components/modals/errorModal";
import SuccessModal from "@/components/modals/successModal";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

interface ModalInterface {
  title?: string;
  description?: string;
}

interface AlertModalInterface extends ModalInterface {
  onConfirm?: () => Promise<boolean>;
  buttonLabel?: string;
}

interface DialogContext {
  callSuccessDialog: (_: ModalInterface) => void;
  callErrorDialog: (_: ModalInterface) => void;
  callAlertDialog: (_: AlertModalInterface) => void;
}

const dialogContext = createContext<DialogContext | undefined>(undefined);

export function useDialog() {
  const context = useContext(dialogContext);
  if (!context) throw new Error("Falta el DialogProvider");

  return context;
}

export function DialogProvider({ children }: { children: ReactNode }) {
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

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

  return (
    <dialogContext.Provider
      value={{ callSuccessDialog, callErrorDialog, callAlertDialog }}
    >
      {children}
      <div className="fixed z-[900]">
        <SuccessModal
          open={openSuccess}
          setOpen={setOpenSuccess}
          {...dataSuccess}
        />
        <ErrorModal open={openError} setOpen={setOpenError} {...dataError} />
        <AlertModal open={openAlert} setOpen={setOpenAlert} {...dataAlert} />
      </div>
    </dialogContext.Provider>
  );
}
