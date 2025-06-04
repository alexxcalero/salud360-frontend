import { DateTime } from "luxon";
import { z } from "zod";
import { clienteSchema } from "./cliente";
import { claseResumenDTOSchema } from "./clase";
import { citaMedicaVistaUsuarioSchema } from "./citaMedica";
import { comunidadSchema } from "./comunidad";

export const reservaSchema = z.object({
  idReserva: z.number(),
  estado: z.string(),
  fechaReserva: z.string().transform((v: string) => DateTime.fromISO(v)),
  fechaCancelacion: z.string().transform((v: string) => DateTime.fromISO(v)),
  cliente: z.lazy(() => clienteSchema.optional().nullable()),
  clase: z.lazy(() => claseResumenDTOSchema.optional().nullable()),
  citaMedica: z.lazy(() => citaMedicaVistaUsuarioSchema.optional().nullable()),
  comunidad: z.lazy(() => comunidadSchema.optional().nullable()),
});

export type reservaType = z.infer<typeof reservaSchema>;
