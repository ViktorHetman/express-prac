import express, { type Response } from 'express';

import type { DBType } from '../db/db';

export const testsRoutes = (db: DBType) => {
  const router = express.Router();
  router.delete('/data', (_, res: Response) => {
    db.courses = [];
    res.sendStatus(204);
  });
  return router;
};
