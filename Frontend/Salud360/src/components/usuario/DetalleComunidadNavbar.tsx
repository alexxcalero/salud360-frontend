import { NavLink } from "react-router";

function DetalleComunidadNavbar(){

    const paths = [
        ["", "Comunidad"],
        ["horarios", "Horarios"],
        ["reservas", "Reservas"],
        ["membresia", "Membresía"],
    ];

    return(
        <header>
            <nav className="w-full border-b border-neutral-300">
                <div className="w-full flex flex-row gap-32 justify-center pt-4">
                    {paths.map(([path, nombre]) => (
                        <NavLink
                        key={path}
                        className={({isActive}) => `${isActive && "font-bold text-[#2A86FF] border-b-2 border-[#2A86FF]"} px-12 pb-2`}

                        to={`${path}`}
                        end={path === ""}>
                            {nombre}
                        </NavLink>
                    ))}
                </div>
            </nav>
        </header>
    );
}

export default DetalleComunidadNavbar;

