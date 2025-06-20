import Select from "./Select";
import Label from './Label';

interface Option{
    value: string;
    content: string;
}

interface Props{
    options: Option[];
    placeholder?: string;
    htmlFor: string;
    label: React.ReactNode;
    value?: string;
    disabled?: boolean;
    required?: boolean;
    onChange?: (value: string) => void;
}

function SelectLabel({options, placeholder="", htmlFor, label, value, disabled, required, onChange}: Props){
    return(
        <div>
            <Label htmlFor={htmlFor} required={required}> {label} </Label>
            <Select options={options} placeholder={placeholder} value={value} disabled={disabled} onChange={onChange} required={required}></Select>
        </div>
    );
}

export default SelectLabel;