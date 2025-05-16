import Input from './Input';

interface Props{
    icon: React.ReactNode;
    type?: string;
    placeholder?: string;
    value?: string;
    disabled?: boolean;
    onChange?: React.ChangeEventHandler<HTMLInputElement>
}

function InputIcon({icon, type="text", placeholder="", value="", disabled=false, onChange}: Props){
    return(
        <div className='relative w-full'>
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                {icon}
            </span>
            <Input type={type} placeholder={placeholder} leftPadding="pl-10" value={value} disabled={disabled} onChange={onChange}></Input>
        </div>
    )
}

export default InputIcon;