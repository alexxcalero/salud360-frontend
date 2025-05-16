import Input from './Input';
import Label from './Label';

interface Props{
    type?: string;
    placeholder?: string;
    htmlFor: string;
    label: React.ReactNode;
    value?: string,
    className?: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement>
}

function InputLabel({type, placeholder, htmlFor, label, value="", className, onChange}: Props){
    return(
        <div className='w-full h-full'> {/*SI ALGO SE ROMPE, ELIMINAR EL CLASSNAME */}
            <Label htmlFor={htmlFor}> {label} </Label>
            <Input type={type} placeholder={placeholder} value={value} onChange={onChange} className={className}></Input>
        </div>
    );
}

export default InputLabel;