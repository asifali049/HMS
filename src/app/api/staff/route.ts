import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const staff = await prisma.staff.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json({
    success: true,
    data: staff,
  });
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
          salary: parseFloat(
            body.salary
          ),
          joiningDate: new Date(
            body.joiningDate
          ),
          status: body.status,
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