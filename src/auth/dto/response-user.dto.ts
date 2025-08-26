import { User, Role } from '../../../prisma/__generated__';

export class ResponseUserDTO {
  id: number;
  email: string;
  role: Role;
  createdAt: number;
  updatedAt: number;

  constructor(data: User) {
    this.id = data.id;
    this.email = data.email;
    this.role = data.role;
    this.createdAt = Math.floor(data.createdAt.getTime() / 1000);
    this.updatedAt = Math.floor(data.updatedAt.getTime() / 1000);
  }
}
