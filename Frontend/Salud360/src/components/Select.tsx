import {
    Select as ShadSelect,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

interface Option {
    value: string;
    content: string;
}

interface Props {
    options: Option[];
    placeholder?: string;
    value?: string;
    disabled?: boolean
    required?: boolean
    onChange?: (value: string) => void;
}

function Select({options, placeholder="Selecciona una opción", value="", disabled=false, onChange = () => {}, required = false}: Props){
    return(
        <ShadSelect value={value} onValueChange={onChange} required={required}>
            <SelectTrigger disabled={disabled} className="border-[#6A6262] border-2 rounded-[5px] py-5 px-4 w-full">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.content}
                    </SelectItem>
                ))}
            </SelectContent>
        </ShadSelect>
    );
}

//placeholder="Selecciona una opción" va a dar este valor por defecto en caso exista un error al pasar el valor (el props)
//<SelectTrigger></SelectTrigger> contiene los estilos del contenedor y el placeholder respectivo
//Para <SelectContent></SelectContent> estamos usando funciones anónimas (aprender, es FUNDAMENTAL); estamos recorriendo el arreglo
//options utilizando map (este arreglo representa las opciones que saldrán al darle click al desplegable). Para cada elemento del arreglo 
// (notese que le damos a un elemento el nombre de 'option') usamos <SelectItem key></SelectItem>, el cual indica que es un elemento a 
// mostrarse al darle click al desplegable.







//placeholder="Theme"

export default Select;