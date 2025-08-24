import { PrismaClient, type Course } from '../../prisma/__generated__';
import { CreateCourseDTO, UpdateCourseDTO } from '../dto/courses';
import { NotFoundError } from '../errors/not-found-error';

export class CoursesRepository {
  constructor(private prisma: PrismaClient) {}

  async findAll(): Promise<Course[]> {
    return this.prisma.course.findMany();
  }

  async findById(id: number): Promise<Course | null> {
    return this.prisma.course.findUnique({
      where: { id },
    });
  }

  async findByQuery(query?: string[]): Promise<Course[]> {
    if (!query || query.length === 0) {
      return this.prisma.course.findMany();
    }
    return this.prisma.course.findMany({
      where: {
        OR: query.flatMap((q) => [
          { title: { contains: q, mode: 'insensitive' } },
          { description: { contains: q, mode: 'insensitive' } },
        ]),
      },
    });
  }

  async create(data: CreateCourseDTO): Promise<Course> {
    return this.prisma.course.create({
      data: {
        title: data.title,
        description: data.description,
      },
    });
  }

  async update(id: number, data: UpdateCourseDTO): Promise<Course> {
    try {
      return await this.prisma.course.update({ where: { id }, data });
    } catch (e: any) {
      if (e.code === 'P2025') throw new NotFoundError('Course');
      throw e;
    }
  }

  async delete(id: number): Promise<Course> {
    try {
      return await this.prisma.course.delete({ where: { id } });
    } catch (e: any) {
      if (e.code === 'P2025') throw new NotFoundError('Course');
      throw e;
    }
  }
}
