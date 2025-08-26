import { PrismaClient, User, Role } from '../../prisma/__generated__';
import { RegisterUserDTO } from './dto/register-user.dto';
import { NotFoundError } from '../errors/not-found-error';

export class AuthRepository {
  constructor(private prisma: PrismaClient) {}

  async findMany(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async registerUser(email: string, hashedPassword: string, role: Role): Promise<User> {
    return this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
      },
    });
  }
}
