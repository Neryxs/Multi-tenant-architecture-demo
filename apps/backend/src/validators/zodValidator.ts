import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export function validate(schema: ZodSchema<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      // ZodError tiene .issues en vez de .errors en versiones modernas
      // @ts-ignore
      return res.status(400).json({ errors: result.error.issues });
    }
    next();
  };
}
