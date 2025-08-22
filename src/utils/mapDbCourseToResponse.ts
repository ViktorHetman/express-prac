import { ResponseCourseDTO } from '../dto/courses';
import { CourseType } from '../types/course-type';

export const mapDbCourseToResponse = (course: CourseType): ResponseCourseDTO => {
  return {
    id: course.id,
    title: course.title,
  };
};
