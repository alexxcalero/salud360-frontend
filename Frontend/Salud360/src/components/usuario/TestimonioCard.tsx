interface TestimonioProps {
  testimonio: {
    idTestimonio?: number;
    comentario: string;
    calificacion: number;
    autor: {
      idCliente?: number;
      nombres: string;
      apellidos: string;
    };
  };
  usuario?: {
    idCliente?: number;
  };
  onEdit?: (testimonio: any) => void;
  onDelete?: (idTestimonio: number) => void;
}


function TestimonioCard({ testimonio, usuario, onEdit, onDelete }: TestimonioProps) {
  return (
    <div className="p-4 border rounded shadow-sm w-[300px] min-h-[150px] flex flex-col justify-between">
      <p className="italic text-gray-700">“{testimonio.comentario}”</p>
      <div className="mt-2 text-sm text-right text-gray-600">
        ⭐ {testimonio.calificacion} — {testimonio.autor?.nombres
            ? `${testimonio.autor.nombres} ${testimonio.autor.apellidos}`
            : "Anónimo"}
      </div>
      {usuario?.idCliente === testimonio.autor?.idCliente && (
        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={() => onEdit?.(testimonio)}
            className="text-blue-600 hover:underline text-sm"
          >
            Editar
          </button>
          <button
            onClick={() => onDelete?.(testimonio.idTestimonio!)}
            className="text-red-600 hover:underline text-sm"
          >
            Eliminar
          </button>
        </div>
      )}

    </div>
  );
}

export default TestimonioCard;