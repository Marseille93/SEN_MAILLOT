import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Maillots } from './entities/maillots.entity';
import { CreateMaillotDto } from './dto/create-maillots.dto';
import { Categories } from 'src/categories/entities/categories.entity';
import { Equipes } from 'src/equipes/entities/equipes.entity';
import { Pictures } from 'src/pictures/entities/pictures.entity';
import { JerseySize } from 'src/jersey-sizes/entities/jersey-sizes.entity';

@Injectable()
export class MaillotsService {
  constructor(
    @InjectRepository(Maillots)
    private readonly maillotsRepository: Repository<Maillots>,

    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,

    @InjectRepository(Equipes)
    private readonly equipesRepository: Repository<Equipes>,

    @InjectRepository(JerseySize)
    private readonly jerseySizeRepository: Repository<JerseySize>,

    @InjectRepository(Pictures)
    private readonly picturesRepository: Repository<Pictures>,
  ) {}

  async findAll(): Promise<Maillots[]> {
    return this.maillotsRepository.find({
      relations: ['categories', 'equipes', 'avis', 'pictures'], // Inclure les relations nécessaires
    });
  }

  // Récupérer un maillot par ID
  async findById(id: number): Promise<Maillots> {
    const maillot = await this.maillotsRepository.findOne({
      where: { id },
      relations: ['categories', 'equipes', 'avis', 'pictures'], // Assurez-vous que les relations existent dans l'entité
    });
    if (!maillot) {
      throw new NotFoundException(`Maillot with ID ${id} not found`);
    }
    return maillot;
  }
  async createMaillot(createMaillotDto: CreateMaillotDto): Promise<Maillots> {
    const category = await this.categoriesRepository.findOne({
      where: { id: createMaillotDto.categoryId },
    });
    const equipe = await this.equipesRepository.findOne({
      where: { id: createMaillotDto.equipeId },
    });

    if (!category) {
      throw new NotFoundException(
        `La catégorie avec l'ID ${createMaillotDto.categoryId} est introuvable`,
      );
    }

    if (!equipe) {
      throw new NotFoundException(
        `L'équipe avec l'ID ${createMaillotDto.equipeId} est introuvable`,
      );
    }

    const maillot = this.maillotsRepository.create({
      nom: createMaillotDto.nom,
      description: createMaillotDto.description,
      price: createMaillotDto.price,
      categories: category,
      equipes: equipe,
    });

    return this.maillotsRepository.save(maillot);
  }

  async findByCategory(categoryId: number): Promise<Maillots[]> {
    return this.maillotsRepository.find({
      where: {
        categories: {
          id: categoryId,
        },
      },
      relations: ['categories', 'equipes', 'avis', 'pictures'],
    });
  }

  async findByTeam(teamId: number): Promise<Maillots[]> {
    return this.maillotsRepository.find({
      where: {
        equipes: {
          id: teamId,
        },
      },
      relations: ['categories', 'equipes', 'avis', 'pictures'],
    });
  }

  async remove(id: string): Promise<void> {
    const result = await this.maillotsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Maillot avec l'ID ${id} non trouvé`);
    }
  }
}
