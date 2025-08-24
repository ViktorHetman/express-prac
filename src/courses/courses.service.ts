import { CoursesRepository } from './courses.repository';
import { CreateCourseDTO, ResponseCourseDTO, UpdateCourseDTO } from './dto';
import { NotFoundError } from '../errors/not-found-error';

export class CoursesService {
  constructor(private coursesRepository: CoursesRepository) {}

  async getAll(query?: string[]): Promise<ResponseCourseDTO[]> {
    const courses = await this.coursesRepository.findByQuery(query);
    return courses.map((c) => new ResponseCourseDTO(c));
  }

  async getById(id: number): Promise<ResponseCourseDTO | null> {
    const course = await this.coursesRepository.findById(id);
    if (!course) {
      throw new NotFoundError('Course');
    }
    return new ResponseCourseDTO(course);
  }

  async create(dto: CreateCourseDTO): Promise<ResponseCourseDTO> {
    const course = await this.coursesRepository.create(dto);
    return new ResponseCourseDTO(course);
  }

  async update(id: number, dto: UpdateCourseDTO): Promise<ResponseCourseDTO> {
    const course = await this.coursesRepository.update(id, dto);
    if (!course) {
      throw new NotFoundError('Course');
    }
    return new ResponseCourseDTO(course);
  }

  async delete(id: number): Promise<void> {
    const course = await this.coursesRepository.delete(id);
    if (!course) {
      throw new NotFoundError('Course');
    }
  }
}
