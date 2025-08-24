import { Router } from 'express';
import { PrismaClient } from '../../prisma/__generated__';

import { CoursesRepository } from './courses.repository';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';

const prisma = new PrismaClient();
const repository = new CoursesRepository(prisma);
const service = new CoursesService(repository);
const controller = new CoursesController(service);

const router = Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;
