import { useId, useState } from "react";
import styles from "./TextAreaInput.module.css";
import { cn } from "@/lib/utils";

export interface TextAreaInputProps {
  name: string;
  defaultValue?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  onChange?: (_: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  value?: string;
  setValue?: (_: string) => void;
  reserveSpace?: boolean;
}

const TextAreaInput = ({
  placeholder = "Ingrese su texto aquí",
  name,
  label,
  defaultValue,
  className,
  disabled,
  onChange = () => {},
  required,
  value: argValue,
  setValue: argSetValue,
  reserveSpace = false,
}: TextAreaInputProps) => {
  const [value, setValue] =
    argValue !== undefined && argSetValue !== undefined
      ? [argValue, argSetValue]
      : useState(defaultValue);
  const [firstUpdate, setFirstUpdate] = useState(false);
  const id = useId();

  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm text-left font-medium text-gray-700 mb-2 w-max"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {/* Este es el campo del TextAreaInput */}
      <label
        htmlFor={id}
        className={cn(
          "relative flex h-auto border-[#6A6262] border-2 rounded-[5px] py-2 px-2 gap-2 items-center focus-within:border-blue-500 group",
          required && value === "" && firstUpdate && "border-red-400",
          disabled && "border-neutral-300 bg-neutral-50",
          className
        )}
      >
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          className={cn(
            "px-0 w-full [field-sizing:content] border-0 outline-none max-h-33 focus:ring-0 focus:border-0 active:border-0 focus-visible:border-0 focus-visible:outline-none focus-visible:shadow-none focus-visible:ring-0",
            styles["textarea"],
            reserveSpace && "h-30"
          )}
          value={value}
          required={required}
          disabled={disabled}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setFirstUpdate(true);
            setValue(e.currentTarget.value);
            onChange(e);
          }}
        />
      </label>
      {required && value === "" && firstUpdate && (
        <p className="text-label-medium text-red-400 mt-1 w-max">
          Complete este campo
        </p>
      )}
    </div>
  );
};

export default TextAreaInput;
