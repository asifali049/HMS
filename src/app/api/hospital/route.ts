import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const hospital = await prisma.hospital.findFirst();

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

export async function POST(
  req: NextRequest
) {
  try {
    const body = await req.json();

    const existingHospital =
      await prisma.hospital.findFirst();

    // First Time Create
    if (!existingHospital) {
      const hospital =
        await prisma.hospital.create({
          data: body,
        });

      return NextResponse.json({
        success: true,
        message:
          "Hospital created successfully",
        data: hospital,
      });
    }

    // Already Exists → Update
    const hospital =
      await prisma.hospital.update({
        where: {
          id: existingHospital.id,
        },
        data: body,
      });

    return NextResponse.json({
      success: true,
      message:
        "Hospital updated successfully",
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

export async function PUT(
  req: NextRequest
) {
  try {
    const body = await req.json();

    const existingHospital =
      await prisma.hospital.findFirst();

    if (!existingHospital) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Hospital not found",
        },
        { status: 404 }
      );
    }

    const hospital =
      await prisma.hospital.update({
        where: {
          id: existingHospital.id,
        },
        data: body,
      });

    return NextResponse.json({
      success: true,
      message:
        "Hospital updated successfully",
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