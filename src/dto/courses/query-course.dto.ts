import { IsOptional, IsString } from 'class-validator';

export class QueryCourseDTO {
  /**
   * This title should be included for query search
   */
  @IsOptional()
  @IsString({ each: true })
  title?: string[];
}
