import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const { id } =
    await params;

  const staff =
    await prisma.staff.findUnique({
      where: { id },
    });

  return NextResponse.json({
    success: true,
    data: staff,
  });
}

export async function PATCH(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    const { id } =
      await params;

    const body =
      await req.json();

    const staff =
      await prisma.staff.update({
        where: { id },
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
          joiningDate:
            new Date(
              body.joiningDate
            ),
          status:
            body.status,
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

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    const { id } =
      await params;

    await prisma.staff.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
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