interface Props{
    columns:{
        label: React.ReactNode;
        className?: string;
    }[];
}

function TableHeader({columns}: Props){
    return(
        <thead>
            <tr className="bg-[#0D6EBA] text-white">
                {columns.map((col, i) => (
                    <th key={i} className={`px-8 py-4 ${col.className || ""}`}>
                        {col.label}
                    </th>
                ))}
            </tr>
        </thead>
    );
}

export default TableHeader;