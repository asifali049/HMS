import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const departments =
      await prisma.department.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

    return NextResponse.json({
      success: true,
      data: departments,
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

export async function POST(
  req: NextRequest
) {
  try {
    const body = await req.json();

    const department =
      await prisma.department.create({
        data: {
          name: body.name,
          description:
            body.description,
        },
      });

    return NextResponse.json({
      success: true,
      data: department,
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