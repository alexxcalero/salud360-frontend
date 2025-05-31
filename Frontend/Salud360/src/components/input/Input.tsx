import { Input } from "@/components/ui/input";
import { HTMLInputTypeAttribute, useId, useState } from "react";

export interface InputProps {
  name: string;
  defaultValue?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  onChange?: (_: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  value?: string;
  setValue?: (_: string) => void;
}

interface BaseProps extends InputProps {
  type?: HTMLInputTypeAttribute;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const UnifiedInput = ({
  type,
  placeholder = "Ingrese su texto aquí",
  leftIcon,
  rightIcon,
  name,
  label,
  defaultValue,
  className,
  disabled,
  onChange = () => {},
  required,
  value: argValue,
  setValue: argSetValue,
}: BaseProps) => {
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
      {/* Este es el campo del input */}
      <label
        htmlFor={id}
        className={`relative flex border-[#6A6262] border-2 rounded-[5px] py-0 px-2 gap-2 items-center focus-within:border-blue-500 group ${
          required && value === "" && firstUpdate && "border-red-400"
        } ${disabled && "border-neutral-300 bg-neutral-50"} ${className}`}
      >
        {leftIcon && (
          <span className={`${disabled && "text-neutral-300"}`}>
            {leftIcon}
          </span>
        )}
        <Input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          className="px-0 border-0 outline-none focus:ring-0 focus:border-0 active:border-0 focus-visible:border-0 focus-visible:outline-none focus-visible:shadow-none focus-visible:ring-0"
          value={value}
          required={required}
          disabled={disabled}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFirstUpdate(true);
            setValue(e.currentTarget.value);
            onChange(e);
          }}
        />
        {rightIcon && (
          <span className={`${disabled && "text-neutral-300"}`}>
            {rightIcon}
          </span>
        )}
      </label>
      {required && value === "" && firstUpdate && (
        <p className="text-label-medium text-red-400 mt-1 w-max">
          Complete este campo
        </p>
      )}
    </div>
  );
};

export default UnifiedInput;
