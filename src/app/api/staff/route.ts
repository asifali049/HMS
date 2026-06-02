import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const staff = await prisma.staff.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      data: staff,
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

    const staff =
      await prisma.staff.create({
        data: {
          employeeId:
            body.employeeId,
          name: body.name,
          email: body.email,
          phone: body.phone,
          role: body.role,
          salary: Number(
            body.salary
          ),
          joiningDate: new Date(
            body.joiningDate
          ),
          status:
            body.status ||
            "Active",
        },
      });

    return NextResponse.json({
      success: true,
      data: staff,
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