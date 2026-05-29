import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getUserById } from '../repositories/user.repository';

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await getUserById((payload as jwt.JwtPayload).userId);
    if (user) {
      req.user = user as Express.Request['user'];
    }
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
