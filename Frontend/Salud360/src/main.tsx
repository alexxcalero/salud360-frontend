import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "@/index.css";

// La manera de utilizar esto es importando los componentes que sean páginas y las referencian en el elemento de abajo
import App from "@/App.tsx";
import Example from "@/pages/Example";
import ComunidadPage from "./pages/admin/comunidad/ComunidadPage";
import Test from "@/pages/admin/test";
import AdminLayout from "@/layouts/AdminLayout";
import UsuariosPage from "./pages/admin/usuarios/UsuariosPage";
import CrearUsuario from "./pages/admin/usuarios/CrearUsuario";
import ServiciosPage from "./pages/admin/servicios/ServiciosPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* // A este nivel tienen que insertar nuevas rutas. Especificando la ruta "/usuarios/register" y el elemento que será la página */}
        <Route path="/" element={<App />} />
        <Route path="/example" element={<Example />} />
        <Route path="/admin" element={<AdminLayout active={2} />}> {/* ESTO ES PARA LA PANTALLAS DE ROLES Y PERMISOS*/} 
          {/* Ejemplo de ruta anidada con un layout */}
          <Route path="example" element={<Test />} />
          <Route path="usuariosPage" element={<UsuariosPage />} />
          <Route path="crearUsuario" element={<CrearUsuario />} />
        </Route>
        <Route path="/admin" element={<AdminLayout active={4} />}> {/* ESTO ES PARA LA PANTALLAS DE COMUNIDAD*/} 
          <Route path="comunidadPage" element={<ComunidadPage />} />
        </Route>
        <Route path="/admin" element={<AdminLayout active={5} />}> {/* ESTO ES PARA LA PANTALLAS DE SERVICIOS*/} 
          <Route path="serviciosPage" element={<ServiciosPage />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
