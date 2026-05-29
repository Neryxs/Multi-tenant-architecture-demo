// src/types/express/index.d.ts
import { Tenant, User } from '../../../packages/shared';
declare global {
  namespace Express {
    interface Request {
      tenant?: Tenant;
      user?: User & { role: 'ADMIN' | 'USER'; tenantId: string };
    }
  }
}
export {};
