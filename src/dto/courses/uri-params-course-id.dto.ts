import { IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class URIParamsCourseIdDTO {
  /**
   * ID of existing course
   */
  @Type(() => Number)
  @Min(1)
  @IsInt()
  id!: number;
}
