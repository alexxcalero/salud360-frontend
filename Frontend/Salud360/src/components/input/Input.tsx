import { Input as ShadcnInput } from "@/components/ui/input";
import { forwardRef, HTMLInputTypeAttribute, useId, useState } from "react";
import Label from "../Label";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  //idName: string;
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
  maxLength?: number;
}

interface BaseProps extends InputProps {
  type?: HTMLInputTypeAttribute;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, BaseProps>(
  (
    {
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
      maxLength,
      ...props
    },
    ref
  ) => {
    const [value, setValue] =
      argValue !== undefined && argSetValue !== undefined
        ? [argValue, argSetValue]
        : useState(defaultValue);
    const [firstUpdate, setFirstUpdate] = useState(false);
    const id = useId();

    return (
      <div>
        {label && (
          <Label htmlFor={name} required={required}>
            {label}
          </Label>
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
          <ShadcnInput
            {...props}
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            className="px-0 border-0 outline-none focus:ring-0 focus:border-0 active:border-0 focus-visible:border-0 focus-visible:outline-none focus-visible:shadow-none focus-visible:ring-0"
            value={value}
            required={required}
            disabled={disabled}
            maxLength={maxLength}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setFirstUpdate(true);
              setValue(e.currentTarget.value);
              onChange(e);
            }}
            ref={ref}
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
  }
);

export default Input;
