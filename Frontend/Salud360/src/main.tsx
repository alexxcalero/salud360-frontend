import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "@/index.css";

// La manera de utilizar esto es importando los componentes que sean páginas y las referencian en el elemento de abajo
import App from "@/App.tsx";
import Example from "@/pages/Example";
import RegistrarComunidad from "./pages/RegistrarComunidad";
import Test from "@/pages/admin/test";
import AdminLayout from "@/layouts/AdminLayout";
import UsuariosPage from "./pages/admin/usuarios/UsuariosPage";
import CrearUsuario from "./pages/admin/usuarios/CrearUsuario";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* // A este nivel tienen que insertar nuevas rutas. Especificando la ruta "/usuarios/register" y el elemento que será la página */}
        <Route path="/" element={<App />} />
        <Route path="/example" element={<Example />} />
        <Route path="/RegistrarComunidad" element={<RegistrarComunidad />} />
        <Route path="/admin" element={<AdminLayout active={2} />}>
          {/* Ejemplo de ruta anidada con un layout */}
          <Route path="example" element={<Test />} />
          <Route path="usuariosPage" element={<UsuariosPage />} />
          <Route path="crearUsuario" element={<CrearUsuario />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
