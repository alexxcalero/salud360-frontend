import Input from './Input';
import Label from './Label';

interface Props{
    type?: string;
    placeholder?: string;
    htmlFor: string;
    label: React.ReactNode;
}

function InputLabel({type="text", placeholder="", htmlFor, label}: Props){
    return(
        <div>
            <Label htmlFor={htmlFor}> {label} </Label>
            <Input type={type} placeholder={placeholder}></Input>
        </div>
    );
}

export default InputLabel;