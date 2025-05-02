import "./App.css";
import { NavLink } from "react-router";
import { Search, Phone } from "lucide-react";


import Button from './components/Button';
import Input from './components/Input';
import Label from './components/Label';
import InputLabel from './components/InputLabel';
//import Select from './components/Select';
import SelectLabel from "./components/SelectLabel";
import InputIcon from "./components/InputIcon";

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
          <Button>Hola</Button>

          <Button variant="danger">DANGER</Button>

          <Button variant="outline">OUTLINE</Button>
          
          <Button variant="primary">PRIMARY</Button>

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

          <div className="space-y-4 max-w-sm">
            <InputIcon icon={<Search className="w-5 h-5" />} placeholder="Buscar monos"  />
            <InputIcon icon={<Phone className="w-5 h-5" />} placeholder="Teléfono" type="tel" />
          </div>


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
