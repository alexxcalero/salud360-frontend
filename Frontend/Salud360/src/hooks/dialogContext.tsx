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

interface DialogContext {
  callSuccessDialog: (_: ModalInterface) => void;
  callErrorDialog: (_: ModalInterface) => void;
  callAlertDialog: (_: ModalInterface) => void;
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
  const [dataAlert, setDataAlert] = useState<ModalInterface>({
    title: "",
    description: "",
  });

  const callSuccessDialog = useCallback((d: ModalInterface) => {
    setDataSuccess(d);
    setOpenSuccess(true);
  }, []);
  const callErrorDialog = useCallback((d: ModalInterface) => {
    setDataError(d);
    setOpenError(true);
  }, []);
  const callAlertDialog = useCallback((d: ModalInterface) => {
    setDataAlert(d);
    setOpenAlert(true);
  }, []);

  return (
    <dialogContext.Provider
      value={{ callSuccessDialog, callErrorDialog, callAlertDialog }}
    >
      {children}
      <SuccessModal
        open={openSuccess}
        setOpen={setOpenSuccess}
        {...dataSuccess}
      />
      <ErrorModal open={openError} setOpen={setOpenError} {...dataError} />
      <AlertModal open={openAlert} setOpen={setOpenAlert} {...dataAlert} />
    </dialogContext.Provider>
  );
}
