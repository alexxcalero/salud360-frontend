import { createContext, useEffect, useState } from "react"

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({children}: any) => {
    const [usuario, setUsuario] = useState<any>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true); //En algunas paginas al hacer refresh recupera usuario dms pronto (cuando aún es null). Con esto lo controlamos

    useEffect(() => {
        const storedUser = localStorage.getItem("activeUser")
        const storedToken = localStorage.getItem("authToken")
        //console.log("***Stored user:", storedUser)
        //console.log("***Stored token:", storedToken)

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
        } finally{
            setLoading(false);
        }
    }, []);

    const login = (usuarioData: any, tokenData: string) => {
        setUsuario(usuarioData);
        setToken(tokenData);
        localStorage.setItem("activeUser", JSON.stringify(usuarioData));
        localStorage.setItem("authToken", tokenData);
    }

    //Para recuperar la imagen en caso se actualice:
    const actualizarUsuario = (nuevoUsuario: any) => {
        nuevoUsuario.idUsuario = usuario.idUsuario; // Mantiene el ID del usuario
        nuevoUsuario.idCliente = usuario.idCliente; // Mantiene el ID del cliente
        setUsuario(nuevoUsuario);
        localStorage.setItem("activeUser", JSON.stringify(nuevoUsuario));
    }
    
    const logout = () => {
        setUsuario(null);
        setToken(null);
        localStorage.removeItem("activeUser");
        localStorage.removeItem("authToken");
    }

    return(
        <AuthContext.Provider value={{ usuario, token, login, logout,actualizarUsuario, loading }}>
            {children}
        </AuthContext.Provider>
    )

}