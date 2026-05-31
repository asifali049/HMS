import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const patient = await prisma.patient.findUnique({
    where: { id },
  });

  return NextResponse.json({
    success: true,
    data: patient,
  });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  const patient = await prisma.patient.update({
    where: { id },
    data: body,
  });

  return NextResponse.json({
    success: true,
    data: patient,
  });
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await prisma.patient.delete({
    where: { id },
  });

  return NextResponse.json({
    success: true,
  });
}