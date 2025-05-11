import Button from "@/components/Button";
import FormContainer from "@/components/FormContainer";
import InputIconLabel from "@/components/InputIconLabel";
import InputLabel from "@/components/InputLabel";
import SelectLabel from "@/components/SelectLabel";
import { Mail, Phone } from "lucide-react";


interface Props{

    title?: string
    subtitle?: string;

    nombres: string;
    setNombres?: (val: string) => void;

    apellidos: string;
    setApellidos?: (val: string) => void;

    DNI: string;
    setDNI?: (val: string) => void;

    telefono: string;
    setTelefono?: (val: string) => void;

    correo: string;
    setCorreo?: (val: string) => void;

    rol: string;
    setRol?: (val: string) => void;

    genero: string;
    setGenero?: (val: string) => void;

    fechaNacimiento: string;
    setFechaNacimiento?: (val: string) => void;

    contrasenha: string;
    setContrasenha?: (val: string) => void;

    readOnly?: Boolean;
    onSubmit?: () => void;
    buttonText?: string;
}

function UsuariosForms({title="", subtitle="", nombres, setNombres = () =>{}, apellidos, setApellidos = () =>{}, DNI, setDNI  = () =>{}, telefono, setTelefono  = () =>{}, correo, setCorreo  = () =>{}, 
    rol, setRol  = () =>{}, genero, setGenero  = () =>{}, fechaNacimiento, setFechaNacimiento  = () =>{}, contrasenha, setContrasenha  = () =>{}, readOnly = false, onSubmit = () =>{}, buttonText}: Props){
    
        
    const optionsSelect = [
        { value: "Hombre", content: "Hombre" },
        { value: "Mujer", content: "Mujer" },
        { value: "Rodrigo Roller", content: "Rodrigo Roller" }]

    return(
        <FormContainer>
            <h1>{title}</h1>
            <h2>{subtitle}</h2>
            <InputLabel type="email" placeholder="Ingrese los nombres" htmlFor="email" label="Nombres" value={nombres} onChange={(e) => setNombres(e.target.value)}/>
            <InputLabel type="email" placeholder="Ingrese los apellidos" htmlFor="email" label="Apellidos" value={apellidos} onChange={(e) => setApellidos(e.target.value)}/>
            <InputLabel type="email" placeholder="Ingrese el número de documento de identidad" htmlFor="email" label="DNI" value={DNI} onChange={(e) => setDNI(e.target.value)}/>
            <InputIconLabel icon={<Phone className="w-5 h-5" />} placeholder="Teléfono" type="tel" htmlFor="tel" label="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} ></InputIconLabel>
            <SelectLabel options={optionsSelect} placeholder="Seleccione el rol" htmlFor="email" label="Rol" value={rol} onChange={(value) => setRol(value)}/>
            <InputIconLabel icon={<Mail className="w-5 h-5" />} placeholder="Mail" type="email" htmlFor="email" label="Email" value={correo} onChange={(e) => setCorreo(e.target.value)}></InputIconLabel>
            <SelectLabel options={optionsSelect} placeholder="Seleccione su genero" htmlFor="email" label="Género" value={genero} onChange={(value) => setGenero(value)}/>
            <InputLabel type="date" placeholder="Ingrese la fecha de nacimiento" htmlFor="date" label="Fecha de nacimiento" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)}/>
            <InputLabel type="password" placeholder="" htmlFor="password" label="Contraseña" value={contrasenha} onChange={(e) => setContrasenha(e.target.value)}/>
            {!readOnly && (<Button variant="primary"size="md" className="my-4" onClick={onSubmit}>{buttonText}</Button>)} {/* Utilizar && es común en JS. Si readOnly es true, se renderiza. Si no, no*/}
        </FormContainer>
    );
}

export default UsuariosForms