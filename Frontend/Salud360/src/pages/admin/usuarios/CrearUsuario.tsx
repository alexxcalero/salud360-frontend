import {Phone, Mail} from "lucide-react";

import FormContainer from "@/components/FormContainer"
import InputIconLabel from "@/components/InputIconLabel"
import InputLabel from "@/components/InputLabel"
import SelectLabel from "@/components/SelectLabel";
import Button from "@/components/Button";

function CrearUsuario(){

    const optionsSelect = [
        { value: "Hombre", content: "Hombre" },
        { value: "Mujer", content: "Mujer" },
        { value: "Rodrigo Roller", content: "Rodrigo Roller" }]

    return(
        <div className="mx-128 my-auto">
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
                <Button variant="primary"size="md" className="my-4">Crear Usuario</Button>
            </FormContainer>
        </div>
    );
    
}

export default CrearUsuario;