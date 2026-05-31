import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const doctor = await prisma.doctor.findUnique({
    where: { id },
  });

  return NextResponse.json({
    success: true,
    data: doctor,
  });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const body = await req.json();

  const doctor = await prisma.doctor.update({
    where: { id },
    data: body,
  });

  return NextResponse.json({
    success: true,
    data: doctor,
  });
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await prisma.doctor.delete({
    where: { id },
  });

  return NextResponse.json({
    success: true,
  });
}