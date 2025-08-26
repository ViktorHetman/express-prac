import type { NextFunction, Response } from 'express';

import { AuthService } from './auth.service';
import { validateDTO } from '../lib/utils/validate-dto';
import { RequestWithBody } from '../lib/types/requests';
import { RegisterUserDTO } from './dto/register-user.dto';

export class AuthController {
  constructor(private service: AuthService) {}

  registerUser = async (req: RequestWithBody<RegisterUserDTO>, res: Response, next: NextFunction) => {
    try {
      const data = await validateDTO(RegisterUserDTO, req.body);
      const user = await this.service.registerUser(data);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  };
}
