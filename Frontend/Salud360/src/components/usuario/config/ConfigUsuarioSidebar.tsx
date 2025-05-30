import { NavLink } from "react-router";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import {
  CreditCard,
  LogOut,
  Settings,
  UserRoundPen,
  History,
} from "lucide-react";

import colors from "tailwindcss/colors";
import { AuthContext } from "@/hooks/AuthContext";

const ConfigUsuarioSideBar = () => {
  const navigate = useNavigate();
  const [showModalLogout, setShowModalLogout] = useState(false);
  const { logout } = useContext(AuthContext);

  const paths = [
    ["/", "Mi perfil", UserRoundPen],
    ["sistema", "Sistema", Settings],
    ["membresias", "Membresías", CreditCard],
    ["historial-pagos", "Historial de pago", History],
    ["logout", "Cerrar sesión", LogOut],
  ];
  return (
    <>
      <nav className="max-w-[300px] w-max h-full bg-white shadow-md p-[30px]">
        <ul className="flex flex-col gap-[10px] min-h-[100dvh] items-start">
          {paths.map(([path, label, Icon]: any, index) => (
            <li key={index}>
              {path === "logout" ? (
                <button
                  className="flex items-center gap-2 text-neutral-900 hover:text-red-600"
                  onClick={() => setShowModalLogout(true)}
                >
                  <Icon className="inline" />
                  <span className="text-neutral-600 font-semibold">Cerrar Sesión</span>
                </button>
              ) : (
                <NavLink to={`/usuario/configuracion/${path}`}>
                  {({ isActive }) =>
                    isActive ? (
                      <>
                        <Icon color={colors.blue["500"]} className="inline" />
                        {" "}
                        <span className="text-blue-500">{label}</span>
                      </>
                    ) : (
                      <>
                        <Icon color={colors.neutral["900"]} className="inline" />
                        {" "}
                        <span className="text-neutral-900">{label}</span>
                      </>
                    )
                  }
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Modal de confirmación */}
      {showModalLogout && (
        <>
          <div className="fixed inset-0 bg-black/60 z-40" />
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-md max-w-md w-full text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-yellow-300 rounded-full w-16 h-16 flex items-center justify-center">
                  <span className="text-white text-3xl font-bold">!</span>
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-2">¿Deseas cerrar sesión?</h2>
              <p className="mb-6">Serás redirigido a la pantalla de inicio</p>
              <div className="flex justify-center gap-4">
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
                  onClick={() => setShowModalLogout(false)}
                >
                  Cancelar
                </button>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
                  onClick={() => {
                    logout();  
                    setShowModalLogout(false);
                    navigate("/"); // Redirige al landing
                  }}
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};


export default ConfigUsuarioSideBar;
