import { useState } from "react";
import Label from "./Label";
import Input from "./Input";
//rm b EyeOff,
import { Lock, Eye,   EyeClosed } from "lucide-react";

interface Props {
  htmlFor: string;
  label: string;
  name: string;
  value?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

function InputPasswordLabel({htmlFor, label, value, onChange, required = false, placeholder = "Ingrese su contraseña", disabled = false, }: Props) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <Label htmlFor={htmlFor} required={required}>
        {label}
      </Label>
      <div className="relative flex items-center">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
          <Lock className="w-5 h-5" />
        </span>
        <Input
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          leftPadding="pl-10"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
        >
          {visible ? <EyeClosed className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}

export default InputPasswordLabel;
