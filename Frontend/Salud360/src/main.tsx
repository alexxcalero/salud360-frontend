import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "@/index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

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
import CrearComunidad from "./pages/admin/comunidad/CrearComunidad";
import EditarComunidad from "./pages/admin/comunidad/EditarComunidad";
import DetalleComunidad from "./pages/admin/comunidad/DetalleComunidad";
//SERVICIOS
import ServiciosPage from "./pages/admin/servicios/ServiciosPage";
import DashboardPage from "./pages/admin/dashboard/DashboardPage";
import RolesPage from "./pages/admin/roles/RolesPage";
//import MembresiasPage from "./pages/admin/membresias/MembresiasPage";
import LocalesPage from "./pages/admin/locales/LocalesPage";
import PersonalMedicoPage from "./pages/admin/personalMedico/PersonalMedicoPage";
import TestiomoniosPage from "./pages/admin/testimonios/TestimoniosPage";
import LogsPage from "./pages/admin/logs/LogsPage";
import AuditoriasPage from "./pages/admin/auditoria/AuditoriasPage";
import ReportesPage from "./pages/admin/reportes/ReportesPage";
import ConfiguracionGeneralPage from "./pages/admin/configuracionGeneral/ConfiguracionGeneralPage";
import DetalleUsuario from "./pages/admin/usuarios/DetalleUsuario";
import EditarUsuario from "./pages/admin/usuarios/EditarUsuario";
import LandingLayout from "./layouts/LandingLayout";
import UsuarioLayout from "./layouts/UsuarioLayout";
import UsuarioConfigLayout from "@/layouts/UsuarioConfigLayout";
import ConfigPerfil from "@/pages/usuario/configuracion/Perfil";
import ConfigSistema from "@/pages/usuario/configuracion/Sistema";
import Home from "./pages/landing/Home";
import Inicio from "./pages/usuario/Inicio";
import CrearMedico from "./pages/admin/personalMedico/CrearMedico";
import App from "./App";

import RegisterPage from "./pages/usuario/Registro/RegisterPage";
import LoginPage from "./pages/usuario/Login/LoginPage";
import SobreNosotros from "./pages/landing/SobreNosotros";
import ComunidadesLanding from "./pages/landing/Comunidades";
import ComunidadesUsuario from "./pages/usuario/Comunidades";
import DetalleComunidadLanding from "./pages/landing/DetalleComunidad";
import DetalleComunidadUsuario from "./pages/usuario/DetalleComunidad";
import EditarConfiguracionGeneralPage from "./pages/admin/configuracionGeneral/EditarConfiguracionGeneralPage";
import Page404 from "./pages/404";
import Membresias from "./pages/usuario/configuracion/Membresias";
import HistorialPagos from "./pages/usuario/configuracion/HistorialPagos";
import EditarMedico from "./pages/admin/personalMedico/EditarMedico";
import DetalleMedico from "./pages/admin/personalMedico/DetalleMedico";
import UsuarioSuccess from "./pages/admin/usuarios/UsuarioSuccess";
import SuccessRegisterPage from "./pages/usuario/Registro/SuccessRegisterPage";
import { AuthProvider } from "./hooks/AuthContext";
import DetalleAuditoriaPage from "./pages/admin/auditoria/DetalleAuditoriaPage";
import { LoadingContext } from "./hooks/LoadingContext";
import { ToastProvider } from "./hooks/ToastContext";
import ExplorarComunidades from "./pages/usuario/ExplorarComunidades";
import DetalleComunidadLayout from "./layouts/DetalleComunidadLayout";
import { ComunidadProvider } from "./hooks/ComunidadContext";
import DetalleComunidadHorario from "./pages/usuario/DetalleComunidadHorarios";
import DetalleComunidadReservas from "./pages/usuario/DetalleComunidadReservas";
import DetalleComunidadMembresia from "./pages/usuario/DetalleComunidadMembresia";
//import DetalleComunidadIntegrantes from "./pages/usuario/DetalleComunidadIntegrantes";
import CalendarioYReservas from "./pages/usuario/CalendarioYReservas";
//import CitasMedicas from "./pages/usuario/CitasMedicas";
//import HistorialMedico from "./pages/usuario/HistorialMedico";
import ClasesPage from "./pages/admin/clases/ClasesPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { DialogProvider } from "./hooks/dialogContext";
import CrearServicio from "./pages/admin/servicios/CrearServicio";
import DetalleServicio from "./pages/admin/servicios/DetalleServicio";
import CrearLocal from "./pages/admin/locales/CrearLocal";
import DetalleLocal from "./pages/admin/locales/DetalleLocal";
import EditarLocal from "./pages/admin/locales/EditarLocal";
import EditarServicio from "./pages/admin/servicios/EditarServicio";
import CitasMedicasPage from "./pages/admin/citasMedicas/CitasMedicasPage";
import PasarelaInicialPage from "./pages/usuario/pagos/PasarelaInicialPage";
import PasarelaPagoPage from "./pages/usuario/pagos/PasarelaPagoPage";
import DetalleTestimonio from "./pages/admin/testimonios/DetalleTestimonio";
import SeleccionarTipo from "./pages/admin/usuarios/SeleccionarTipo";
import CrearAdmin from "./pages/admin/usuarios/CrearAdmin";
import PasarelaExito from "./pages/usuario/pagos/PasarelaExitoTmr";
import { ComunidadProtectedRoute } from "./components/ProtectedComunidadRoute";

const CLIENT_ID =
  "442103352631-urj3v36db8bhki2cg4vu6c2q404dkko7.apps.googleusercontent.com";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <AuthProvider> {/*El AuthProvider es para la persistencia del inicio de sesión en todas las paginas */}
        <ToastProvider><LoadingContext>
          <DialogProvider>

            <BrowserRouter>
              <Routes>
                {/* // A este nivel tienen que insertar nuevas rutas. Especificando la ruta "/usuarios/register" y el elemento que será la página */}
                {/*1. Sección del Landing Page */}
                <Route path="/" element={<LandingLayout />}>
                  <Route index element={<Home />} />
                  <Route path="RegistroUsuario" element={<RegisterPage/>}></Route>
                  <Route path="IniciarSesionUsuario" element={<LoginPage/>}></Route>
                  <Route path="RegistroExitoso" element={<SuccessRegisterPage/>}></Route>
                  <Route path="comunidades">
                    <Route index element={<ComunidadesLanding />} />
                    <Route path="detalle/:id" element={<DetalleComunidadLanding />} />
                  </Route>
                  <Route path="sobreNosotros" element={<SobreNosotros />} />
                </Route>




                {/*2. Sección de Usuario */} {/*id de Roles permitidos: Cliente Visitante y Cliente Miembro (2 y 3) */}
                
                  <Route path="/usuario" element={<ProtectedRoute allowedRules={[2, 3]} />}>
                    <Route element={<UsuarioLayout />}>
                      <Route index element={<Inicio />} />
                      <Route path="configuracion" element={<UsuarioConfigLayout />}>
                        <Route index element={<ConfigPerfil />} />
                        <Route path="successEditar" element={<UsuarioSuccess modulo="¡Actualización exitosa!" detalle="Tu perfil fue modificado correctamente" route="/usuario/"/>} />
                        <Route path="successCambiarContrasenha" element={<UsuarioSuccess modulo="¡Actualización exitosa!" detalle="Tu contraseña fue actualizada correctamente" route="/usuario/"/>} />
                        <Route path="successCambiarNotificaciones" element={<UsuarioSuccess modulo="¡Actualización exitosa!" detalle="Tus notificaciones fueron actualizadas correctamente" route="/usuario/"/>} />
                        <Route path="sistema" element={<ConfigSistema />} />
                        <Route path="membresias" element={<Membresias />} />
                        <Route path="historial-pagos" element={<HistorialPagos />} />
                      </Route>
                      <Route path="calendarioYReservas" element={<CalendarioYReservas/>}></Route>
                      {/*<Route path="citasMedicas" element={<CitasMedicas/>}></Route>
                      <Route path="historialMedico" element={<HistorialMedico/>}></Route>*/}
                      <Route path="comunidades">
                        <Route index element={<ComunidadesUsuario />} />
                        <Route path="explorarComunidades" element={<ExplorarComunidades />} />
                          <Route path="detalle/:id" element={<ComunidadProtectedRoute><ComunidadProvider> <DetalleComunidadLayout /> </ComunidadProvider> </ComunidadProtectedRoute>}>
                            <Route index element={<DetalleComunidadUsuario />}></Route>
                            <Route path="horarios" element={<DetalleComunidadHorario/>}></Route>
                            <Route path="reservas" element={<DetalleComunidadReservas/>}></Route>
                            <Route path="membresia" element={<DetalleComunidadMembresia/>}></Route>
                            {/*<Route path="integrantes" element={<DetalleComunidadIntegrantes/>}></Route>*/}
                          </Route>
                      </Route>
                      <Route path="pasarela-pagos/">
                        <Route index element={<PasarelaInicialPage />} />
                        <Route path="pago" element={<PasarelaPagoPage />} />
                        <Route path="exito" element={<PasarelaExito />} />
                      </Route>
                    </Route>
                  </Route>





            {/*3. Sección de Admin */} {/*id de Roles permitidos: Admin (1) */}
            <Route path="/admin" element={<ProtectedRoute allowedRules={[1]}/>}>
              <Route element={<AdminLayout />}>
                <Route index element={<DashboardPage />} />
                {" "}
                {/* ESTO ES PARA LA PANTALLAS DE ROLES Y PERMISOS*/}
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
                {/*<Route path="membresias">
                  <Route index element={<MembresiasPage />} />
                  <Route path="crear" element={<CrearUsuario />} />
                  <Route path="detalle/:id" element={<DetalleComunidadLanding />} />
                  <Route path="editar/:id" element={<EditarComunidad />} />
                </Route>*/}
                <Route path="comunidades">
                  <Route index element={<ComunidadPage />} />
                  <Route path="crear" element={<CrearComunidad />} />
                  <Route path="editar/:id" element={<EditarComunidad />} />
                  <Route path="detalle/:id" element={<DetalleComunidad />} />
                  <Route path="successCrear" element={<UsuarioSuccess modulo="¡Comunidad creada correctamente!" detalle="La comunidad fue creada correctamente" route="/admin/comunidades"/>} />
                  <Route path="successEditar" element={<UsuarioSuccess modulo="¡Comunidad modificada correctamente!" detalle="La comunidad fue modificada correctamente" route="/admin/comunidades"/>} />
                </Route>
                <Route path="servicios">
                  <Route index element={<ServiciosPage />} />
                  <Route path="crear" element={<CrearServicio />} />
                  <Route path="detalle/:id" element={<DetalleServicio />} />
                  <Route path="editar/:id" element={<EditarServicio />} />
                  <Route path="successCrear" element={<UsuarioSuccess modulo="¡Servicio creado correctamente!" detalle="El servicio fue creado correctamente" route="/admin/servicios"/>} />
                  <Route path="successEditar" element={<UsuarioSuccess modulo="¡Servicio modificado correctamente!" detalle="El servicio fue modificado correctamente" route="/admin/servicios"/>} />
                </Route>
                <Route path="locales">
                  <Route index element={<LocalesPage />} />
                  <Route path="crear" element={<CrearLocal />} />
                  <Route path="detalle/:id" element={<DetalleLocal />} />
                  <Route path="editar/:id" element={<EditarLocal />} />
                  <Route path="successCrear" element={<UsuarioSuccess modulo="¡Local creado correctamente!" detalle="El local fue creado correctamente" route="/admin/locales"/>} />
                  <Route path="successEditar" element={<UsuarioSuccess modulo="¡Local modificado correctamente!" detalle="El local fue modificado correctamente" route="/admin/locales"/>} />
                </Route>
                <Route path="usuarios">
                  <Route index element={<UsuariosPage />} />
                  {/*<Route path="crear" element={<CrearUsuario />} />*/}
                  <Route path="crear">
                    <Route index element={<SeleccionarTipo />}/>
                    <Route path="usuario" element={<CrearUsuario />} />
                    <Route path="admin" element={<CrearAdmin />} />
                  </Route>


                  <Route path="detalle/:id" element={<DetalleUsuario />} />
                  <Route path="editar/:id" element={<EditarUsuario />} />
                  <Route path="successCrearAdmin" element={<UsuarioSuccess modulo="¡Administrador creado correctamente!" detalle="El usuario administrador fue creado correctamente"/>} />
                  <Route path="successCrear" element={<UsuarioSuccess modulo="¡Usuario creado correctamente!" detalle="El usuario fue creado correctamente" />} />
                  <Route path="successEditar" element={<UsuarioSuccess modulo="¡Usuario modificado correctamente!" detalle="El usuario fue modificado correctamente" />} />
                </Route>
                <Route path="personalMedico">
                  <Route index element={<PersonalMedicoPage />} />
                  <Route path="crear" element={<CrearMedico />} />
                  <Route path="detalle/:id" element={<DetalleMedico />} />
                  <Route path="editar/:id" element={<EditarMedico />} />
                  <Route path="successCrear" element={<UsuarioSuccess modulo="¡Médico creado correctamente!" detalle="El médico fue creado correctamente" route="/admin/personalMedico"/>} />
                  <Route path="successEditar" element={<UsuarioSuccess modulo="¡Médico modificado correctamente!" detalle="El médico fue modificado correctamente" route="/admin/personalMedico" />} />
                </Route>
                <Route path="testimonios">
                  <Route index element={<TestiomoniosPage />} />
                  <Route path="detalle/:id" element={<DetalleTestimonio />} />
                </Route>
                <Route path="logs">
                  <Route index element={<LogsPage />} />
                  <Route path="crear" element={<CrearUsuario />} />
                </Route>
                <Route path="auditorias">
                    <Route index element={<AuditoriasPage />} />
                    <Route path="detalle/:id" element={<DetalleAuditoriaPage />} />
                </Route>
                <Route path="reportes">
                  <Route index element={<ReportesPage />} />
                  <Route path="crear" element={<CrearUsuario />} />
                </Route>
                <Route path="clases">
                  <Route index element={<ClasesPage />} />
                  <Route path="crear" element={<CrearUsuario />} />
                </Route>
                <Route path="citasMedicas">
                  <Route index element={<CitasMedicasPage />} />
                </Route>
              </Route>
            </Route>
            <Route path="/example" element={<Example />} />


            <Route path="/trash" element={<App />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </BrowserRouter>
        </DialogProvider>
        </LoadingContext></ToastProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
