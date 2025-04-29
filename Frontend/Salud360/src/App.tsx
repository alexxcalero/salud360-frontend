import "./App.css";
import { NavLink } from "react-router";
import Button from './components/Button';
import Input from './components/Input';
import Label from './components/Label';
import InputLabel from './components/InputLabel';

function App() {
  return (
    <>
      <div>
        <h1 className="text-emerald-600">
          Proyecto React.js (o .ts XD) + TailwindCSS + Shadcn configurado!!!
          Cortesía de Fabián(U)
        </h1>
        <div>
          <div>
            <img src="https://universitario.pe/media/images/banners/PORTDA_WEB.jpg" alt="" />
          </div>
        <Button/>
        <Input/>
        <Label htmlFor="email"> HOLA POBRESSSs </Label>

        <div>a</div>
        <div>a</div>

        <InputLabel type="email" placeholder="email del usuario" htmlFor="email" label="contenido"/>
        <div>a</div>
        <div>a</div>
        <Input/>
        </div>
      </div>
        
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
