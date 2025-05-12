import Button from "./Button";
import { cn } from "@/lib/utils";

interface InfoCardProps {
  title: string;
  text: string | React.ReactNode;
  className?: string; 
}

function InfoCard({ title, text, className}: InfoCardProps) {
  const isPrincipios = title === "Principios";

  return (
    <div className={cn("bg-white rounded shadow p-4 text-black", className)}>
      <h3 className="use-title-small mb-2">{title}</h3>
      <div
        className={cn(
          "use-body-small whitespace-pre-line",
          isPrincipios && "leading-loose"
        )}
      >
        {text}
      </div>
    </div>
  );
}

export default InfoCard;
