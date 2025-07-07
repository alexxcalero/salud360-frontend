import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import DropImage from "@/components/DropImage";
import InputLabel from "@/components/InputLabel";
import { baseAPI } from "@/services/baseAPI";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

interface Local {
  idLocal: number;
  nombre: string;
  // puedes agregar más campos si los usas
}

interface Props{
    title?: string
    subtitle?: string;

    nombre: string;
    setNombre?: (val: string) => void;

    descripcion: string;
    setDescripcion?: (val: string) => void;

    tipo: string;
    setTipo?: (val: string) => void;

    locales?: number[] | null;//localesSeleccionados
    setLocales?: (val: number[]) => void;

    readOnly?: boolean;
    onSubmit?: () => void;
    buttonText?: string;

    onImagenSeleccionada?: (file: File) => void; 
    imagenSeleccionada?: File | null; 
    imagenActual?: string | null; 
}

function ServiciosForm({title, subtitle, nombre, setNombre = () =>{}, descripcion, setDescripcion = () =>{},
    tipo, setTipo = () =>{}, locales=null, setLocales = () => {}, readOnly = false, onSubmit = () =>{}, buttonText,onImagenSeleccionada,imagenSeleccionada,imagenActual  }: Props){

    const [localesDisponibles, setLocalesDisponibles] = useState<Local[]>([]);

    //console.log("en ServiciosForms los locales del props son:", locales)

    //Llamada Locales
    const fetchLocales = () => {
    baseAPI.get("/locales", {
      auth: {
        username: "admin",
        password: "admin123"
      }
    })
      .then(res => {
        //console.log("Datos cargados:", res.data); // VER ESTO EN LA CONSOLA

        setLocalesDisponibles(res.data)
        //console.log("Locales:", localesDisponibles);
      })
      .catch(err => console.error("Error cargando roles", err));
    }
    useEffect(() => {
        fetchLocales();
    }, []);

    const navigate = useNavigate();

    const toggle = (id: number, selected: number[], setSelected: (val: number[]) => void) => {
        if (readOnly) return;
        setSelected(
        selected.includes(id)
            ? selected.filter(item => item !== id)
            : [...selected, id]
        );
    };
        
    return (
        <div className="w-full px-10 py-6">
        <h1 className="text-4xl font-bold mb-2">{title}</h1>
        <h2 className="text-lg text-gray-700 mb-6">{subtitle}</h2>

        <div className="grid grid-cols-1 gap-4">
            <InputLabel placeholder="Ingrese el nombre" label="Nombre" htmlFor="nombre" value={nombre} required={true && !readOnly} onChange={(e) => setNombre(e.target.value)} disabled={readOnly} />
            <InputLabel placeholder="Ingrese la descripción" label="Descripción" htmlFor="descripcion" value={descripcion} required={true && !readOnly} onChange={(e) => setDescripcion(e.target.value)} disabled={readOnly} />
            <InputLabel placeholder="Ingrese el tipo de servicio" label="Tipo" htmlFor="tipo" value={tipo} required={true && !readOnly} onChange={(e) => setTipo(e.target.value)} disabled={readOnly} />
        </div>

        {locales && <div className="mt-6">
            <p className="font-semibold mb-2">Locales asociados al servicio:</p>
            <div className="bg-gray-100 p-4 rounded-md space-y-2">
            {localesDisponibles.map((local) => (
                <div key={local.idLocal} className="flex items-center space-x-2">
                <Checkbox
                    id={`local-${local.idLocal}`}
                    checked={locales.includes(local.idLocal)}
                    onChange={() => toggle(local.idLocal, locales, setLocales)}
                    disabled={readOnly}
                />
                <label htmlFor={`local-${local.idLocal}`} className="text-sm text-gray-800">
                    {local.nombre}
                </label>
                </div>
            ))}
            </div>
        </div>
        }


       <div className="my-6">
        {!readOnly && (
          <DropImage
            onFileSelect={(file) => onImagenSeleccionada?.(file)} // 🆕
            previewUrl={imagenSeleccionada? URL.createObjectURL(imagenSeleccionada): imagenActual || undefined } 
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

export default ServiciosForm;