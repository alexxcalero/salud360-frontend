import { NavLink } from "react-router";

function Example() {
  return (
    <div>
      <h1 className="text-emerald-600">
        Proyecto con router. Coretesía de Fidel
      </h1>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAqJsgKqUqQo_9BDbEP1ce2HeccBknkTJtKA&s"
        alt=""
      />

      <NavLink to="/" end>
        <button className="bg-gray-100 py-2 px-7 border-1 border-gray-800 rounded-xl hover:bg-gray-300 cursor-pointer">
          Hola
        </button>
      </NavLink>

      <NavLink to="/admin/comunidadPage" end>
        <button className="bg-gray-100 py-2 px-7 border-1 border-gray-800 rounded-xl hover:bg-gray-300 cursor-pointer">
          RegistrarComunidad
        </button>
      </NavLink>

    </div>
  );
}

export default Example;
