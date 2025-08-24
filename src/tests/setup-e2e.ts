import { PrismaClient } from '../../prisma/__generated__';

export const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.$connect();

  await prisma.course.deleteMany();
});

afterAll(async () => {
  await prisma.course.deleteMany();

  await prisma.$disconnect();
});
