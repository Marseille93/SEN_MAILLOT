import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Equipes } from './entities/equipes.entity';
import { CreateEquipeDto } from './dto/create-equipe.dto';

@Injectable()
export class EquipesService {
  constructor(
    @InjectRepository(Equipes)
    private readonly equipeRepository: Repository<Equipes>,
  ) {}

  async findAll(): Promise<Equipes[]> {
    return this.equipeRepository.find();
  }

  async create(createEquipeDto: CreateEquipeDto): Promise<Equipes> {
    const equipe = this.equipeRepository.create(createEquipeDto);
    return this.equipeRepository.save(equipe);
  }

  async remove(id: string): Promise<void> {
    const result = await this.equipeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Équipe avec l'ID ${id} non trouvée`);
    }
  }
}
