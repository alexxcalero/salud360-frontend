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
  IdCard,
} from "lucide-react";

import Edge from "@/assets/edge.svg";

import colors from "tailwindcss/colors";

function Sidebar({ active = 0 }: { active: number }) {
  return (
    <div className="bg-blue-500">
      <section className="mb-[20px] border-b-1 border-blue-900  p-[20px] flex items-center gap-[10px]">
        <img
          src="/img/mono/medico.png"
          alt=""
          className="aspect-1/1 h-[36px]"
        />{" "}
        <h2 className="font-semibold text-white">Administración</h2>
      </section>

      <ul className="text-left flex gap-[10px] flex-col ml-[20px] after:content-['']">
        {[
          [LayoutDashboard, "Dashboard"],
          [Settings, "Configuración general"],
          [LayoutDashboard, "Roles y permisos"],
          [IdCard, "Membresías"],
          [PersonStanding, "Comunidades"],
          [Puzzle, "Servicios"],
          [MapPin, "Locales"],
          [UsersRound, "Usuarios"],
          [BriefcaseMedical, "Personal médico"],
          [MessageSquare, "Calificaciones"],
          [LayoutDashboard, "Logs"],
          [ShieldUser, "Auditorías"],
          [LayoutDashboard, "Reportes"],
        ].map(([Icon, label], index) => (
          <li
            key={index} // Como react hincha las bolas con eso del key
            className="relative px-[20px] py-[7px] data-[active=true]:bg-gray-200 rounded-l-full group cursor-pointer hover:bg-blue-600 ease-out duration-150 transition-colors"
            data-active={index === active}
          >
            <Icon
              color={index === active ? colors.blue["500"] : "white"}
              className="inline-block"
            />{" "}
            <span className="text-white group-data-[active=true]:text-blue-500 rounded-l-full ml-[8px]">
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
    </div>
  );
}

export default Sidebar;
