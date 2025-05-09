import {Phone, Mail} from "lucide-react";
import { useState } from "react";
import axios from "axios";

import FormContainer from "@/components/FormContainer"
import InputIconLabel from "@/components/InputIconLabel"
import InputLabel from "@/components/InputLabel"
import SelectLabel from "@/components/SelectLabel";
import Button from "@/components/Button";
import UsuariosForms from "@/components/admin/usuarios/UsuariosForms";
import useUsuarioForm from "@/hooks/useUsuarioForm";

function CrearUsuario(){

    const {
        nombres, setNombres,
        apellidos, setApellidos,
        DNI, setDNI,
        telefono, setTelefono,
        rol, setRol,
        correo, setCorreo,
        genero, setGenero,
        fechaNacimiento, setFechaNacimiento,
        contrasenha, setContrasenha
    } = useUsuarioForm();

    const optionsSelect = [
        { value: "Hombre", content: "Hombre" },
        { value: "Mujer", content: "Mujer" },
        { value: "Rodrigo Roller", content: "Rodrigo Roller" }]

    const handleCrearUsuario = async() => {
        try{
            const numeroDocumento = DNI;
            const response = await axios.post("http://localhost:8080/api/usuarios", 
                {
                    nombres,
                    apellidos,
                    numeroDocumento,
                    telefono,
                    correo,
                    genero,
                    fechaNacimiento,
                    contrasenha,
                    tipoDocumento: {
                        idTipoDocumento: 1
                    },
                    rol: {
                        idRol: 1
                    },
                },
                {  
                    auth: {
                        username: "admin",
                        password: "admin123"
                    },
                    headers: {
                        "Content-Type": "application/json",
                      },
                }
            );

            console.log("Usuario creado:", response.data);
            alert("Usuario creado exitosamente");
        }
        catch (err){
            console.error("Error al crear usuario:", err);
            alert("Hubo un error al crear el usuario");
        }


    }

    return(
        <div className="mx-128 my-auto">
            
            <UsuariosForms
                title="Registrar Usuario"
                subtitle="Rellene los siguientes campos para completar el registro del usuario."
                nombres={nombres}
                setNombres={setNombres}
                apellidos={apellidos}
                setApellidos={setApellidos}
                DNI={DNI}
                setDNI={setDNI}
                telefono={telefono}
                setTelefono={setTelefono}
                correo={correo}
                setCorreo={setCorreo}
                rol={rol}
                setRol={setRol}
                genero={genero}
                setGenero={setGenero}
                fechaNacimiento={fechaNacimiento}
                setFechaNacimiento={setFechaNacimiento}
                contrasenha={contrasenha}
                setContrasenha={setContrasenha}
                onSubmit={handleCrearUsuario}
                buttonText="Crear Usuario"
                readOnly={false}
            />


            <div>
                <p className="mt-2 text-sm text-gray-600">Valor actual: {nombres}</p>
                <p className="mt-2 text-sm text-gray-600">Valor actual: {apellidos}</p>
                <p className="mt-2 text-sm text-gray-600">Valor actual: {DNI}</p>
                <p className="mt-2 text-sm text-gray-600">Valor actual: {telefono}</p>
                <p className="mt-2 text-sm text-gray-600">Valor actual: {rol}</p>
                <p className="mt-2 text-sm text-gray-600">Valor actual: {correo}</p>
                <p className="mt-2 text-sm text-gray-600">Valor actual: {genero}</p>
                <p className="mt-2 text-sm text-gray-600">Valor actual: {fechaNacimiento}</p>
                <p className="mt-2 text-sm text-gray-600">Valor actual: {contrasenha}</p>
            </div>

        </div>
    );
    
}

export default CrearUsuario;

/*<FormContainer>
                <h1>Registrar Usuario</h1>
                <h2>Rellene los siguientes campos para completar el registro del usuario.</h2>
                <InputLabel type="email" placeholder="Ingrese los nombres" htmlFor="email" label="Nombres" value={nombres} onChange={(e) => setNombres(e.target.value)}/>
                <InputLabel type="email" placeholder="Ingrese los apellidos" htmlFor="email" label="Apellidos" value={apellidos} onChange={(e) => setApellidos(e.target.value)}/>
                <InputLabel type="email" placeholder="Ingrese el número de documento de identidad" htmlFor="email" label="DNI" value={DNI} onChange={(e) => setDNI(e.target.value)}/>
                <InputIconLabel icon={<Phone className="w-5 h-5" />} placeholder="Teléfono" type="tel" htmlFor="tel" label="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} ></InputIconLabel>
                <SelectLabel options={optionsSelect} placeholder="Seleccione el rol" htmlFor="email" label="Rol" value={rol} onChange={(value) => setRol(value)}/>
                <InputIconLabel icon={<Mail className="w-5 h-5" />} placeholder="Mail" type="email" htmlFor="email" label="Email" value={correo} onChange={(e) => setCorreo(e.target.value)}></InputIconLabel>
                <SelectLabel options={optionsSelect} placeholder="Seleccione su genero" htmlFor="email" label="Género" value={genero} onChange={(value) => setGenero(value)}/>
                <InputLabel type="date" placeholder="Ingrese la fecha de nacimiento" htmlFor="date" label="Fecha de nacimiento" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)}/>
                <InputLabel type="password" placeholder="" htmlFor="password" label="Contraseña" value={contrasenha} onChange={(e) => setContrasenha(e.target.value)}/>
                <Button variant="primary"size="md" className="my-4" onClick={handleCrearUsuario}>Crear Usuario</Button>
            </FormContainer> */