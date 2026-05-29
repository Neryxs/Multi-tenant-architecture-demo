import prisma from '../utils/prisma';

export const getProjectsByTenant = async (tenantId: string) => {
  return prisma.project.findMany({ where: { tenantId } });
};

export const createProject = async (data: any) => {
  return prisma.project.create({ data });
};

export const updateProject = async (id: string, data: any) => {
  return prisma.project.update({ where: { id }, data });
};

export const deleteProject = async (id: string) => {
  return prisma.project.delete({ where: { id } });
};
