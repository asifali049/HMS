import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash(
    "admin123",
    10
  );

  await prisma.admin.upsert({
    where: {
      email: "admin@hospital.com",
    },
    update: {},
    create: {
      name: "Admin",
      email: "admin@hospital.com",
      password,
    },
  });
}

main();