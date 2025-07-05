import { Button as ShadButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "danger" | "outlineDanger" | "white";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

function Button({
  children,
  size = "sm",
  variant = "primary",
  className = "",
  type = "button",
  onClick = () => {},
  disabled,
}: Props) {
  const base = "px-4 py-2 text-sm font-semibold rounded-md cursor-pointer";
  const variants = {
    primary: "bg-[#2A86FF] text-white hover:bg-blue-600",
    outline: "bg-black text-white hover:bg-gray-700",
    //outline: "border border-[#2A86FF] text-[#2A86FF] hover:bg-blue-50",
    danger: "bg-red-500 text-white hover:bg-red-700",
    outlineDanger:
      "text-red-500 border border-red-500 bg-white hover:bg-red-50",
    white: "bg-white text-[#2A86FF] border border-[#2A86FF] hover:bg-gray-100",
  };
  const sizes = {
    sm: "px-3 py-1 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-4 text-base",
  };

  return (
    <ShadButton
      type={type}
      className={cn(base, sizes[size], variants[variant], className)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </ShadButton>
  );
}

/*return(
        <ShadButton className="bg-[#2A86FF]">Hola</ShadButton>
    ); */

export default Button;
