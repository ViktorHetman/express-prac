import express, { type Response } from 'express';

import { mapDbCourseToResponse } from '../utils/mapDbCourseToResponse';

import type { RequestWithParams, RequestWithQuery, RequestWithBody, RequestWithParamsAndBody } from '../types/requests';
import type {
  QueryCourseDTO,
  CreateCourseDTO,
  UpdateCourseDTO,
  ResponseCourseDTO,
  URIParamsCourseIdDTO,
} from '../dto/courses';
import type { CourseType } from '../types/course-type';
import type { DBType } from '../db/db';

export const coursesRoutes = (db: DBType) => {
  const router = express.Router();

  router.get('/', (req: RequestWithQuery<QueryCourseDTO>, res: Response<ResponseCourseDTO[]>) => {
    let foundCourses = db.courses;

    if (req.query.title) {
      foundCourses = foundCourses.filter((c) =>
        c.title.toLowerCase().includes(req.query.title ? req.query.title.toLowerCase() : '')
      );
    }
    if (!foundCourses) {
      res.sendStatus(404);
      return;
    }
    res.json(foundCourses.map(mapDbCourseToResponse));
  });

  router.get('/:id', (req: RequestWithParams<URIParamsCourseIdDTO>, res: Response<ResponseCourseDTO | null>) => {
    const foundCourse = db.courses.find((course) => course.id === +req.params.id);

    if (!foundCourse) {
      res.sendStatus(404);
      return;
    }

    res.json(mapDbCourseToResponse(foundCourse));
  });

  router.post('/', (req: RequestWithBody<CreateCourseDTO>, res: Response<ResponseCourseDTO>) => {
    if (!req.body.title) {
      res.sendStatus(400);
      return;
    }

    const newCourse: CourseType = {
      id: +new Date(),
      title: req.body.title,
      studentsQty: 0,
    };

    db.courses.push(newCourse);
    res.status(201).json(mapDbCourseToResponse(newCourse));
  });

  router.delete('/:id', (req: RequestWithParams<URIParamsCourseIdDTO>, res: Response<null>) => {
    const courseIndex = db.courses.findIndex((course) => course.id === +req.params.id);

    if (courseIndex === -1) {
      res.sendStatus(404);
      return;
    }

    db.courses.splice(courseIndex, 1);
    res.sendStatus(204);
  });

  router.put(
    '/:id',
    (req: RequestWithParamsAndBody<URIParamsCourseIdDTO, UpdateCourseDTO>, res: Response<CourseType | null>) => {
      if (!req.params.id) {
        res.sendStatus(400);
        return;
      }

      const courseIndex = db.courses.findIndex((course) => course.id === +req.params.id);

      if (courseIndex === -1) {
        res.sendStatus(404);
        return;
      }

      if (!req.body.title) {
        res.sendStatus(400);
        return;
      }

      db.courses[courseIndex].title = req.body.title;
      res.sendStatus(204);
    }
  );

  return router;
};
