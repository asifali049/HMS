import { z } from "zod";

export const patientSchema = z.object({
  name: z.string().min(3),
  age: z.coerce.number().min(0),
  gender: z.string(),
  phone: z.string().min(10),
  address: z.string().min(3),
  bloodGroup: z.string().optional(),
  disease: z.string().optional(),
});

export type PatientInput = z.infer<
  typeof patientSchema
>;