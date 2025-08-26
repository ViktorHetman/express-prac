import type { Response, NextFunction } from 'express';

import { CoursesService } from './courses.service';
import { validateDTO } from '../lib/utils/validate-dto';
import { CreateCourseDTO, UpdateCourseDTO, QueryCourseDTO, URIParamsCourseIdDTO } from './dto';

import type {
  RequestWithBody,
  RequestWithParams,
  RequestWithParamsAndBody,
  RequestWithQuery,
} from '../lib/types/requests';

export class CoursesController {
  constructor(private coursesService: CoursesService) {}

  getAll = async (req: RequestWithQuery<QueryCourseDTO>, res: Response, next: NextFunction) => {
    try {
      const query = await validateDTO(QueryCourseDTO, req.query);
      const titles = Array.isArray(query.title) ? query.title : query.title ? [query.title] : [];
      const courses = await this.coursesService.getAll(titles);
      res.status(200).json(courses);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: RequestWithParams<URIParamsCourseIdDTO>, res: Response, next: NextFunction) => {
    try {
      const params = await validateDTO(URIParamsCourseIdDTO, req.params);
      const course = await this.coursesService.getById(params.id);
      res.status(200).json(course);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: RequestWithBody<CreateCourseDTO>, res: Response, next: NextFunction) => {
    try {
      const body = await validateDTO(CreateCourseDTO, req.body);
      const course = await this.coursesService.create(body);
      res.status(201).json(course);
    } catch (error) {
      next(error);
    }
  };

  update = async (
    req: RequestWithParamsAndBody<URIParamsCourseIdDTO, UpdateCourseDTO>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const params = await validateDTO(URIParamsCourseIdDTO, req.params);
      const body = await validateDTO(UpdateCourseDTO, req.body);
      const course = await this.coursesService.update(params.id, body);
      res.status(200).json(course);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: RequestWithParams<URIParamsCourseIdDTO>, res: Response, next: NextFunction) => {
    try {
      const params = await validateDTO(URIParamsCourseIdDTO, req.params);
      await this.coursesService.delete(params.id);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  };
}
