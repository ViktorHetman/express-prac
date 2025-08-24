import 'reflect-metadata';
import { CoursesService } from './courses.service';
import { CoursesRepository } from './courses.repository';
import { NotFoundError } from '../errors/not-found-error';
import { CreateCourseDTO, UpdateCourseDTO, ResponseCourseDTO } from './dto';

describe('CoursesService', () => {
  let service: CoursesService;
  let repo: jest.Mocked<CoursesRepository>;

  const mockCourse = {
    id: 1,
    title: 'Nest',
    description: 'Nest basics',
    createdAt: new Date('2025-01-01T00:00:00Z'),
    updatedAt: new Date('2025-01-02T00:00:00Z'),
  };

  beforeEach(() => {
    repo = {
      findByQuery: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as any;
    service = new CoursesService(repo);
  });

  describe('getAll', () => {
    it('should return courses mapped to DTO', async () => {
      repo.findByQuery.mockResolvedValue([mockCourse]);

      const result = await service.getAll();

      expect(result).toEqual([new ResponseCourseDTO(mockCourse)]);
    });
  });

  describe('getById', () => {
    it('should return course DTO if found', async () => {
      repo.findById.mockResolvedValue(mockCourse);

      const result = await service.getById(1);

      expect(result).toEqual(new ResponseCourseDTO(mockCourse));
    });

    it('should throw NotFoundError if not found', async () => {
      repo.findById.mockResolvedValue(null);

      await expect(service.getById(999)).rejects.toThrow(NotFoundError);
    });
  });

  describe('create', () => {
    it('should create and return course DTO', async () => {
      const dto: CreateCourseDTO = { title: 'Nest', description: 'Nest basics' };
      repo.create.mockResolvedValue(mockCourse);

      const result = await service.create(dto);

      expect(result).toEqual(new ResponseCourseDTO(mockCourse));
    });
  });

  describe('update', () => {
    it('should update and return DTO', async () => {
      const dto: UpdateCourseDTO = { title: 'Updated' };
      repo.update.mockResolvedValue({ ...mockCourse, title: 'Updated' });

      const result = await service.update(1, dto);

      expect(result).toEqual(new ResponseCourseDTO({ ...mockCourse, title: 'Updated' }));
    });

    it('should throw NotFoundError if repo returns null', async () => {
      repo.update.mockResolvedValue(null as any);

      await expect(service.update(1, { title: 'fail' })).rejects.toThrow(NotFoundError);
    });
  });

  describe('delete', () => {
    it('should call repository delete', async () => {
      repo.delete.mockResolvedValue(mockCourse);

      await service.delete(1);

      expect(repo.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundError if repo returns null', async () => {
      repo.delete.mockResolvedValue(null as any);

      await expect(service.delete(1)).rejects.toThrow(NotFoundError);
    });
  });
});
