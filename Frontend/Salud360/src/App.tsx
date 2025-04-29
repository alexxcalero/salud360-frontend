import "./App.css";
import { NavLink } from "react-router";

function App() {
  return (
    <>
      <div>
        <h1 className="text-emerald-600">
          Proyecto React.js (o .ts XD) + TailwindCSS + Shadcn configurado!!!
          Cortesía de Fabián(U)
        </h1>
      </div>
      <img
        src="https://universitario.pe/media/images/banners/PORTDA_WEB.jpg"
        alt=""
      />
      <NavLink
        className="bg-gray-100 py-2 px-7 border-1 border-gray-800 rounded-xl hover:bg-gray-300 cursor-pointer"
        to="/example"
        end
      >
        Example
      </NavLink>
    </>
  );
}

export default App;
