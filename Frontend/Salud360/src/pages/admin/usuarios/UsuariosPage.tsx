import { Search, Info, Trash2, Pencil, Filter, UserPlus } from "lucide-react";
import React from "react";

import TableHeader from "@/components/admin/TableHeader";
import TableBody from "@/components/admin/TableBody";
import InputIcon from "@/components/InputIcon";
import ButtonIcon from "@/components/ButtonIcon";

function UsuariosPage(){

    const [selectAll, setSelectAll] = React.useState(false);

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
    }

    const columns=[
        { label: (<input type="checkbox" checked={selectAll} onChange={handleSelectAll}/>), className: "w-10" },
        { label: "ID", className: "w-16" },
        { label: "Foto", className: "w-16" },
        { label: "Nombre", className: "w-1/4" },
        { label: "Correo", className: "w-1/3" },
        { label: "Comunidad", className: "w-1/6" },
        { label: "Roles", className: "w-1/6" },
        { label: "Status", className: "w-1/6" },
        { label: "Actions", className: "w-24 text-center" }
    ]

    const rowTemplate=[
        { content: (<input type="checkbox" checked={selectAll} onChange={handleSelectAll}/>), className: "w-10" },
        { content: "001", className: "w-16" },
        { content: " ", className: "w-16" },
        { content: "Fabián Montenegro", className: "w-1/4" },
        { content: "fabian@monosupremo.com", className: "w-1/3" },
        { content: "Runners", className: "w-1/6" },
        { content: "Usuario", className: "w-1/6" },
        { content: "Activo", className: "w-1/6" },
        { content: (
            <div className="flex justify-center gap-2">
                <Info className="w-5 h-5 text-[#2A86FF] cursor-pointer" onClick={() => console.log("Ver info")} />
                <Pencil className="w-5 h-5 text-[#2A86FF] cursor-pointer" onClick={() => console.log("Ver info")} />
                <Trash2 className="w-5 h-5 text-[#2A86FF] cursor-pointer" onClick={() => console.log("Ver info")}/>
            </div>), 
          className: "w-24 text-center" }
    ]

    //Lo que esto haciendo desde aca, es iterar el único row que creé arriba unas 15 veces, para no tener que llenar manualmente el double array que esta comentado debajo
    const rows = Array.from({length: 15}, () => rowTemplate);

    /*
    const rows=[
        [
            { content: (<input type="checkbox" checked={selectAll} onChange={handleSelectAll}/>), className: "w-10" },
            { content: "001", className: "w-16" },
            { content: " ", className: "w-16" },
            { content: "Fabián Montenegro", className: "w-1/4" },
            { content: "fabian@monosupremo.com", className: "w-1/3" },
            { content: "Runners", className: "w-1/6" },
            { content: "Usuario", className: "w-1/6" },
            { content: "Activo", className: "w-1/6" },
            { content: " ", className: "w-24 text-center" }
        ],
        []
    ]*/

    return(
        <div>
            
            <div className = "grid grid-cols-12 gap-4 items-center px-6 py-4">
                {/*Estamos seteando el contenedor como un grid. Este grid esta proporcionalmente dividido en 12 partes. Cada elemento tiene un espacio de 4 (gap-4) y estan... */}

                <div className="col-span-4">
                    {/*Estamos ocupando 4 de las 12 partes del grid. Quedan 8*/}
                    <InputIcon icon={<Search className="w-5 h-5" />} placeholder="Buscar monos" type="search"/>
                </div>

                <div className="col-span-6 flex gap-2">
                    {/*Estamos ocupando 6 de las 12 partes del grid. Quedan 2*/}
                    {/*Esto es para los botones, dentro de este contenedor el espacio entre los botones es de 2 (gap-2)*/}
                    <ButtonIcon icon={<Search className="w-6 h-6" />} size="lg" variant="primary">Buscar</ButtonIcon>
                    <ButtonIcon icon={<Filter className="w-6 h-6" />} size="lg" variant="primary">Aplicar filtros</ButtonIcon>
                    <span className="text-sm text-muted-foreground whitespace-nowrap">Aplicando 17 filtro(s)</span>
                </div>

                <div className="col-span-2 flex justify-end">
                    {/*Estamos ocupando 2 de las 12 partes del grid. Toda la grilla ha sido ocupada*/}
                    {/*Creamos un contenedor utilizando flex, para poder aplicarle justify-end y así que el botón de agregar usuarios esté en el extremo final*/}
                    <ButtonIcon icon={<UserPlus className="w-6 h-6" />} size="lg" variant="primary">Agregar usuario</ButtonIcon>
                </div>

            </div>

            <div className="p-6">
                <table className="border-separate border-spacing-y-2">
                    <TableHeader columns={columns}></TableHeader>
                    <TableBody rows={rows}/>
                </table>
            </div>
        </div>

        


    );

}

export default UsuariosPage;


/* <div className="p-6 flex gap-4">
                <InputIcon icon={<Search className="w-5 h-5" />} placeholder="Buscar Monos" type="search" />
                <ButtonIcon icon={<Search className="w-6 h-6" />} variant="primary"size="lg" >Buscar</ButtonIcon>
                <ButtonIcon icon={<Search className="w-6 h-6" />} variant="primary"size="lg" >Aplicar Filtros</ButtonIcon>
            </div>*/