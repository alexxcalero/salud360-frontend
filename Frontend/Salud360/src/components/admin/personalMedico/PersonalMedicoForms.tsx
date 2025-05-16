import Button from "@/components/Button";
import DropImage from "@/components/DropImage";
import FormContainer from "@/components/FormContainer";
import InputIconLabel from "@/components/InputIconLabel";
import InputLabel from "@/components/InputLabel";
import SelectLabel from "@/components/SelectLabel";
import axios from "axios";
import { Mail, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { Input as ShadInput} from "@/components/ui/input";
import { Label as ShadLabel} from "@/components/ui/label";

interface Props{

    title?: string
    subtitle?: string;

    nombres: string;
    setNombres?: (val: string) => void;

    apellidos: string;
    setApellidos?: (val: string) => void;

    tipoDoc: string;
    setTipoDoc?: (val: string) => void;

    DNI: string;
    setDNI?: (val: string) => void;

    telefono: string;
    setTelefono?: (val: string) => void;

    correo: string;
    setCorreo?: (val: string) => void;

    especialidad: string;
    setEspecialidad?: (val: string) => void;

    genero: string;
    setGenero?: (val: string) => void;

    fechaNacimiento: string;
    setFechaNacimiento?: (val: string) => void;

    contrasenha: string;
    setContrasenha?: (val: string) => void;

    descripcion: string;
    setDescripcion?: (val: string) => void;

    readOnly?: Boolean;
    onSubmit?: () => void;
    buttonText?: string;
}

function PersonalMedicoForms({title="", subtitle="", nombres, setNombres = () =>{}, apellidos, setApellidos = () =>{}, tipoDoc, setTipoDoc = () =>{}, DNI, setDNI  = () =>{}, telefono, setTelefono  = () =>{}, correo, setCorreo  = () =>{}, 
    especialidad, setEspecialidad  = () =>{}, genero, setGenero  = () =>{}, fechaNacimiento, setFechaNacimiento  = () =>{}, contrasenha, setContrasenha  = () =>{}, descripcion, setDescripcion = () =>{}, 
    readOnly = false, onSubmit = () =>{}, buttonText}: Props){
    
    const [tipoDocumentos, setTipoDocumentos] = useState([]);
    //const [tipoDocumentos, setTipoDocumentos] = useState([]);
    const navigate = useNavigate();

    //Llamada TipoDocumentos
    const fetchTipoDocumentos = () => {
    axios.get("http://localhost:8080/api/tiposDocumentos", {
      auth: {
        username: "admin",
        password: "admin123"
      }
    })
      .then(res => {
        console.log("Datos cargados:", res.data); // VER ESTO EN LA CONSOLA
        
        const opciones = res.data.map((tipoDocX: any) => ({
            value: tipoDocX.idTipoDocumento,
            content: tipoDocX.nombre
        }))

        setTipoDocumentos(opciones)
        console.log("Tipo Documentos:", opciones);
      })
      .catch(err => console.error("Error cargando tipo documentos", err));
    }
    useEffect(() => {
        fetchTipoDocumentos();
    }, []);

        
    const sexo = [
        { value: "Masculino", content: "Masculino" },
        { value: "Femenino", content: "Femenino" }
    ]

    

    /*const optionsSelect = [
        { value: "Homb", content: "Hombre" },
        { value: "Muj", content: "Mujer" },
        { value: "Rodrigo especialidad", content: "Rodrigo especialidadler" }]*/

    return(
            <section className="w-full px-20 py-14 text-left">
                <h1 className="text-4xl font-bold mb-2">{title}</h1>
                <h2 className="text-lg text-gray-700 mb-6">{subtitle}</h2>

                <div className="grid grid-cols-2 gap-8 items-center w-full my-6">
                    <div className="col-span-1 flex flex-col gap-6">
                        <InputLabel type="email" placeholder="Ingrese los nombres" htmlFor="email" label="Nombres" value={nombres} onChange={(e) => setNombres(e.target.value)}/>
                        <InputLabel type="email" placeholder="Ingrese los apellidos" htmlFor="email" label="Apellidos" value={apellidos} onChange={(e) => setApellidos(e.target.value)}/>
                        <SelectLabel options={tipoDocumentos} placeholder="Seleccione el tipo de documento" htmlFor="email" label="Tipo de Documento" value={tipoDoc} onChange={(value) => setTipoDoc(value)}/>
                        <InputIconLabel icon={<Phone className="w-5 h-5" />} placeholder="Teléfono" type="tel" htmlFor="tel" label="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} ></InputIconLabel>
                        <InputLabel type="password" placeholder="" htmlFor="password" label="Contraseña" value={contrasenha} onChange={(e) => setContrasenha(e.target.value)}/>
                    </div>
                    <div className="col-span-1 flex flex-col gap-6">
                        <InputIconLabel icon={<Mail className="w-5 h-5" />} placeholder="Mail" type="email" htmlFor="email" label="Email" value={correo} onChange={(e) => setCorreo(e.target.value)}></InputIconLabel>
                        <SelectLabel options={sexo} placeholder="Seleccione su genero" htmlFor="email" label="Género" value={genero} onChange={(content) => setGenero(content)}/>
                        <InputLabel type="email" placeholder="Ingrese el número de documento de identidad" htmlFor="email" label="DNI" value={DNI} onChange={(e) => setDNI(e.target.value)}/>
                        <InputLabel type="date" placeholder="Ingrese la fecha de nacimiento" htmlFor="date" label="Fecha de nacimiento" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)}/>
                        <InputLabel type="text" placeholder="Ingrese la especialidad" htmlFor="text" label="Especialidad" value={especialidad} onChange={(e) => setEspecialidad(e.target.value)}/>
                    </div>
                </div>

                <div className="flex flex-col gap-16">
                    <div className="w-full h-48 rounded-md flex flex-col items-center justify-center cursor-pointer">
                        <InputLabel type="text" placeholder="Ingrese la descripción" htmlFor="text" label="Descripción" value={descripcion} className="w-full h-full" onChange={(e) => setDescripcion(e.target.value)}/>
                    </div>
                    {!readOnly && <DropImage/>}
                </div>

                <div className="flex flex-row justify-between">
                    <div className="">
                        <Button variant="primary"size="md" className="my-4" onClick={() => navigate(-1)}>Volver</Button>
                    </div>

                    <div className="">
                        {!readOnly && (<Button variant="primary"size="md" className="my-4" onClick={onSubmit}>{buttonText}</Button>)}
                    </div>
                </div>

                
                
            </section>
        
    );
}

export default PersonalMedicoForms;