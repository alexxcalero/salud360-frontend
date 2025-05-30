import GeneradorTabla from "@/components/admin/table/Tabla";
import { useEffect, useState } from "react";
import { getAuditoriaList } from "@/services/auditorias.service";
import { type DataAuditoria } from "@/models/auditoria";

function AuditoriasPage() {
  const [rows, setRows] = useState<DataAuditoria[]>([]);
  const Tabla = GeneradorTabla<DataAuditoria>({
    idKey: "idAuditoria",
    columns: {
      idAuditoria: { label: "id", type: "number" },
      nombreTabla: { label: "Nombre de tabla", type: "text" },
      fechaModificacion: { label: "Fecha de modificacion", type: "datetime" },
      idUsuarioModificador: {
        label: "id del usuario responsable",
        type: "number",
      },
      descripcion: { label: "Descripción", type: "text" },
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAuditoriaList();
        setRows(response.data);
      } catch (error) {}
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="p-4">
        <Tabla rows={rows} />
      </div>
    </>
  );
}

export default AuditoriasPage;
