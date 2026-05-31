import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { patientSchema } from "@/schemas/patient.schema";

export async function POST(
  req: NextRequest
) {
  try {
    const body = await req.json();

    const data = patientSchema.parse(body);

    const totalPatients =
      await prisma.patient.count();

    const patientId = `PAT-${String(
      totalPatients + 1
    ).padStart(4, "0")}`;

    const patient =
      await prisma.patient.create({
        data: {
          ...data,
          patientId,
        },
      });

    return NextResponse.json({
      success: true,
      data: patient,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error,
      },
      { status: 400 }
    );
  }
}

export async function GET() {
  const patients =
    await prisma.patient.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

  return NextResponse.json({
    success: true,
    data: patients,
  });
}