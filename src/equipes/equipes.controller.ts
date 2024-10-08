import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { EquipesService } from './equipes.service';
import { Equipes } from './entities/equipes.entity';
import { CreateEquipeDto } from './dto/create-equipe.dto';

@Controller('equipes')
export class EquipesController {
  constructor(private readonly equipeService: EquipesService) {}

  @Get()
  async findAll(): Promise<Equipes[]> {
    return this.equipeService.findAll();
  }

  @Post()
  async create(@Body() createEquipeDto: CreateEquipeDto): Promise<Equipes> {
    return this.equipeService.create(createEquipeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.equipeService.remove(id);
  }
}
