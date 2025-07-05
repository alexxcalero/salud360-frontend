import Button from "@/components/Button";
import { useToasts } from "@/hooks/ToastContext";
import { IComunidad } from "@/models/comunidad";
import { IReporte } from "@/models/reporte";
import { Check, Download } from "lucide-react";
import { Navigate, useLocation } from "react-router";
import { useNavigate } from "react-router";

const PasarelaExito = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { createToast } = useToasts();

  if (!location.state) return <Navigate to={"/usuario"} />;

  const { comunidad, boleta }: { comunidad: IComunidad; boleta: IReporte } =
    location.state;
  return (
    <div className="w-full h-full flex justify-center items-center">
      <title>Pasarela de pagos</title>

      <div className="flex flex-col bg-white shadow-md max-w-150 p-8 m-4 gap-4 items-center">
        <div className="aspect-1/1 h-18 bg-green-400 rounded-full flex justify-center items-center w-min">
          <Check color="white" size={38} />
        </div>
        <h1>¡Afilición exitosa!</h1>
        <h2 className="text-2xl font-bold mb-2">Ahora eres miembro de la <span className="text-[#2A86FF] italic">{comunidad.nombre ?? "{{ Mostrar nombre }}"}.</span></h2>
        {/*<h1>
          ¡Se afilió correctamente a la comunidad{" "}
          {comunidad.nombre ?? "{{ Mostrar nombre }}"}!
        </h1>*/}
        
        <div className="flex gap-4 justify-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              if (!boleta.pdf) {
                createToast("error", {
                  title: "La boleta no fue creada correctamente",
                });
                return;
              }
              const base64PDF = boleta.pdf;
              const byteCharacters = atob(base64PDF);
              const byteNumbers = Array.from(byteCharacters, (char) =>
                char.charCodeAt(0)
              );
              const byteArray = new Uint8Array(byteNumbers);
              const blob = new Blob([byteArray], { type: "application/pdf" });

              // Creamos un enlace para descargarlo
              const link = document.createElement("a");
              link.href = URL.createObjectURL(blob);
              link.download = "mi_archivo.pdf";
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
          >
            <Download /> Descargar boleta
          </Button>
          <Button
            size="lg"
            onClick={() => {
              navigate(
                `/usuario/comunidades/detalle/${comunidad.idComunidad}/`,
                { preventScrollReset: false }
              );
            }}
          >
            Ir a la comunidad
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PasarelaExito;
