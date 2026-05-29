import prisma from '../utils/prisma';
import { Prisma } from '@prisma/client';

export const createAuditLog = async (
  action: string,
  userId?: string,
  tenantId?: string,
  meta?: Prisma.InputJsonValue,
) => {
  return prisma.auditLog.create({
    data: { action, userId, tenantId, meta },
  });
};
