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
    onChange?: (value: string) => void;
}

function SelectLabel({options, placeholder="", htmlFor, label, value, onChange}: Props){
    return(
        <div>
            <Label htmlFor={htmlFor}> {label} </Label>
            <Select options={options} placeholder={placeholder} value={value} onChange={onChange}></Select>
        </div>
    );
}

export default SelectLabel;