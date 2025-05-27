import { createContext, useEffect, useState } from "react"

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({children}: any) => {
    const [usuario, setUsuario] = useState<any>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("activeUser")
        const storedToken = localStorage.getItem("authToken")
        console.log("***Stored user:", storedUser)
        console.log("***Stored token:", storedToken)

        try {
            if (storedUser && storedToken) {
            setUsuario(JSON.parse(storedUser));
            setToken(storedToken);
            }
        } catch (error) {
            alert("AuthContext error")
            console.error("Error al parsear usuario:", error);
            localStorage.removeItem("activeUser"); // limpia lo dañado
            localStorage.removeItem("authToken");
        }
    }, []);

    const login = (usuarioData: any, tokenData: string) => {
        setUsuario(usuarioData);
        setToken(tokenData);
        localStorage.setItem("activeUser", JSON.stringify(usuarioData));
        localStorage.setItem("authToken", tokenData);
    }

    const logout = () => {
        setUsuario(null);
        setToken(null);
        localStorage.removeItem("activeUser");
        localStorage.removeItem("authToken");
    }

    return(
        <AuthContext.Provider value={{ usuario, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )

}