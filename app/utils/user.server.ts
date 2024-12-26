import bcrypt from "bcryptjs";
import type { RegisterForm } from "./types.server";
import { prisma } from "./prisma.server";

export const createUser = async (data: RegisterForm) => {
  const passwordHash = await bcrypt.hash(data.password, 10);
  const newUser = await prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      dob: new Date(data.dob),
      password: passwordHash,
    },
  });
  return { id: newUser.id, email: newUser.email };
};
