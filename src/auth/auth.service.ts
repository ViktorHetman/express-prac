import argon2 from 'argon2';

import { AuthRepository } from './auth.repository';
import { RegisterUserDTO } from './dto/register-user.dto';
import { ResponseUserDTO } from './dto/response-user.dto';

export class AuthService {
  constructor(private repository: AuthRepository) {}

  async registerUser(data: RegisterUserDTO) {
    const existing = await this.repository.findByEmail(data.email);

    if (existing) throw new Error('User already exists'); // TODO: CUSTOM ERROR

    const hashedPassword = await argon2.hash(data.password);
    const user = await this.repository.registerUser(data.email, hashedPassword, data.role ?? 'USER');
    return new ResponseUserDTO(user);
  }
}
