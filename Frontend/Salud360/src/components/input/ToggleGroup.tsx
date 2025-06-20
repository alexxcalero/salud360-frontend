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
    <div className="border-neutral-400 border-1 w-max rounded-full overflow-hidden">
      {options.map((opt, i) => (
        <button
          key={opt.value}
          className={`w-auto px-2 py-1 ${
            i !== 0 && "border-l-1 border-neutral-400"
          } ${
            value.includes(opt.value)
              ? "bg-blue-500 text-white hover:bg-blue-300"
              : "hover:bg-neutral-100"
          }`}
          onClick={() => toggleValue(opt.value)}
        >
          {opt.content}
        </button>
      ))}
    </div>
  );
};

export default ToggleGroup;
