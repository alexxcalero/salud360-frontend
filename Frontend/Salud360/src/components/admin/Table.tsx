import { Filter } from "lucide-react";
import { ChangeEvent } from "react";

interface Props<T> {
  checkedValue?: boolean;
  onCheckedChange?: (value: ChangeEvent<HTMLInputElement>) => void;
  columns: {
    label: string;
    type: string;
    className?: string;
  }[];
}

function Table<T>({ checkedValue, onCheckedChange, columns }: Props<T>) {
  return (
    <thead className="h-[50px] border-separate border-spacing-0">
      <tr className="bg-blue-700 text-white">
        <th className="px-4 py-2 rounded-l-lg">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={checkedValue}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (onCheckedChange) onCheckedChange(e);
              }}
            />
          </div>
        </th>
        {columns.map((col, i) => (
          <th key={i} className={`px-4 py-2 ${col.className || ""}`}>
            <div className="flex items-center gap-2">
              <span>{col.label}</span>
              <Filter size={16} />
            </div>
          </th>
        ))}
        <th className="px-4 py-2 rounded-r-lg">
          <div className="flex items-center gap-2">Acciones</div>
        </th>
      </tr>
    </thead>
  );
}

export default Table;
