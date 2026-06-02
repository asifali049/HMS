import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword =
    await bcrypt.hash(
      "admin123",
      10
    );

  await prisma.admin.create({
    data: {
      name: "Admin",
      email:
        "admin@hospital.com",
      password:
        hashedPassword,
    },
  });

  console.log(
    "Admin Created"
  );
}

main();