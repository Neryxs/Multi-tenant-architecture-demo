import prisma from '../utils/prisma';
import { Prisma } from '@prisma/client';

export const getProjectsByTenant = async (tenantId: string) => {
  return prisma.project.findMany({ where: { tenantId } });
};

export const createProject = async (data: Prisma.ProjectUncheckedCreateInput) => {
  return prisma.project.create({ data });
};

export const updateProject = async (id: string, data: Prisma.ProjectUncheckedUpdateInput) => {
  return prisma.project.update({ where: { id }, data });
};

export const deleteProject = async (id: string) => {
  return prisma.project.delete({ where: { id } });
};
