import { useState } from "react";


function useTestimonioForm() {
  const [comentario, setComentario] = useState("");
  const [calificacion, setCalificacion] = useState<number>(5);
  
  const setTestimonioAPI = (testimonio: any) => {
    setComentario(testimonio.comentario || "");
    setCalificacion(testimonio.calificacion || 5);
  };

  return {
    comentario, setComentario,
    calificacion, setCalificacion,
    setTestimonioAPI
  };
}

export default useTestimonioForm;
