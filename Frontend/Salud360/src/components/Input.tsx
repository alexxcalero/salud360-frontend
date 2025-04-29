import { Input as ShadInput} from "@/components/ui/input"

interface Props{
    type?: string;
    placeholder?: string;
}

function Input({type= "text", placeholder=""}: Props){
    return(
        <ShadInput type={type} placeholder={placeholder} className="border-[#6A6262] border-2 rounded-[5px] py-5 px-4 w-full"/>
    );
}

//Para tipo agregar, ejemplo: type="email"
//Para placeholder agregar, ejemplo: type="Email"
//type= "text", placeholder="" van a dar estos valores por defecto en caso exista un error al pasar los valores (el props)

//Para cambiar el color del borde: border-gray-600 o border-[#6A6262]
//Para darle grosor al borde: border-2
//Para hacer el borde redondo: rounded-[5px]
//Para agregarle padding (el espacio interior): p-5
//Para
//Para

export default Input;