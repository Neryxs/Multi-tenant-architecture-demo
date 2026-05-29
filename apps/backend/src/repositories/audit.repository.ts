import prisma from '../utils/prisma';

export const createAuditLog = async (action: string, userId?: string, tenantId?: string, meta?: any) => {
  return prisma.auditLog.create({
    data: { action, userId, tenantId, meta },
  });
};
