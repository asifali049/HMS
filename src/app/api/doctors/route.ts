import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { doctorSchema } from "@/schemas/doctor.schema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const data = doctorSchema.parse(body);

    const doctor = await prisma.doctor.create({
  data,
});

    return NextResponse.json({
      success: true,
      data: doctor,
    });
  }catch (error) {
  console.error(error);

  return NextResponse.json(
    {
      success: false,
      message:
        error instanceof Error ? error.message : "Unknown error",
    },
    { status: 400 }
  );
}
}
export async function GET() {
  const doctors = await prisma.doctor.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json({
    success: true,
    data: doctors,
  });
}
