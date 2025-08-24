import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCourseDTO {
  /**
   * Title of the course
   */
  @IsString()
  @IsNotEmpty()
  title!: string;

  /**
   * Description of the course
   */
  @IsString()
  @IsOptional()
  description?: string;
}
