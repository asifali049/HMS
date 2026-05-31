import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const totalDoctors = await prisma.doctor.count();
  const totalPatients = await prisma.patient.count();
  const totalAppointments = await prisma.appointment.count();
  const totalBills = await prisma.bill.count();

  return NextResponse.json({
    totalDoctors,
    totalPatients,
    totalAppointments,
    totalBills,
  });
}