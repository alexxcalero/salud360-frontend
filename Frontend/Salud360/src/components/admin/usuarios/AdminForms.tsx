import Button from "@/components/Button";
//import DropImage from "@/components/DropImage";
//import FormContainer from "@/components/FormContainer";
import InputIconLabel from "@/components/InputIconLabel";
import InputLabel from "@/components/InputLabel";
import SelectLabel from "@/components/SelectLabel";
import { baseAPI } from "@/services/baseAPI";
import { Mail, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";


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

    genero: string;
    setGenero?: (val: string) => void;

    contrasenha?: string;
    setContrasenha?: (val: string) => void;

    onSubmit?: () => void;
}

//rb r title="", subtitle="",
function AdminForms({ nombres, setNombres = () =>{}, apellidos, setApellidos = () =>{}, tipoDoc, setTipoDoc = () =>{}, DNI, setDNI  = () =>{}, telefono, setTelefono  = () =>{}, correo, setCorreo  = () =>{},  
    genero, setGenero  = () =>{}, contrasenha, setContrasenha  = () =>{}, onSubmit = () =>{}}: Props){
    // rb r roles,
    const [_roles, setRoles] = useState<any[]>([]);
    const [tipoDocumentos, setTipoDocumentos] = useState([]);
    //const [tipoDocumentos, setTipoDocumentos] = useState([]);
    const navigate = useNavigate();
    
    //Llamada Roles
    const fetchRoles = () => {
    baseAPI.get("/admin/roles", {
      auth: {
        username: "admin",
        password: "admin123"
      }
    })
      .then(res => {
        //console.log("Datos cargados:", res.data); // VER ESTO EN LA CONSOLA
        
        const opciones = res.data.map((rolX: any) => ({
            value: rolX.idRol,
            content: rolX.nombre
        }))

        setRoles(opciones)
        //console.log("Roles:", opciones);
      })
      .catch(err => console.error("Error cargando roles", err));
    }
    useEffect(() => {
        fetchRoles();
    }, []);

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

    //console.log("Genero en UsuarioForms:", genero);

    /*const optionsSelect = [
        { value: "Homb", content: "Hombre" },
        { value: "Muj", content: "Mujer" },
        { value: "Rodrigo Rol", content: "Rodrigo Roller" }]*/

    return(
            <section className="w-full px-20 py-14 text-left">
                <h1 className="text-4xl font-bold mb-2">Registrar Administrador</h1>
                <h2 className="text-lg text-gray-700 mb-6">Rellene los siguientes campos para completar el registro del usuario.</h2>

                <div className="grid grid-cols-2 gap-8 items-center w-full my-6">
                    <div className="col-span-1 flex flex-col gap-6">
                        <InputLabel type="email" placeholder="Ingrese los nombres" htmlFor="email" label="Nombres" value={nombres} required={true} onChange={(e) => setNombres(e.target.value)}/>
                        <InputLabel type="email" placeholder="Ingrese los apellidos" htmlFor="email" label="Apellidos" value={apellidos}  required={true} onChange={(e) => setApellidos(e.target.value)}/>
                        <SelectLabel options={tipoDocumentos} placeholder="Seleccione el tipo de documento " htmlFor="email" label="Tipo de Documento" value={tipoDoc}  required={true } onChange={(value) => setTipoDoc(value)}/>
                        <InputLabel type="password" placeholder="Ingrese la contraseña" htmlFor="password" label="Contraseña" value={contrasenha} disabled={false} required={true } onChange={(e) => setContrasenha(e.target.value)}/>
                    </div>
                    <div className="col-span-1 flex flex-col gap-6">
                        <InputIconLabel icon={<Mail className="w-5 h-5" />} placeholder="Mail" type="email" htmlFor="email" label="Email" value={correo}  required={true } onChange={(e) => setCorreo(e.target.value)}></InputIconLabel>
                        <InputIconLabel icon={<Phone className="w-5 h-5" />} placeholder="Teléfono" type="text" htmlFor="tel" label="Teléfono" value={telefono}  required={true } onChange={(e) => setTelefono(e.target.value)} ></InputIconLabel>
                        <SelectLabel options={sexo} placeholder="Seleccione su genero" htmlFor="email" label="Género" value={genero}  required={true } onChange={(content) => setGenero(content)}/>
                        <InputLabel type="email" placeholder="Ingrese el número de documento de identidad" htmlFor="email" label="DNI" value={DNI}  required={true } onChange={(e) => setDNI(e.target.value)}/>
                    </div>
                </div>

                <div className="flex flex-row justify-between">
                    <div className="">
                        <Button variant="primary" size="lg" className="my-4" onClick={() => navigate(-1)}>Volver</Button>
                    </div>

                    <div className="">
                        <Button variant="primary" size="lg" className="my-4" onClick={onSubmit}>Crear Administrador</Button>
                    </div>
                </div>

                
                
            </section>
        
    );
}

export default AdminForms;


{/*
    <div>
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
                    {! && (<Button variant="primary"size="md" className="my-4" onClick={onSubmit}>{buttonText}</Button>)} {/* Utilizar && es común en JS. Si  es true, se renderiza. Si no, no
                </div>
    
    */}