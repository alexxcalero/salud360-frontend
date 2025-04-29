import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "@/index.css";

// La manera de utilizar esto es importando los componentes que sean páginas y las referencian en el elemento de abajo
import App from "@/App.tsx";
import Example from "@/pages/Example";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* // A este nivel tienen que insertar nuevas rutas. Especificando la ruta "/usuarios/register" y el elemento que será la página */}
        <Route path="/" element={<App />} />
        <Route path="/example" element={<Example />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
