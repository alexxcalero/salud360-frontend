import "./App.css";
import { NavLink } from "react-router-dom"
import { Search, Phone, Mail } from "lucide-react"

import Button from "./components/Button";
import Input from "./components/Input";
import Label from "./components/Label";
import InputLabel from "./components/InputLabel";
//import Select from './components/Select';
import SelectLabel from "./components/SelectLabel";
import InputIcon from "./components/InputIcon";
import FormContainer from "./components/FormContainer";
import InputIconLabel from "./components/InputIconLabel";
import ButtonIcon from "./components/ButtonIcon";
import ModalError from "./components/ModalError";
import ModalExito from "./components/ModalExito";

import { Input as ShadInput} from "@/components/ui/input"

function App() {
  const optionsSelect = [
    { value: "Hombre", content: "Hombre" },
    { value: "Mujer", content: "Mujer" },
    { value: "Rodrigo Roller", content: "Rodrigo Roller" },
  ];
  

  return (
    <>
      <div>
        <h1 className="text-emerald-600">
          Proyecto React.js (o .ts XD) + TailwindCSS + Shadcn configurado!!!
          Cortesía de Fabián(U)
        </h1>

        <p>disabled:</p>
        <ShadInput disabled={true}></ShadInput>
        <p>readOnly:</p>
        <ShadInput readOnly={true}></ShadInput>

        <div className="space-y-10">
          <div>
            <img
              src="https://universitario.pe/media/images/banners/PORTDA_WEB.jpg"
              alt=""
            />
          </div>
          <Button>Hola</Button>

          <Button variant="danger">DANGER</Button>
          <Button variant="outline">OUTLINE</Button>
          z<Button variant="primary">PRIMARY</Button>

          <Button variant="danger" size="sm" >DANGER sm</Button>
          <Button variant="outline" size="sm">OUTLINE sm</Button>
          <Button variant="primary" size="sm">PRIMARY sm</Button>

          <Button variant="danger" size="md">DANGER md</Button>
          <Button variant="outline" size="md">OUTLINE md</Button>
          <Button variant="primary"size="md" >PRIMARY md</Button>

          <Button variant="danger" size="lg">DANGER lg</Button>
          <Button variant="outline" size="lg">OUTLINE lg</Button>
          <Button variant="primary"size="lg" >PRIMARY lg</Button>

          <Button variant="danger" size="lg" className="w-48 mx-auto">DANGER w-48</Button>
          <Button variant="outline" size="lg" className="w-48 mx-auto">OUTLINE w-48</Button>
          <Button variant="primary"size="lg" className="w-48 mx-auto">PRIMARY w-48</Button>

          <Input/>

          <Label htmlFor="email"> Probando Label (la línea debajo es un hr)</Label>

          <hr />

          <InputLabel type="email" placeholder="email del usuario" htmlFor="email" label="contenido"/>
          
          <Input/>

          <SelectLabel options={optionsSelect} placeholder="Seleccione su genero" htmlFor="email" label="Género" />
          
          <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
            <FormContainer>
              <Button variant="primary"size="lg" className="w-48 mx-auto">PRIMARY w-48</Button>
              <Button variant="danger" size="lg" className="w-48 mx-auto">DANGER w-48</Button>
              <InputLabel type="email" placeholder="Nombre del usuario" htmlFor="email" label="Escriba su nombre:"/>
              <InputLabel type="email" placeholder="Nombre del usuario" htmlFor="email" label="Escriba su apellido:"/>
              <SelectLabel options={optionsSelect} placeholder="Seleccione su genero" htmlFor="email" label="Género" />
              <InputIcon icon={<Phone className="w-5 h-5" />} placeholder="Teléfono" type="tel" />
            </FormContainer>
          </div>

          <FormContainer>
              <Button variant="primary"size="lg" className="w-48 mx-auto">PRIMARY w-48</Button>
              <Button variant="danger" size="lg" className="w-48 mx-auto">DANGER w-48</Button>
              <InputLabel type="email" placeholder="Nombre del usuario" htmlFor="email" label="Escriba su nombre:"/>
              <InputLabel type="email" placeholder="Nombre del usuario" htmlFor="email" label="Escriba su apellido:"/>
              <SelectLabel options={optionsSelect} placeholder="Seleccione su genero" htmlFor="email" label="Género" />
              <InputIcon icon={<Phone className="w-5 h-5" />} placeholder="Teléfono" type="tel" />
          </FormContainer>

          <FormContainer>
              <h1>Registrar Usuario</h1>
              <h2>Rellene los siguientes campos para completar el registro del usuario.</h2>
              <InputLabel type="email" placeholder="Ingrese los nombres" htmlFor="email" label="Nombres"/>
              <InputLabel type="email" placeholder="Ingrese los apellidos" htmlFor="email" label="Apellidos"/>
              <InputLabel type="email" placeholder="Ingrese el número de documento de identidad" htmlFor="email" label="DNI"/>
              <InputIconLabel icon={<Phone className="w-5 h-5" />} placeholder="Teléfono" type="tel" htmlFor="tel" label="Teléfono"></InputIconLabel>
              <SelectLabel options={optionsSelect} placeholder="Seleccione el rol" htmlFor="email" label="Rol" />
              <InputIconLabel icon={<Mail className="w-5 h-5" />} placeholder="Mail" type="email" htmlFor="email" label="Email"></InputIconLabel>
              <SelectLabel options={optionsSelect} placeholder="Seleccione su genero" htmlFor="email" label="Género" />
              <InputLabel type="date" placeholder="Ingrese la fecha de nacimiento" htmlFor="date" label="Fecha de nacimiento"/>
              <InputLabel type="password" placeholder="" htmlFor="password" label="Contraseña"/>
              <Button variant="primary"size="md" >Crear Usuario</Button>
          </FormContainer>
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

          <InputIcon icon={<Search className="w-5 h-5" />} placeholder="Buscar monos"  />
          <InputIcon icon={<Phone className="w-5 h-5" />} placeholder="Teléfono" type="tel" />

          <ButtonIcon icon={<Search className="w-4 h-4" />} variant="primary"size="sm" >Botón con ícono</ButtonIcon>
          <ButtonIcon icon={<Search className="w-5 h-5" />} variant="primary"size="md" >Botón con ícono</ButtonIcon>
          <ButtonIcon icon={<Search className="w-6 h-6" />} variant="primary"size="lg" >Botón con ícono</ButtonIcon>


          <ButtonIcon icon={<Search className="w-6 h-6" />} variant="danger" size="lg" className="w-96 mx-auto">Botón con ícono</ButtonIcon>
        </div>
      </div>

      <div>
        <h1 className="text-emerald-600">
          Proyecto React.js (o .ts XD) + TailwindCSS + Shadcn configurado!!!
          Modales de Eliminación y Éxito Cortesía IGorillaVR(U)
        </h1>

        <div className="mt-4">
          <ModalError modulo="Usuario" detalle={"hola amigos"} onConfirm={() => {              
            }} onCancel={() => {}} />
        </div>
        <div className="mt-4">
          <ModalExito modulo="Usuario" detalle="El usuario fue eliminado correctamente" onConfirm={() => {
            }}/>
        </div>
      </div>         
    </>
  );
}

export default App;
