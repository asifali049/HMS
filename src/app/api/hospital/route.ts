import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const hospital =
    await prisma.hospital.findFirst();

  return NextResponse.json({
    success: true,
    data: hospital,
  });
}

export async function POST(
  req: NextRequest
) {
  try {
    const body = await req.json();

    const existing =
      await prisma.hospital.findFirst();

    if (existing) {
      const hospital =
        await prisma.hospital.update({
          where: {
            id: existing.id,
          },
          data: body,
        });

      return NextResponse.json({
        success: true,
        data: hospital,
      });
    }

    const hospital =
      await prisma.hospital.create({
        data: body,
      });

    return NextResponse.json({
      success: true,
      data: hospital,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      { status: 500 }
    );
  }
}