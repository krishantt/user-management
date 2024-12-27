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

export const updateUser = async (id: string, data: RegisterForm) => {
  const passwordHash = await bcrypt.hash(data.password, 10);
  const updatedUser = await prisma.user.update({
    where: { id },
    data: {
      email: data.email,
      name: data.name,
      dob: new Date(data.dob),
      password: passwordHash,
    },
  });
  return { id: updatedUser.id, email: updatedUser.email };
}

export const get_all_users = async () => {
  return await prisma.user.findMany();
}

export const delete_user = async (id: string) => { 
  return await prisma.user.delete({ where: { id } });
}
