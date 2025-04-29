import "./App.css";
import { NavLink } from "react-router";

import Button from './components/Button';
import Input from './components/Input';
import Label from './components/Label';
import InputLabel from './components/InputLabel';
import Select from './components/Select';
import SelectLabel from "./components/SelectLabel";


import ModalError from "./components/ModalError";
import ModalExito
 from "./components/ModalExito";
function App() {


  const optionsSelect = [
      { value: "Hombre", content: "Hombre" },
      { value: "Mujer", content: "Mujer" },
      { value: "Rodrigo Roller", content: "Rodrigo Roller" }]
  


  return (
    <>
      <div>
        <h1 className="text-emerald-600">
          Proyecto React.js (o .ts XD) + TailwindCSS + Shadcn configurado!!!
          Cortesía de Fabián(U)

        </h1>

        <div className="space-y-10">
          <div>
            <img src="https://universitario.pe/media/images/banners/PORTDA_WEB.jpg" alt="" />
          </div>
          <Button/>

          <Input/>

          <Label htmlFor="email"> Probando Label (la línea debajo es un hr)</Label>

          <hr />

          <InputLabel type="email" placeholder="email del usuario" htmlFor="email" label="contenido"/>
          
          <Input/>

          <SelectLabel options={optionsSelect} placeholder="Seleccione su genero" htmlFor="email" label="Género" />
          
          <NavLink
            className="bg-gray-100 py-2 px-7 border-1 border-gray-800 rounded-xl hover:bg-gray-300 cursor-pointer"
            to="/example"
            end
          >
            Example
          </NavLink>


        </div>




      </div>

      <div>
        <h1 className="text-emerald-600">
          Proyecto React.js (o .ts XD) + TailwindCSS + Shadcn configurado!!!
          Modales de Eliminación y Éxito Cortesía IGorillaVR(U)
        </h1>

        <div className="mt-4">
          <ModalError />
        </div>
        <div className="mt-4">
          <ModalExito />
        </div>
      </div>
      
    </>
  );
}

export default App;
