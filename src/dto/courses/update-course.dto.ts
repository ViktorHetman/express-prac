import { IsOptional, IsString } from 'class-validator';

export class UpdateCourseDTO {
  /**
   * Title for the updated course
   */
  @IsOptional()
  @IsString()
  title?: string;

  /**
   * Description for the updated course
   */
  @IsOptional()
  @IsString()
  description?: string;
}
