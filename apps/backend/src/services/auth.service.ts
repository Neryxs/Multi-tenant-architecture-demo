import * as userRepository from '../repositories/user.repository';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createAuditLog } from '../repositories/audit.repository';
import { Prisma, User } from '@prisma/client';

export const register = async (
  data: Pick<Prisma.UserCreateInput, 'email' | 'password'>,
  tenantId: string,
) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = await userRepository.createUser({
    email: data.email,
    password: hashedPassword,
    role: 'ADMIN',
    tenantId,
  });
  await createAuditLog('REGISTER', user.id, tenantId, { email: user.email });
  return user;
};

export const login = async (email: string, password: string) => {
  const user = await userRepository.getUserByEmail(email);
  if (!user) throw { status: 401, message: 'Invalid credentials' };
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw { status: 401, message: 'Invalid credentials' };
  return user;
};

export const generateTokens = (user: User) => {
  const accessToken = jwt.sign(
    { userId: user.id, tenantId: user.tenantId, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: '15m' },
  );
  const refreshToken = jwt.sign(
    { userId: user.id, tenantId: user.tenantId, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: '7d' },
  );
  return { accessToken, refreshToken };
};
