import { Request, Response } from 'express';
import * as authService from '../services/auth.service';
import * as tenantRepository from '../repositories/tenant.repository';
import { generateTokens } from '../services/auth.service';

export const register = async (req: Request, res: Response) => {
  const { email, password, tenant } = req.body;
  let tenantObj = await tenantRepository.getTenantBySlug(tenant);
  if (!tenantObj) {
    tenantObj = await tenantRepository.createTenant(tenant, tenant);
  }
  const user = await authService.register({ email, password }, tenantObj.id);
  const tokens = generateTokens(user);
  res.status(201).json({ user, ...tokens });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await authService.login(email, password);
  const tokens = generateTokens(user);
  res.json({ user, ...tokens });
};

export const me = async (req: Request, res: Response) => {
  res.json({ user: req.user });
};
