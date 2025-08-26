import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/app-error';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: err.message,
      errors: err.details || null,
    });
  }

  // class-validator errors
  if (Array.isArray(err) && err[0]?.constraints) {
    return res.status(400).json({
      statusCode: 400,
      message: 'Validation failed, FROM MIDDLEWARE, NOT CUSTOM ERROR',
      errors: err.map((e) => ({
        field: e.property,
        constraints: e.constraints,
      })),
    });
  }

  // unexpected errors
  return res.status(500).json({
    statusCode: 500,
    message: 'Internal server error',
  });
}
