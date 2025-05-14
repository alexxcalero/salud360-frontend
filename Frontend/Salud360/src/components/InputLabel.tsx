interface InputLabelProps {
  label: string;
  htmlFor: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean; // <-- AÑADIR ESTA LÍNEA
}

function InputLabel({ label, htmlFor, value, onChange, readOnly = false }: InputLabelProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor={htmlFor} className="text-sm font-semibold mb-1">
        {label}
      </label>
      <input
        type="text"
        id={htmlFor}
        value={value}
        onChange={onChange}
        readOnly={readOnly} // <-- AÑADIR ESTA LÍNEA
        className="border p-2 rounded"
      />
    </div>
  );
}

export default InputLabel;