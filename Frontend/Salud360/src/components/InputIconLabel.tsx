import InputIcon from './InputIcon';
import Label from './Label';

interface Props{
    icon: React.ReactNode;
    type?: string;
    placeholder?: string;
    htmlFor: string;
    label: React.ReactNode;
}

function InputIconLabel({icon, type= "text", placeholder="", htmlFor, label}: Props){
    return(
        <div>
            <Label htmlFor={htmlFor}> {label} </Label>
            <InputIcon icon={icon} placeholder={placeholder} type={type}></InputIcon>
        </div>
    );
}

export default InputIconLabel;