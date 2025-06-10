import {
  LayoutDashboard,
  Settings,
  ShieldUser,
  MessageSquare,
  BriefcaseMedical,
  UsersRound,
  MapPin,
  Puzzle,
  PersonStanding,
  Clock,
  BarChart,
  LogOut,
} from "lucide-react";

import Edge from "@/assets/edge.svg";
import colors from "tailwindcss/colors";
import { Link, useNavigate } from "react-router";
//useNavigate para poder darle click al modulo del sidebar y que vaya. Lo estoy colocando dentro del map del ul
import logo from "@/assets/logo.png";
import Button from "../Button";
import { useContext } from "react";
import { AuthContext } from "@/hooks/AuthContext";
import { useToasts } from "@/hooks/ToastContext";

const routes = [
  "dashboard",
  "configuracion",
  //"roles",
  //"membresias",
  "comunidades",
  "servicios",
  "locales",
  "usuarios",
  "personalMedico",
  "testimonios",
  //"logs",
  "auditorias",
  "reportes",
  "clases",
  "citasMedicas",
];

function Sidebar({ active = 0 }: { active: number }) {
  const navigate = useNavigate();

  const { logout } = useContext(AuthContext);
  const { createToast } = useToasts();

  return (
    <div className="bg-brand-primary sticky left-0 top-0 h-dvh flex flex-col">
      <section className="mb-[20px] border-b-1 border-blue-900  p-[20px] flex items-center gap-[10px]">
        {/*<img
          src="/img/mono/medico.png"
          alt=""
          className="aspect-1/1 h-[36px]"
        />{" "}*/}
        <Link to="/">
          <img src={logo} alt="Logo" className="cursor-pointer" />
        </Link>
        <h2 className="font-semibold text-white">Administración</h2>
      </section>

      <ul className="text-left flex gap-[10px] flex-col ml-[20px] after:content-['']">
        {[
          [LayoutDashboard, "Dashboard"],
          [Settings, "Configuración General"],
          //[Lock, "Roles y Permisos"],
          //[IdCard, "Membresías"],
          [PersonStanding, "Comunidades"],
          [Puzzle, "Servicios"],
          [MapPin, "Locales"],
          [UsersRound, "Usuarios"],
          [BriefcaseMedical, "Personal Médico"],
          [MessageSquare, "Testimonios"],
          //[ScrollText, "Logs"],
          [ShieldUser, "Auditorías"],
          [BarChart, "Reportes"],
          [Clock, "Clases"],
          [BriefcaseMedical, "Citas Médicas"],
        ].map(([Icon, label], index) => (
          <li
            key={index} // Como react hincha las bolas con eso del key
            onClick={() => navigate(routes[index])}
            className="relative px-[20px] py-[7px] data-[active=true]:bg-white rounded-l-full group cursor-pointer hover:bg-blue-600 ease-out duration-150 transition-colors"
            data-active={index === active}
          >
            <Icon
              color={index === active ? colors.blue["500"] : "white"}
              className="inline-block"
            />{" "}
            <span className="text-white group-data-[active=true]:text-blue-500 group-data-[active=true]:font-bold rounded-l-full ml-[8px]">
              {label as string}
            </span>
            {index === active && (
              <>
                <img
                  src={Edge}
                  alt="edge"
                  className="absolute top-[-15px] right-0 rotate-180 w-[15px] aspect-1/1"
                />
                <img
                  src={Edge}
                  alt="edge"
                  className="absolute bottom-[-15px] right-0 rotate-90 w-[15px] aspect-1/1"
                />
              </>
            )}
          </li>
        ))}
      </ul>

      <section className="justify-self-end self-start mt-auto p-8 pl-[20px]">
        <Button
          variant="white"
          onClick={() => {
            logout();
            createToast("success", {
              title: "Sesión cerrada correctamente",
            });
          }}
        >
          <LogOut />
          Cerrar sesión
        </Button>
      </section>
    </div>
  );
}

export default Sidebar;
