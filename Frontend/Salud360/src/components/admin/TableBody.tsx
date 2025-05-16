interface Props{
    rows:{
        content: React.ReactNode;
        className?: string;
    }[][];
}

function TableBody({ rows }: Props) {
  return (
    <tbody className="space-y-2">
      {rows.map((cols, rowIndex) => (
        <tr
          key={rowIndex}
          className="border-b-2 border-black bg-gray-200 hover:bg-gray-50" // NUEVO
        >
          {cols.map((col, colIndex) => (
            <td key={colIndex} className={`${col.className || ""} px-8 py-4`}>
              {col.content}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;