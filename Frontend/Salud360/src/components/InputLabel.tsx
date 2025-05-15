import Input from './Input';
import Label from './Label';

interface Props{
    type?: string;
    placeholder?: string;
    htmlFor: string;
    label: React.ReactNode;
    value?: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement>
}

function InputLabel({type, placeholder, htmlFor, label, value, onChange}: Props){
    return(
        <div>
            <Label htmlFor={htmlFor}> {label} </Label>
            <Input type={type} placeholder={placeholder} value={value} onChange={onChange}></Input>
        </div>
    );
}

export default InputLabel;