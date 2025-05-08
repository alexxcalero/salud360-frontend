import InputIcon from './InputIcon';
import Label from './Label';

interface Props{
    icon: React.ReactNode;
    type?: string;
    placeholder?: string;
    htmlFor: string;
    label: React.ReactNode;
    value?: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement>
}

function InputIconLabel({icon, type= "text", placeholder="", htmlFor, label, value, onChange}: Props){
    return(
        <div>
            <Label htmlFor={htmlFor}> {label} </Label>
            <InputIcon icon={icon} placeholder={placeholder} type={type} value={value} onChange={onChange}></InputIcon>
        </div>
    );
}

export default InputIconLabel;