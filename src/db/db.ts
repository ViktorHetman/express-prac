import type { CourseType } from '../types/course-type';

export type DBType = { courses: CourseType[] };

export const db: DBType = {
  courses: [
    { id: 1, title: 'Front-end', studentsQty: 20 },
    { id: 2, title: 'Back-end', studentsQty: 10 },
    { id: 3, title: 'DevOps', studentsQty: 5 },
    { id: 4, title: 'Automation Q/A', studentsQty: 30 },
  ],
};
