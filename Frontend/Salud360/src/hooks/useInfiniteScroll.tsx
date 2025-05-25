import { useEffect, useRef, useState } from "react";

export default function useInfiniteScroll<T>(
  initialData: T[],
  getData: () => Promise<T[]>
) {
  const [items, setItems] = useState<T[]>([...initialData]);
  const [pagina, setPagina] = useState(1);

  const processing = useRef(false);

  const cargarDatos = async () => {
    const data = await getData();
    setItems((prev) => [...prev, ...data]);
    processing.current = false;
  };

  useEffect(() => {
    cargarDatos();
  }, [pagina]);

  useEffect(() => {
    const manejarScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        !processing.current
      ) {
        processing.current = true;
        setPagina((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", manejarScroll);
    return () => window.removeEventListener("scroll", manejarScroll);
  }, []);

  return { items };
}
