interface TestimonioProps {
  testimonio: {
    comentario: string;
    calificacion: number;
    autor: {
      nombres: string;
      apellidos: string;
    };
  };
}

function TestimonioCard({ testimonio }: TestimonioProps) {
  return (
    <div className="p-4 border rounded shadow-sm w-[300px] min-h-[150px] flex flex-col justify-between">
      <p className="italic text-gray-700">“{testimonio.comentario}”</p>
      <div className="mt-2 text-sm text-right text-gray-600">
        ⭐ {testimonio.calificacion} — {testimonio.autor?.nombres
            ? `${testimonio.autor.nombres} ${testimonio.autor.apellidos}`
            : "Anónimo"}
      </div>
    </div>
  );
}

export default TestimonioCard;