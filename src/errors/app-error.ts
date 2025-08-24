export class AppError extends Error {
  public readonly statusCode: number;
  public readonly details?: any;

  constructor(statusCode = 500, message: string, details?: any) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}
