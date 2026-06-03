import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const admin =
      await prisma.admin.findFirst();

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Admin not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: admin,
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

export async function PATCH(
  req: NextRequest
) {
  try {
    const body =
      await req.json();

    const { name, email } = body;

    const admin =
      await prisma.admin.findFirst();

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Admin not found",
        },
        { status: 404 }
      );
    }

    const updatedAdmin =
      await prisma.admin.update({
        where: {
          id: admin.id,
        },
        data: {
          name,
          email,
        },
      });

    return NextResponse.json({
      success: true,
      data: updatedAdmin,
      message:
        "Profile updated successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      { status: 500 }
    );
  }
}