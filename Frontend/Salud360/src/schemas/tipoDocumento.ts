import { z } from "zod";

export const tipoDocumentoSchema = z.object({
  idTipoDocumento: z.number(),
  nombre: z.string(),
});

export type tipoDocumentoType = z.infer<typeof tipoDocumentoSchema>;
