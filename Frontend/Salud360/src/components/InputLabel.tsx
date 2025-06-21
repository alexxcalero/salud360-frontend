import Input from './Input';
import Label from './Label';

interface Props{
    type?: string;
    placeholder?: string;
    htmlFor: string;
    label: React.ReactNode;
    value?: string;
    className?: string;
    disabled?: boolean;
    required? : boolean;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    readOnly?: boolean;
}

function InputLabel({type, placeholder, htmlFor, label, value="", className, disabled=false, required, onChange, readOnly = false}: Props){
    return(
        <div className='w-full h-full'> {/*SI ALGO SE ROMPE, ELIMINAR EL CLASSNAME */}
            <Label htmlFor={htmlFor} required={required}> {label} </Label>
            <Input type={type} placeholder={placeholder} value={value} onChange={onChange} disabled={disabled} className={className} readOnly={readOnly}></Input>
        </div>
    );
}

export default InputLabel;