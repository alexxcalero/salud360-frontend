import { Button as ShadButton} from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props{
    children: React.ReactNode;
    variant?: "primary" | "outline" | "danger";
    className?: string;
    type?: "button" | "submit" | "reset";
}

function Button({children, variant = "primary", className="", type="button"}: Props){
    const base = "px-4 py-2 text-sm font-semibold rounded-md";
    const variants = {
        primary: "bg-[#2A86FF] text-white hover:bg-blue-600",
        outline: "border border-[#2A86FF] text-[#2A86FF] hover:bg-blue-50",
        danger: "bg-red-500 text-white hover:bg-red-600"
    }
    
    return(
        <ShadButton type={type} className={cn(base, variants[variant], className)}>{children}</ShadButton>
    );
}


/*return(
        <ShadButton className="bg-[#2A86FF]">Hola</ShadButton>
    ); */

export default Button;