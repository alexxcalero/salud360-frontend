import { cn } from "@/lib/utils";

interface InfoCardProps {
  title: string;
  text: string | React.ReactNode;
  className?: string; 
}

function InfoCard({ title, text, className }: InfoCardProps) {
  return (
    <div className={cn("bg-gray-50 rounded shadow p-4 text-black", className)}>
      <h3 className="use-title-small mb-2 text-left">{title}</h3>
      <div className="use-body-small whitespace-pre-line">{text}</div>
    </div>
  );
}

export default InfoCard;
