import Button from "@/components/Button";
import DropImage from "@/components/DropImage";
//import FormContainer from "@/components/FormContainer";
//import InputIconLabel from "@/components/InputIconLabel";
import InputLabel from "@/components/InputLabel";
import SelectLabel from "@/components/SelectLabel";
import { baseAPI } from "@/services/baseAPI";
//import { Mail, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

//import { Input as ShadInput} from "@/components/ui/input";
//import { Label as ShadLabel} from "@/components/ui/label";

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

    especialidad: string;
    setEspecialidad?: (val: string) => void;

    genero: string;
    setGenero?: (val: string) => void;

    descripcion: string;
    setDescripcion?: (val: string) => void;

    readOnly?: boolean;
    onSubmit?: () => void;
    buttonText?: string;

    //Para la imagen
    onImagenSeleccionada?: (file: File) => void;
    imagenActual?: string | null;
}

function PersonalMedicoForms({title="", subtitle="", nombres, setNombres = () =>{}, apellidos, setApellidos = () =>{}, tipoDoc, setTipoDoc = () =>{}, DNI, setDNI  = () =>{}, 
    especialidad, setEspecialidad  = () =>{}, genero, setGenero  = () =>{}, descripcion, setDescripcion = () =>{}, 
    readOnly = false, onSubmit = () =>{}, buttonText, onImagenSeleccionada = () => {},imagenActual = null}: Props){
    
    const [tipoDocumentos, setTipoDocumentos] = useState([]);
    const [imagenSeleccionada, setImagenSeleccionada] = useState<File | null>(null);
    
    const navigate = useNavigate();

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
                        <InputLabel type="email" placeholder="Ingrese los nombres" htmlFor="email" label="Nombres" value={nombres} disabled={readOnly} required={true && !readOnly} onChange={(e) => setNombres(e.target.value)}/>
                        <InputLabel type="email" placeholder="Ingrese los apellidos" htmlFor="email" label="Apellidos" value={apellidos} disabled={readOnly} required={true && !readOnly} onChange={(e) => setApellidos(e.target.value)}/>
                        <SelectLabel options={tipoDocumentos} placeholder="Seleccione el tipo de documento" htmlFor="email" label="Tipo de Documento" value={tipoDoc} disabled={readOnly} required={true && !readOnly} onChange={(value) => setTipoDoc(value)}/>
                    </div>
                    <div className="col-span-1 flex flex-col gap-6">
                        <SelectLabel options={sexo} placeholder="Seleccione su genero" htmlFor="email" label="Género" value={genero} disabled={readOnly} required={true && !readOnly} onChange={(content) => setGenero(content)}/>
                        <InputLabel type="email" placeholder="Ingrese el número de documento de identidad" htmlFor="email" label="DNI" value={DNI} disabled={readOnly} required={true && !readOnly} onChange={(e) => setDNI(e.target.value)}/>
                        <InputLabel type="text" placeholder="Ingrese la especialidad" htmlFor="text" label="Especialidad" value={especialidad} disabled={readOnly} required={true && !readOnly} onChange={(e) => setEspecialidad(e.target.value)}/>
                    </div>
                </div>

                <div className="flex flex-col gap-16">
                    <div className="w-full h-48 rounded-md flex flex-col items-center justify-center cursor-pointer">
                        <InputLabel type="text" placeholder="Ingrese la descripción" htmlFor="text" label="Descripción" value={descripcion} disabled={readOnly} className="w-full h-full" required={true && !readOnly} onChange={(e) => setDescripcion(e.target.value)}/>
                    </div>
                    
            <div className="my-6">
                  {!readOnly && (
                  <DropImage
                    onFileSelect={(file) => {setImagenSeleccionada(file);onImagenSeleccionada?.(file);}}
                    previewUrl={imagenSeleccionada ? URL.createObjectURL(imagenSeleccionada): imagenActual? 
                        `http://localhost:8080/api/archivo/${imagenActual}` : undefined }
                    />
                  )}
              </div>

                    
                </div>

                <div className="flex flex-row justify-between">
                    <div className={readOnly ? "mt-5" : ""}>
                        <Button variant="primary" size="lg" className="my-4" onClick={() => navigate(-1)}>Volver</Button>
                    </div>

                    <div className="">
                        {!readOnly && (<Button variant="primary" size="lg" className="my-4" onClick={onSubmit}>{buttonText}</Button>)}
                    </div>
                </div>

                
                
            </section>
        
    );
}

export default PersonalMedicoForms;