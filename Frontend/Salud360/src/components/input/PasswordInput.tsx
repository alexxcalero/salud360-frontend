import { HTMLInputTypeAttribute, useRef, useState } from "react";
import Input from "./Input";
import { Check, Eye, EyeClosed, Lock, X } from "lucide-react";
import { InputProps } from "./Input";

interface Props extends InputProps {
  showRecommendations?: boolean;
}

const PasswordInput = (props: Props) => {
  const [type, setType] = useState<HTMLInputTypeAttribute>("password");
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const [validation, setValidation] = useState({
    "min-8-char": props.defaultValue?.length ?? 0 >= 8,
    "min-1-uppercase": /[A-Z]/.test(props.defaultValue ?? ""),
    "min-1-number": /[0-9]/.test(props.defaultValue ?? ""),
  });

  const togglePasswordVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (type === "password") {
      timeoutRef.current = setTimeout(() => setType("password"), 2000);
      setType("text");
    } else setType("password");
  };

  return (
    <div>
      <Input
        {...props}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (props.onChange !== undefined) props.onChange(e);
          setValidation({
            "min-8-char": e.currentTarget.value.length >= 8,
            "min-1-uppercase": /[A-Z]/.test(e.currentTarget.value),
            "min-1-number": /[0-9]/.test(e.currentTarget.value),
          });
        }}
        type={type}
        leftIcon={<Lock />}
        rightIcon={
          <button
            type="button"
            className="h-min"
            onClick={(e) => togglePasswordVisibility(e)}
          >
            {type === "password" ? <Eye /> : <EyeClosed />}
          </button>
        }
      />
      {props.showRecommendations && (
        <>
          <p
            className="text-label-medium text-red-400 mt-1 w-max data-[validate=true]:text-green-400"
            data-validate={validation["min-8-char"]}
          >
            {validation["min-8-char"] ? (
              <Check size={16} className="inline" />
            ) : (
              <X size={16} className="inline" />
            )}
            Debe tener al menos 8 caracteres
          </p>
          <p
            className="text-label-medium text-red-400 mt-1 w-max data-[validate=true]:text-green-400"
            data-validate={validation["min-1-uppercase"]}
          >
            {validation["min-1-uppercase"] ? (
              <Check size={16} className="inline" />
            ) : (
              <X size={16} className="inline" />
            )}
            Debe tener al menos una letra mayúscula
          </p>
          <p
            className="text-label-medium text-red-400 mt-1 w-max data-[validate=true]:text-green-400"
            data-validate={validation["min-1-number"]}
          >
            {validation["min-1-number"] ? (
              <Check size={16} className="inline" />
            ) : (
              <X size={16} className="inline" />
            )}
            Debe tener al menos una número
          </p>
        </>
      )}
    </div>
  );
};

export default PasswordInput;
