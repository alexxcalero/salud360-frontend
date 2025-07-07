import Button from "@/components/Button";
//import Checkbox from "@/components/Checkbox";
import DropImage from "@/components/DropImage";
import InputLabel from "@/components/InputLabel";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useRef } from "react";
import { baseAPI } from "@/services/baseAPI";

interface Servicio {
  idServicio: number;
  nombre: string;
}

interface Props{
    title?: string
    subtitle?: string;

    nombre: string;
    setNombre?: (val: string) => void;

    telefono: string;
    setTelefono?: (val: string) => void;

    descripcion: string;
    setDescripcion?: (val: string) => void;

    direccion: string;
    setDireccion?: (val: string) => void;    

    tipo: string;
    setTipo?: (val: string) => void;

    servicios: number | null;//localesSeleccionados
    setServicios?: (val: number) => void;

    aforo?: number;

    readOnly?: boolean;
    onSubmit?: () => void;
    buttonText?: string;

    //Para la imagen
    onImagenSeleccionada?: (file: File) => void;
    imagenActual?: string | null;
}

function LocalesForms({title, subtitle, nombre, setNombre = () =>{}, telefono, setTelefono = () =>{}, descripcion, setDescripcion = () =>{}, 
    direccion, setDireccion = () =>{}, tipo, setTipo = () =>{}, servicios, setServicios = () => {}, aforo = 0, readOnly = false, onSubmit = () =>{}, buttonText,onImagenSeleccionada = () => {},imagenActual = null}: Props){

    const [serviciosDisponibles, setServiciosDisponibles] = useState<Servicio[]>([]);

    //console.log("en LocalesForms los servicios del props son:", servicios)

    //Llamada Locales
    const fetchServicios = () => {
    baseAPI.get("/servicios", {
      auth: {
        username: "admin",
        password: "admin123"
      }
    })
      .then(res => {
        //console.log("Datos cargados:", res.data); // VER ESTO EN LA CONSOLA

        setServiciosDisponibles(res.data)
        //console.log("Servicios:", serviciosDisponibles);
      })
      .catch(err => console.error("Error cargando servicios", err));
    }
    useEffect(() => {
        fetchServicios();
    }, []);

    const navigate = useNavigate();

    //PARA LA IMAGEN RELACIONAD AL LOCAL
    const [imagenSeleccionada, setImagenSeleccionada] = useState<File | null>(null); 
    const imagenInputRef = useRef<HTMLInputElement>(null); 
    
    const handleImagenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagenSeleccionada(file); 
      onImagenSeleccionada(file); 
    }
    };
    
    //console.log("Disponibles:", serviciosDisponibles);
    //console.log("IDs seleccionados:", servicios);
        
    return (
        <div className="w-full px-10 py-6">
        <h1 className="text-4xl font-bold mb-2">{title}</h1>
        <h2 className="text-lg text-gray-700 mb-6">{subtitle}</h2>
        
        {readOnly &&
            (
                <p className="text-md text-gray-800 mb-6">
                Aforo máximo del local: <span className="font-semibold">{aforo}</span> personas.
                </p>
            )
        }
        
        

        <div className="grid grid-cols-2 gap-8 items-center w-full">
            <div className="col-span-1 flex flex-col gap-4">
                <InputLabel placeholder="Ingrese el nombre" label="Nombre" htmlFor="nombre" value={nombre} required={true && !readOnly} onChange={(e) => setNombre(e.target.value)} disabled={readOnly} />
                <InputLabel placeholder="Ingrese el telefono" label="Telefono" htmlFor="nombre" value={telefono} required={true && !readOnly} onChange={(e) => setTelefono(e.target.value)} disabled={readOnly} />
            </div>
            <div className="col-span-1 flex flex-col gap-4">
                <InputLabel placeholder="Ingrese la dirección" label="Dirección" htmlFor="nombre" value={direccion} required={true && !readOnly} onChange={(e) => setDireccion(e.target.value)} disabled={readOnly} />
                <InputLabel placeholder="Ingrese el tipo de servicio" label="Tipo" htmlFor="tipo" value={tipo} required={true && !readOnly} onChange={(e) => setTipo(e.target.value)} disabled={readOnly} />
            </div>
        </div>

        <div className="flex flex-col gap-16 mt-4 mb-12">
            <div className="w-full h-48 rounded-md flex flex-col items-center justify-center cursor-pointer">
                <InputLabel type="text" placeholder="Ingrese la descripción" htmlFor="text" label="Descripción" value={descripcion} disabled={readOnly} required={true && !readOnly} className="w-full h-full" onChange={(e) => setDescripcion(e.target.value)}/>
            </div>
        </div>

        <div className="mt-6">
            <p className="font-semibold mb-2">{readOnly ? "Servicio" : "Seleccione el servicio" } asociado al local: {!readOnly && <span className="text-red-500">*</span>} </p>
            <div className="bg-gray-100 p-4 rounded-md">
            {serviciosDisponibles.map((servicio) => (
            <div key={servicio.idServicio} className="flex items-center space-x-2">
                <input
                type="radio"
                id={`local-${servicio.idServicio}`}
                name="servicio" // mismo "name" para que actúe como grupo de radio
                checked={servicios === servicio.idServicio}
                onChange={() => setServicios(servicio.idServicio)}
                disabled={readOnly}
                />
                <label htmlFor={`local-${servicio.idServicio}`} className="text-sm text-gray-800">
                {servicio.nombre}
                </label>
            </div>
            ))}
            </div>
        </div>

       <div className="my-6">
            {!readOnly && (
            <DropImage
                onFileSelect={(file) => {
                setImagenSeleccionada(file);
                onImagenSeleccionada?.(file);
                }}
                previewUrl={imagenSeleccionada ? URL.createObjectURL(imagenSeleccionada) : imagenActual ? `http://localhost:8080/api/archivo/${imagenActual}` : undefined}
            />
            )}
        </div>

        {!readOnly && (
            <div className="flex gap-4 mt-6">
                <Button variant="primary" size="md" onClick={() => navigate(-1)}>Volver</Button>
                <div className="ml-auto">
                    <Button variant="primary" size="md" onClick={onSubmit}>
                    {buttonText}
                    </Button>
                </div>
            </div>
        )}
        </div>
    );
}

export default LocalesForms;