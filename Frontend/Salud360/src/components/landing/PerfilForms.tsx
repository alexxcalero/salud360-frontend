import { Mail, MapPin, Phone } from "lucide-react";
import InputIconLabel from "../InputIconLabel";
import InputLabel from "../InputLabel";
import SelectLabel from "../SelectLabel";

import Button from "../Button";
import { useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";
import DropImage from "../DropImage";
import { AuthContext } from "@/hooks/AuthContext";
import { baseAPI } from "@/services/baseAPI";


interface Props{
    nombres: string;
    setNombres?: (val: string) => void;

    apellidos: string;
    setApellidos?: (val: string) => void;

    //tipoDocumentos: { value: string; content: string }[];
    tipoDoc: string;
    setTipoDoc?: (val: string) => void;

    DNI: string;
    setDNI?: (val: string) => void;

    telefono: string;
    setTelefono?: (val: string) => void;

    correo: string;
    setCorreo?: (val: string) => void;

    direccion: string;
    setDireccion?: (val: string) => void;

    //sexo: { value: string; content: string }[]
    genero: string;
    setGenero?: (val: string) => void;

    fechaNacimiento: string;
    setFechaNacimiento?: (val: string) => void;

    contrasenha?: string;
    setContrasenha?: (val: string) => void;

    onSubmit?: () => void;
}


function PerfilForms({nombres, setNombres = () =>{}, apellidos, setApellidos = () =>{}, tipoDoc, setTipoDoc = () =>{}, DNI, setDNI  = () =>{}, telefono, setTelefono  = () =>{}, correo, setCorreo  = () =>{}, 
    direccion, setDireccion  = () =>{}, genero, setGenero  = () =>{}, fechaNacimiento, setFechaNacimiento  = () =>{}, contrasenha, onSubmit = () =>{}}: Props){

    //const {logout} = useContext(AuthContext)

    
    const [tipoDocumentos, setTipoDocumentos] = useState([]);
    //const [tipoDocumentos, setTipoDocumentos] = useState([]);
    //const navigate = useNavigate();

    //Llamada TipoDocumentos
    const fetchTipoDocumentos = () => {
    baseAPI.get("/admin/tiposDocumentos", {
      auth: {
        username: "admin",
        password: "admin123"
      }
    })
      .then(res => {
        //console.log("Datos cargados:", res.data); // VER ESTO EN LA CONSOLA
        
        const opciones = res.data.map((tipoDocX: any) => ({
            value: tipoDocX.idTipoDocumento,
            content: tipoDocX.nombre
        }))

        setTipoDocumentos(opciones)
        //console.log("Tipo Documentos:", opciones);
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

    


    if (contrasenha !== undefined){
      //console.log("Estamos en el if:", contrasenha === undefined)
       
    }
    else{
      //console.log("Estamos en el else:", contrasenha === undefined)
      
      contrasenha = "xxxxxxxx";
    }

    //console.log("Genero en UsuarioForms:", genero);

    /*const optionsSelect = [
        { value: "Homb", content: "Hombre" },
        { value: "Muj", content: "Mujer" },
        { value: "Rodrigo Rol", content: "Rodrigo Roller" }]*/

    return(
        <>
            <section className="">
                <section className="grid grid-cols-2 justify-start place-items-stretch gap-4 mb-8">
                    <InputLabel type="name" placeholder="Ingrese los nombres" htmlFor="name" label="Nombres" value={nombres} required={true} onChange={(e) => setNombres(e.target.value)} />
                    <InputLabel type="name" placeholder="Ingrese los apellidos" htmlFor="name" label="Apellidos" value={apellidos} required={true} onChange={(e) => setApellidos(e.target.value)} />
                    <div className="col-span-full">
                        <InputIconLabel icon={<Mail className="w-5 h-5" />} placeholder="Mail" type="email" htmlFor="email" label="Email" value={correo} required={true} onChange={(e) => setCorreo(e.target.value)}></InputIconLabel>
                    </div>
                    <InputIconLabel icon={<Phone className="w-5 h-5" />} placeholder="Teléfono" type="tel" htmlFor="tel" label="Teléfono" value={telefono} required={true} onChange={(e) => setTelefono(e.target.value)} ></InputIconLabel>
                    <SelectLabel options={tipoDocumentos} placeholder="Seleccione el tipo de documento " htmlFor="email" label="Tipo de Documento" required={true} value={tipoDoc} onChange={(value) => setTipoDoc(value)}/>
                    <InputIconLabel icon={<MapPin className="w-5 h-5" />} placeholder="Dirección" type="address" htmlFor="address" label="Dirección" value={direccion} required={true} onChange={(e) => setDireccion(e.target.value)} ></InputIconLabel>
                    <InputLabel type="date" placeholder="Ingrese la fecha de nacimiento" htmlFor="date" label="Fecha de nacimiento" value={fechaNacimiento} required={true} onChange={(e) => setFechaNacimiento(e.target.value)} />
                    <SelectLabel options={sexo} placeholder="Seleccione su genero" htmlFor="email" label="Género" value={genero} required={true} onChange={(content) => setGenero(content)}/>
                    <InputLabel type="name" placeholder="Ingrese el número de documento de identidad" htmlFor="email" label="DNI" value={DNI} required={true} onChange={(e) => setDNI(e.target.value)} />
                </section>

                <Button type="submit" size="lg" onClick={onSubmit}>Aplicar cambios</Button>       

            </section>

            

            

        </>
        
    );
}

export default PerfilForms;
//PUNTO DE PARTIDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA