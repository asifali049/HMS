import { z } from "zod";

export const billSchema = z.object({
patientId: z.string().min(1),

consultationFee: z.number().min(0),

medicineCharge: z.number().min(0),

otherCharge: z.number().min(0),
});

export type BillSchema =
z.infer<typeof billSchema>;
