import Button from "./Button";
import { cn } from "@/lib/utils";

interface Props{
    icon: React.ReactNode;
    children: React.ReactNode;
    variant?: "primary" | "outline" | "danger";
    size?: "sm" | "md" | "lg";
    className?: string;
    type?: "button" | "submit" | "reset";
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

function ButtonIcon({icon, children, size, variant, className, type, onClick}: Props){
    
    let padding = "";

    switch(size){
        case "sm":
            padding = "pl-10";
            break;
        case "md":
            padding = "pl-12";
            break; 
        case "lg":
            padding = "pl-14";
            break; 
        default:
            padding = "pl-10";

    }

    return(
        //Estoy dejando el text-white porque no sé como colocar el color del texto

        <div className='relative w-fit'>
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white"> 
                {icon}
            </span>
            <Button variant={variant} size={size} className={cn(className, padding)} type={type} onClick={onClick}>{children}</Button>
        </div>
    );
}

export default ButtonIcon;