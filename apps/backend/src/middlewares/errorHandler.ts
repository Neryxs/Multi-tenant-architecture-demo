import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction) {
  // Centraliza el manejo de errores
  type AppError = { status?: number; message?: string };
  if (err && typeof err === 'object') {
    const appErr = err as AppError;
    if (typeof appErr.status === 'number') {
      return res.status(appErr.status).json({ message: appErr.message || 'Error' });
    }
  }
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
}
