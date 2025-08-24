import 'reflect-metadata';
import express from 'express';
import cors from 'cors';

import coursesRoutes from './routes/courses.routes';
import { errorHandler } from './middlewares/errorHandler';

export const app: express.Express = express();

app.use(express.json());
app.use(cors());

app.use('/courses', coursesRoutes);

app.use(errorHandler);
