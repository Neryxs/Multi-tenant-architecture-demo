import { Router } from 'express';
import * as projectController from '../controllers/project.controller';
import { validate } from '../validators/zodValidator';
import { projectSchema } from '../validators/schemas';
import { authMiddleware } from '../middlewares/authMiddleware';
import { rbacMiddleware } from '../middlewares/rbacMiddleware';

const router = Router();

router.use(authMiddleware);

router.get('/', projectController.getProjects);
router.post('/', rbacMiddleware(['ADMIN']), validate(projectSchema), projectController.createProject);
router.put('/:id', rbacMiddleware(['ADMIN']), validate(projectSchema), projectController.updateProject);
router.delete('/:id', rbacMiddleware(['ADMIN']), projectController.deleteProject);

export default router;
