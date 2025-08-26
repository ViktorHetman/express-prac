import { Router } from 'express';
import { PrismaClient } from '../../prisma/__generated__';

import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

const prisma = new PrismaClient();
const repository = new AuthRepository(prisma);
const service = new AuthService(repository);
const controller = new AuthController(service);

const router = Router();

// router.get('/', controller.getAll);
// router.get('/:id', controller.getById);
router.post('/register', controller.registerUser);
// router.put('/:id', controller.update);
// router.delete('/:id', controller.delete);

export default router;
