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
}

function SelectLabel({options, placeholder="", htmlFor, label}: Props){
    return(
        <div>
            <Label htmlFor={htmlFor}> {label} </Label>
            <Select options={options} placeholder={placeholder}></Select>
        </div>
    );
}

export default SelectLabel;