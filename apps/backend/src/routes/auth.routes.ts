import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { validate } from '../validators/zodValidator';
import { registerSchema, loginSchema } from '../validators/schemas';

const router = Router();

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.get('/me', authController.me);

export default router;
