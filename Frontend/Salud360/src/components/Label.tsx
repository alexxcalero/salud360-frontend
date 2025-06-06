import { Label as ShadLabel} from "@/components/ui/label"

interface Props{
    htmlFor: string;
    children: React.ReactNode;
    required?: boolean
}

function Label({htmlFor, children, required = false}: Props){
    return(
        <ShadLabel htmlFor={htmlFor} className="mb-2">{children} {required && <span className="text-red-500">*</span>}</ShadLabel>
    );
}

//React.ReactNode Es un tipo especial en TypeScript que representa cualquier cosa que React pueda renderizar (recomendado por flexibilidad)

//Para ? agregar, ejemplo: htmlFor="email"

export default Label;