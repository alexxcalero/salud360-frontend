import AuditoriaForm from "@/components/admin/auditoria/AuditoriaForm";
import { useLoading } from "@/hooks/LoadingContext";
import { useToasts } from "@/hooks/ToastContext";
import { DataAuditoria } from "@/models/auditoria";
import { getAuditoriaById } from "@/services/auditorias.service";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const DetalleAuditoriaPage = () => {
  const { id } = useParams();
  const [data, setData] = useState<DataAuditoria>();
  const { setLoading } = useLoading();
  const { createToast } = useToasts();
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        if (!id) throw new Error("Couldn't reach a requested id");
        await new Promise<string>((res, _) =>
          setTimeout(() => {
            res("");
          }, 2000)
        );
        const response = await getAuditoriaById(Number(id));
        setData(response.data);
      } catch (error) {
        createToast("error", {
          title: "Error",
          description: "Error al obtener datos del servidor",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <AuditoriaForm
        initialData={
          data ??
          ({
            idAuditoria: -1,
            descripcion: "No value",
            nombreTabla: "No value",
            idUsuarioModificador: -1,
            fechaModificacion: "No value",
          } as DataAuditoria)
        }
        title="Detalle de auditoria"
      />
    </>
  );
};

export default DetalleAuditoriaPage;
