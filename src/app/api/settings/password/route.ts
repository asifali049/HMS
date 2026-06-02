import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function PATCH(
  req: NextRequest
) {
  try {
    const body =
      await req.json();

    const {
      currentPassword,
      newPassword,
    } = body;

    const admin =
      await prisma.admin.findFirst();

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Admin not found",
        },
        { status: 404 }
      );
    }

    const valid =
      await bcrypt.compare(
        currentPassword,
        admin.password
      );

    if (!valid) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Current password is incorrect",
        },
        { status: 400 }
      );
    }

    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        10
      );

    await prisma.admin.update({
      where: {
        id: admin.id,
      },
      data: {
        password:
          hashedPassword,
      },
    });

    return NextResponse.json({
      success: true,
      message:
        "Password updated successfully",
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