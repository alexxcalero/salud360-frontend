import { DataAuditoria } from "@/models/auditoria";
import { baseAPI } from "./baseAPI";

export const getAuditoriaList = async () =>
  await baseAPI.get<DataAuditoria[]>("/auditorias");
export const getAuditoriaById = async (id: number) =>
  await baseAPI.get<DataAuditoria>(`/auditorias/${id}`);
