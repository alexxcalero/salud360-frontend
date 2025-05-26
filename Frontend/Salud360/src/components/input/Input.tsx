import { Input } from "@/components/ui/input";
import { HTMLInputTypeAttribute, useState } from "react";
import { GenericInputProps } from "./genericInput";

interface Props extends GenericInputProps {
  type?: HTMLInputTypeAttribute;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const UnifiedInput = ({
  type,
  placeholder = "Ingrese su texto aquí",
  leftIcon,
  rightIcon,
  idName,
  label,
  defaultValue,
  className,
  disabled,
  onChange = () => {},
  required,
}: Props) => {
  const [value, setValue] = useState(defaultValue);

  return (
    <div>
      {label && (
        <label
          htmlFor={idName}
          className="block text-sm text-left font-medium text-gray-700 mb-2 w-max"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {/* Este es el campo del input */}
      <label
        htmlFor={idName}
        className={`relative flex border-[#6A6262] border-2 rounded-[5px] py-0 px-2 gap-2 items-center focus-within:border-blue-500 group ${
          required && value === "" && "border-red-400"
        } ${disabled && "border-neutral-300 bg-neutral-50"} ${className}`}
      >
        {leftIcon && (
          <span className={`${disabled && "text-neutral-300"}`}>
            {leftIcon}
          </span>
        )}
        <Input
          id={idName}
          name={idName}
          type={type}
          placeholder={placeholder}
          className="px-0 border-0 outline-none focus:ring-0 focus:border-0 active:border-0 focus-visible:border-0 focus-visible:outline-none focus-visible:shadow-none focus-visible:ring-0"
          value={value}
          required={required}
          disabled={disabled}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
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
      {required && value === "" && (
        <p className="text-label-medium text-red-400 mt-1 w-max">
          Complete este campo
        </p>
      )}
    </div>
  );
};

export default UnifiedInput;
