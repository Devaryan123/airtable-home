// src/schemas/fileSchema.ts
import { z } from "zod"

export const FileRecordSchema = z.object({
  _id: z.string().optional(),            // assigned by Convex
  name: z.string().min(1),
  url: z.string().url(),
  size: z.number().nonnegative().nullable().optional(),
  mimeType: z.string().nullable().optional(),
metadata: z.record(z.string(), z.any()).nullable().optional(),
  ownerId: z.string().nullable().optional(),
  createdAt: z.string(),                 // ISO string
})

export type FileRecord = z.infer<typeof FileRecordSchema>
