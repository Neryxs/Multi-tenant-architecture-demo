import { Request, Response, NextFunction } from 'express';
import { getTenantBySlug } from '../repositories/tenant.repository';

export async function tenantMiddleware(req: Request, res: Response, next: NextFunction) {
  const host = req.headers.host || '';
  const subdomain = host.split('.')[0];
  const tenantSlug = (req.headers['x-tenant'] as string) || subdomain;
  if (!tenantSlug) return res.status(400).json({ message: 'Tenant not specified' });
  const tenant = await getTenantBySlug(tenantSlug);
  if (!tenant) return res.status(404).json({ message: 'Tenant not found' });
  req.tenant = tenant;
  next();
}
