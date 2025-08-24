import { AppError } from './app-error';

export class ValidationError extends AppError {
  constructor(details: any) {
    super(400, 'Validation failed', details);
  }
}
