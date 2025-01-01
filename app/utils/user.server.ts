import bcrypt from "bcryptjs";
import type { RegisterForm, UpdateForm } from "./types.server";
import { prisma } from "./prisma.server";
import type { Role } from "@prisma/client";

export const create_user = async (data: RegisterForm) => {
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

export const get_all_users = async () => {
  return await prisma.user.findMany();
};

export const get_user_by_id = async (id: string) => { 
  return await prisma.user.findUnique({ where: { id } });
};

export const delete_user = async (id: string) => {
  return await prisma.user.delete({ where: { id } });
};

export const update_user = async (id: string, data: UpdateForm) => {
  const updatedUser = await prisma.user.update({
    where: { id },
    data: {
      email: data.email,
      name: data.name,
      dob: new Date(data.dob),
      role: data.role as Role,
    },
  });
  return { id: updatedUser.id, email: updatedUser.email };
};
