import { Filter } from "lucide-react";

interface Props{
    columns:{
        label: React.ReactNode;
        className?: string;
    }[];
}

function TableHeader({columns}: Props){
    return(
        <thead>
            <tr className="bg-blue-700 text-white h-[50px] auto-cols-max items-center">
                {columns.map((col, i) => (
                    <th key={i} className={`px-4 ${col.className || ""}`}>
                        <div className="inline">
                            {col.label}
                        </div>
                        <Filter className="inline"/>
                    </th>
                ))}
            </tr>
        </thead>
    );
}

export default TableHeader;