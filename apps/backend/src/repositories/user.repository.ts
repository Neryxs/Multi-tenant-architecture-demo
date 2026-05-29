import prisma from '../utils/prisma';
import { Prisma } from '@prisma/client';

export const getUserById = async (id: string) => {
  return prisma.user.findUnique({ where: { id } });
};

export const getUserByEmail = async (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};

export const createUser = async (data: Prisma.UserUncheckedCreateInput) => {
  return prisma.user.create({ data });
};
