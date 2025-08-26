import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

export async function validateDTO<T extends object>(cls: new () => T, obj: unknown) {
  const dto = plainToInstance(cls, obj);
  await validateOrReject(dto);
  return dto;
}
