import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

type Role = "ADMIN" | "USER";

const seedData = [
  {
    name: "Admin",
    email: "admin@admin.com",
    dob: "1990-01-01",
    password: "admin",
    role: "ADMIN",
  },
  {
    name: "Test User",
    email: "test@test.com",
    dob: "2000-01-01",
    password: "test",
  },
];

async function seed() {
  const prisma = new PrismaClient();

  try {
    for (const user of seedData) {
      const passwordHash = await bcrypt.hash(user.password, 10);
      await prisma.user.create({
        data: {
          email: user.email,
          name: user.name,
          dob: new Date(user.dob),
          password: passwordHash,
          role: user.role as Role,
        },
      });
    }

    console.log("Seed data has been inserted successfully.");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
