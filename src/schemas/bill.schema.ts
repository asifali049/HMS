import { z } from "zod";

export const billSchema = z.object({
  patientId: z.string(),
  consultationFee: z.coerce.number(),
  medicineCharge: z.coerce.number(),
  otherCharge: z.coerce.number(),
});

export type BillInput = z.infer<
  typeof billSchema
>;