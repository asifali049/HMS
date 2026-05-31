import { z } from "zod";

export const appointmentSchema = z.object({
  patientId: z.string(),
  doctorId: z.string(),
  date: z.string(),
  time: z.string(),
  reason: z.string().optional(),
});

export type AppointmentInput =
  z.infer<typeof appointmentSchema>;