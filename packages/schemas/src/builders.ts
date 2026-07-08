import { z } from "zod";

type ColumnRule = { z: z.ZodTypeAny; required?: boolean; updatable?: boolean };

export function makeInsertSchema(columns: Record<string, ColumnRule>) {
  const shape: Record<string, z.ZodTypeAny> = {};
  for (const [k, r] of Object.entries(columns)) shape[k] = r.required ? r.z : r.z.optional();
  return z.object(shape).strict();
}

export function makeUpdateSchema(columns: Record<string, ColumnRule>) {
  const shape: Record<string, z.ZodTypeAny> = {};
  for (const [k, r] of Object.entries(columns)) if (r.updatable !== false) shape[k] = r.z.optional();
  return z.object(shape).strict().refine(o => Object.keys(o).length > 0, { message: "Empty update" });
}