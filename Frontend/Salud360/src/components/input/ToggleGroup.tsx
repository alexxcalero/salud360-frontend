import { cn } from "@/lib/utils";
//import { useState } from "react";

/*interface SingleProps {
  type: "single";
  value?: string;
  onValueChange?: (value: string) => void;
  options: {
    value: string;
    conten: string;
  }[];
}*/
interface MultipleProps {
  type: "multiple";
  value: string[];
  onValueChange: (value: string[]) => void;
  options: {
    value: string;
    content: string;
  }[];
}

type Props = MultipleProps;
//rb type,
const ToggleGroup = ({  value, onValueChange, options }: Props) => {
  const toggleValue = (v: string) => {
    if (value.includes(v)) {
      onValueChange(value.filter((item) => item !== v));
    } else {
      onValueChange([...value, v]);
    }
  };

  return (
    <div className="border-neutral-400 border-1 w-max rounded-lg overflow-hidden">
      {options.map((opt) => (
        <button
          key={opt.value}
          className={cn(
            "w-auto px-2 py-1 hover:bg-neutral-100",
            value.includes(opt.value) && "bg-neutral-200"
          )}
          onClick={() => toggleValue(opt.value)}
        >
          {opt.content}
        </button>
      ))}
    </div>
  );
};

export default ToggleGroup;
