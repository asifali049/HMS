import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    console.log("UPDATE ID =", id);

    const body = await req.json();

    console.log("BODY =", body);

    const appointment =
      await prisma.appointment.update({
        where: {
          id,
        },
        data: {
          patientId: body.patientId,
          doctorId: body.doctorId,
          date: new Date(body.date),
          status: body.status,
          reason: body.reason,
        },
      });

    return NextResponse.json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    console.error(
      "PATCH ERROR =>",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      { status: 500 }
    );
  }
}