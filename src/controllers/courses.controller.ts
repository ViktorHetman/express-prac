import type { Response, NextFunction } from 'express';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { CoursesService } from '../services/course.service';
import { CreateCourseDTO, UpdateCourseDTO, QueryCourseDTO, URIParamsCourseIdDTO } from '../dto/courses';

import type { RequestWithBody, RequestWithParams, RequestWithParamsAndBody, RequestWithQuery } from '../types/requests';

export class CoursesController {
  constructor(private coursesService: CoursesService) {}

  private async validateDTO<T extends object>(cls: new () => T, obj: unknown) {
    const dto = plainToInstance(cls, obj);
    await validateOrReject(dto);
    return dto;
  }

  getAll = async (req: RequestWithQuery<QueryCourseDTO>, res: Response, next: NextFunction) => {
    try {
      const query = await this.validateDTO(QueryCourseDTO, req.query);
      const titles = Array.isArray(query.title) ? query.title : query.title ? [query.title] : [];
      const courses = await this.coursesService.getAll(titles);
      res.status(200).json(courses);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: RequestWithParams<URIParamsCourseIdDTO>, res: Response, next: NextFunction) => {
    try {
      const params = await this.validateDTO(URIParamsCourseIdDTO, req.params);
      const course = await this.coursesService.getById(params.id);
      res.status(200).json(course);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: RequestWithBody<CreateCourseDTO>, res: Response, next: NextFunction) => {
    try {
      const body = await this.validateDTO(CreateCourseDTO, req.body);
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
      const params = await this.validateDTO(URIParamsCourseIdDTO, req.params);
      const body = await this.validateDTO(UpdateCourseDTO, req.body);
      const course = await this.coursesService.update(params.id, body);
      res.status(200).json(course);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: RequestWithParams<URIParamsCourseIdDTO>, res: Response, next: NextFunction) => {
    try {
      const params = await this.validateDTO(URIParamsCourseIdDTO, req.params);
      await this.coursesService.delete(params.id);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  };
}
