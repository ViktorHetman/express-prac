import express, { type Request, type Response } from 'express';
import cors from 'cors';

import { coursesRoutes } from './routes/courses.routes';
import { testsRoutes } from './routes/tests.routes';
import { db } from './db/db';

export const app: express.Express = express();

app.use(express.json());
app.use(cors());

app.use('/courses', coursesRoutes(db));
app.use('/__test__', testsRoutes(db));
