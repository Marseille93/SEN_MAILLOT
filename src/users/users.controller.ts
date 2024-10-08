import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './entities/users.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Récupérer tous les maillots
  @Get()
  async findAll(): Promise<Users[]> {
    return this.usersService.findAll();
  }
}
