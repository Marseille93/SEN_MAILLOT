import { Module } from '@nestjs/common';
import { CommandesController } from './commandes.controller';
import { CommandesService } from './commandes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Commandes } from './entities/commandes.entity';
import { Users } from 'src/users/entities/users.entity';
import { Maillots } from 'src/maillots/entities/maillots.entity';

@Module({
  controllers: [CommandesController],
  providers: [CommandesService],
  imports: [TypeOrmModule.forFeature([Commandes, Users, Maillots])],
})
export class CommandesModule {}
