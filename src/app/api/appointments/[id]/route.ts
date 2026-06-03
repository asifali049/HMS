import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET SINGLE APPOINTMENT
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const appointment = await prisma.appointment.findUnique({
      where: {
        id,
      },
      include: {
        patient: true,
        doctor: true,
      },
    });

    if (!appointment) {
      return NextResponse.json(
        {
          success: false,
          error: "Appointment not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    console.error("GET ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      { status: 500 }
    );
  }
}

// UPDATE APPOINTMENT
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const appointment = await prisma.appointment.update({
      where: {
        id,
      },
      data: {
        patientId: body.patientId,
        doctorId: body.doctorId,
        date: body.date
          ? new Date(body.date)
          : undefined,
        time: body.time,
        reason: body.reason,
        status: body.status,
      },
    });

    return NextResponse.json({
      success: true,
      data: appointment,
      message:
        "Appointment updated successfully",
    });
  } catch (error) {
    console.error("PATCH ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      { status: 500 }
    );
  }
}

// DELETE APPOINTMENT
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.appointment.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      message:
        "Appointment deleted successfully",
    });
  } catch (error) {
    console.error("DELETE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      { status: 500 }
    );
  }
}