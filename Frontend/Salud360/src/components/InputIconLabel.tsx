import InputIcon from './InputIcon';
import Label from './Label';

interface Props{
    icon: React.ReactNode;
    type?: string;
    placeholder?: string;
    htmlFor: string;
    label: React.ReactNode;
    value?: string;
    disabled?: boolean;
    required?: boolean;
    onChange?: React.ChangeEventHandler<HTMLInputElement>
}

function InputIconLabel({icon, type= "text", placeholder="", htmlFor, label, value, disabled, required, onChange}: Props){
    return(
        <div>
            <Label htmlFor={htmlFor} required={required}> {label} </Label>
            <InputIcon icon={icon} placeholder={placeholder} type={type} value={value} disabled={disabled} onChange={onChange}></InputIcon>
        </div>
    );
}

export default InputIconLabel;