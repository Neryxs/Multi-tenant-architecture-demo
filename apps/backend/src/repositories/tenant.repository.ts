import prisma from '../utils/prisma';

export const getTenantBySlug = async (slug: string) => {
  return prisma.tenant.findUnique({ where: { slug } });
};

export const createTenant = async (name: string, slug: string) => {
  return prisma.tenant.create({ data: { name, slug } });
};
