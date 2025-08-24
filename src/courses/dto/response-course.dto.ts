import type { Course } from '../../../prisma/__generated__';

export class ResponseCourseDTO {
  /**
   * id: This is a unique identifier for the course
   * title: This is the title of the course
   * description: This is a brief optional description of the course.
   * createdAt: This is the date when the course was created (UNIX time)
   * updatedAt: This is the date when the course was last updated (UNIX time)
   */
  id: number;
  title: string;
  description: string | null;
  createdAt: number;
  updatedAt: number;

  constructor(course: Course) {
    this.id = course.id;
    this.title = course.title;
    this.description = course.description ?? null;
    this.createdAt = Math.floor(course.createdAt.getTime() / 1000);
    this.updatedAt = Math.floor(course.updatedAt.getTime() / 1000);
  }
}
