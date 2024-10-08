import { Module } from '@nestjs/common';
import { EquipesController } from './equipes.controller';
import { EquipesService } from './equipes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipes } from './entities/equipes.entity';

@Module({
  controllers: [EquipesController],
  providers: [EquipesService],
  imports: [TypeOrmModule.forFeature([Equipes])],
})
export class EquipesModule {}
