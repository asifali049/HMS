import { z } from "zod";

export const doctorSchema = z.object({
  name: z.string().min(3),
  specialization: z.string().min(2),
  qualification: z.string().min(2),
  experience: z.coerce.number().min(0),
  consultationFee: z.coerce.number().min(0),
  mobile: z.string().min(10),
  email: z.string().email().optional(),
});

export type DoctorInput = z.infer<typeof doctorSchema>;