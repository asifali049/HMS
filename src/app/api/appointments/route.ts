import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { appointmentSchema } from "@/schemas/appointment.schema";

export async function POST(
  req: NextRequest
) {
  try {
    const body = await req.json();

    const data =
      appointmentSchema.parse(body);

    const total =
      await prisma.appointment.count();

    const appointment =
      await prisma.appointment.create({
        data: {
          ...data,
          date: new Date(data.date),
          tokenNumber: total + 1,
        },
      });

    return NextResponse.json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    console.error(
      "APPOINTMENT ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      { status: 400 }
    );
  }
} 

export async function GET() {
  const appointments =
    await prisma.appointment.findMany({
      include: {
        doctor: true,
        patient: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

  return NextResponse.json({
    success: true,
    data: appointments,
  });
}