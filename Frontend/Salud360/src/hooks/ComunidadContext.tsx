import { createContext, useContext, useState } from "react";

export const ComunidadContext = createContext<any>(null);

export const ComunidadProvider = ({ children }: any) => {
  const [comunidad, setComunidad] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <ComunidadContext.Provider value={{ comunidad, setComunidad, loading, setLoading }}>
      {children}
    </ComunidadContext.Provider>
  );
};

export const useComunidad = () => useContext(ComunidadContext);
