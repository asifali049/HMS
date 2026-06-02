import {
  NextRequest,
  NextResponse,
} from "next/server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: NextRequest
) {
  try {
    const body =
      await req.json();

    const exists =
      await prisma.admin.findUnique({
        where: {
          email: body.email,
        },
      });

    if (exists) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Email already exists",
        },
        { status: 400 }
      );
    }

    const hashedPassword =
      await bcrypt.hash(
        body.password,
        10
      );

    const admin =
      await prisma.admin.create({
        data: {
          name: body.name,
          email: body.email,
          password:
            hashedPassword,
        },
      });

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