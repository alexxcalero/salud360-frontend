import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "@/index.css";

// La manera de utilizar esto es importando los componentes que sean páginas y las referencian en el elemento de abajo
//import App from "@/App.tsx";
import Example from "@/pages/Example";
import ComunidadPage from "./pages/admin/comunidad/ComunidadPage";
import Test from "@/pages/admin/test";
import AdminLayout from "@/layouts/AdminLayout";
//USUARIOS
import UsuariosPage from "./pages/admin/usuarios/UsuariosPage";
import CrearUsuario from "./pages/admin/usuarios/CrearUsuario";
//COMUNIDADES
import CrearComunidad from "./pages/admin/comunidad/CrearComunidad"
import EditarComunidad from "./pages/admin/comunidad/EditarComunidad"
import DetalleComunidad from "./pages/admin/comunidad/DetalleComunidad"
//SERVICIOS
import ServiciosPage from "./pages/admin/servicios/ServiciosPage";
import DashboardPage from "./pages/admin/dashboard/DashboardPage";
import RolesPage from "./pages/admin/roles/RolesPage";
import MembresiasPage from "./pages/admin/membresias/MembresiasPage";
import LocalesPage from "./pages/admin/locales/LocalesPage";
import PersonalMedicoPage from "./pages/admin/personalMedico/PersonalMedicoPage";
import CalificacionesPage from "./pages/admin/calificaciones/CalificacionesPage";
import LogsPage from "./pages/admin/logs/LogsPage";
import AuditoriasPage from "./pages/admin/auditoria/AuditoriasPage";
import ReportesPage from "./pages/admin/reportes/ReportesPage";
import ConfiguracionGeneralPage from "./pages/admin/configuracionGeneral/ConfiguracionGeneralPage";
import DetalleUsuario from "./pages/admin/usuarios/DetalleUsuario";
import EditarUsuario from "./pages/admin/usuarios/EditarUsuario";
import LandingLayout from "./layouts/LandingLayout";
import UsuarioLayout from "./layouts/UsuarioLayout";
import Home from "./pages/landing/Home";
import Inicio from "./pages/usuario/Inicio";
import CrearMedico from "./pages/admin/personalMedico/CrearMedico";
import App from "./App";
import SobreNosotros from "./pages/landing/SobreNosotros";
import Comunidades from "./pages/landing/Comunidades";
import DetalleComunidadLanding from "./pages/landing/DetalleComunidad";
import EditarConfiguracionGeneralPage from "./pages/admin/configuracionGeneral/EditarConfiguracionGeneralPage";
import EditarMedico from "./pages/admin/personalMedico/EditarMedico";
import DetalleMedico from "./pages/admin/personalMedico/DetalleMedico";

createRoot(document.getElementById("root")!).render(

  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* // A este nivel tienen que insertar nuevas rutas. Especificando la ruta "/usuarios/register" y el elemento que será la página */}


        {/*1. Sección del Landing Page */}
        <Route path="/" element={<LandingLayout />}>
          <Route index element={<Home/>}/>
          <Route path="comunidades">
            <Route index element={<Comunidades/>}/>
            <Route path="detalle/:id" element={<DetalleComunidadLanding/>}/>
          </Route>
          <Route path="sobreNosotros" element={<SobreNosotros />} />
        </Route>

        

        {/*2. Sección de Usuario */}
        <Route path="/usuario" element={<UsuarioLayout />}>
          <Route index element={<Inicio/>}/>
        </Route>




        {/*3. Sección de Admin */}
        <Route path="/admin" element={<AdminLayout/>}> {/* ESTO ES PARA LA PANTALLAS DE ROLES Y PERMISOS*/} 
          {/* Ejemplo de ruta anidada con un layout */}
          <Route path="example" element={<Test />} />

          <Route path="dashboard">
            <Route index element={<DashboardPage />} />
          </Route>

          <Route path="configuracion">
              <Route index element={<ConfiguracionGeneralPage />} />
              <Route path="editar" element={<EditarConfiguracionGeneralPage />} />
            </Route>

          <Route path="roles">
            <Route index element={<RolesPage />} />
            <Route path="crear" element={<CrearUsuario />} />
          </Route>

          <Route path="membresias">
            <Route index element={<MembresiasPage />} />
            <Route path="crear" element={<CrearUsuario />} />
            <Route path="detalle/:id" element={<DetalleComunidadLanding />} />
            <Route path="editar/:id" element={<EditarComunidad />} />
          </Route>

          <Route path="comunidades">
            <Route index element={<ComunidadPage />} />
            <Route path="crear" element={<CrearComunidad />} />
            <Route path="editar/:id" element={<EditarComunidad />} />
            <Route path="detalle/:id" element={<DetalleComunidad />} />
          </Route>

          <Route path="servicios">
            <Route index element={<ServiciosPage />} />
            <Route path="crear" element={<CrearUsuario />} />
          </Route>

          <Route path="locales">
            <Route index element={<LocalesPage />} />
            <Route path="crear" element={<CrearUsuario />} />
          </Route>

          <Route path="usuarios">
            <Route index element={<UsuariosPage />} />
            <Route path="crear" element={<CrearUsuario />} />
            <Route path="detalle/:id" element={<DetalleUsuario />} />
            <Route path="editar/:id" element={<EditarUsuario />} />
          </Route>

          <Route path="personalMedico">
            <Route index element={<PersonalMedicoPage />} />
            <Route path="crear" element={<CrearMedico />} />
            <Route path="detalle/:id" element={<DetalleMedico />} />
            <Route path="editar/:id" element={<EditarMedico />} />
          </Route>

          <Route path="calificaciones">
            <Route index element={<CalificacionesPage />} />
            <Route path="crear" element={<CrearUsuario />} />
          </Route>
          
          <Route path="logs">
            <Route index element={<LogsPage  />} />
            <Route path="crear" element={<CrearUsuario />} />
          </Route>

          <Route path="auditorias">
            <Route index element={<AuditoriasPage />} />
            <Route path="crear" element={<CrearUsuario />} />
          </Route>

          <Route path="reportes">
            <Route index element={<ReportesPage/>} />
            <Route path="crear" element={<CrearUsuario />} />
          </Route>

          

        </Route>
        

        
        <Route path="/example" element={<Example />} />

        <Route path="/trash" element={<App />} />


        <Route>

        </Route>
        
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
