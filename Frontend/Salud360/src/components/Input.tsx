import { Input as ShadInput} from "@/components/ui/input"

interface Props{
    type?: string;
    placeholder?: string;
    leftPadding?: string;
    value?: string;
    className?: string;
    disabled?: boolean;
    readOnly?: boolean;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

function Input({type= "text", placeholder="", leftPadding="", value="", className="", disabled=false,readOnly = false, onChange = () => {}}: Props){
    return(
        <ShadInput type={type} placeholder={placeholder} className={`border-[#6A6262] border-2 rounded-[5px] py-5 px-4 ${leftPadding} ${className}`} value={value} disabled={disabled} readOnly={readOnly} onChange={onChange}/>
    );
}

//Para tipo agregar, ejemplo: type="email"
//Para placeholder agregar, ejemplo: type="Email"
//type= "text", placeholder="" van a dar estos valores por defecto en caso exista un error al pasar los valores (el props)

//Para cambiar el color del borde: border-gray-600 o border-[#6A6262]
//Para darle grosor al borde: border-2
//Para hacer el borde redondo: rounded-[5px]
//Para agregarle padding (el espacio interior): p-5

//Ese leftPadding? del props es para el caso en el que coloquemos visualmente íconos dentro del input. Funciona como un condicional y debe de recibir el left padding a aplicarse

//Para

export default Input;