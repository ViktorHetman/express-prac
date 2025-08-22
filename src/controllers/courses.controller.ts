import { CoursesRepository } from '../repositories/courses.repository';

export class CoursesController {
  private coursesRepository: CoursesRepository;

  constructor(coursesRepository: CoursesRepository) {
    this.coursesRepository = coursesRepository;
  }
}
