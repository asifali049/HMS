import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { billSchema } from "@/schemas/bill.schema";

export async function POST(
req: NextRequest
) {
try {
const body = await req.json();


const data = billSchema.parse(body);

const patient =
  await prisma.patient.findUnique({
    where: {
      id: data.patientId,
    },
  });

if (!patient) {
  return NextResponse.json(
    {
      success: false,
      message:
        "Patient not found",
    },
    { status: 404 }
  );
}

const totalAmount =
  data.consultationFee +
  data.medicineCharge +
  data.otherCharge;

const bill =
  await prisma.bill.create({
    data: {
      patientId:
        data.patientId,
      consultationFee:
        data.consultationFee,
      medicineCharge:
        data.medicineCharge,
      otherCharge:
        data.otherCharge,
      totalAmount,
    },
    include: {
      patient: true,
    },
  });

return NextResponse.json({
  success: true,
  data: bill,
});


} catch (error) {
return NextResponse.json(
{
success: false,
error: String(error),
},
{ status: 400 }
);
}
}

export async function GET() {
try {
const bills =
await prisma.bill.findMany({
include: {
patient: true,
},
orderBy: {
createdAt: "desc",
},
});


return NextResponse.json({
  success: true,
  data: bills,
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
