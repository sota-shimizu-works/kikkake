import { z } from "zod";

export const zUlid = z.string().regex(/^[0-9A-HJKMNP-TV-Z]{26}$/, "Invalid ULID");
export const zPgInt = z.number().int().safe();
export const zNonEmpty = z.string().trim().min(1);
export const zSlug = z.string().toLowerCase().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
export const zTimestamp = z.coerce.date();
export const zEmailStrict = z.string().email();