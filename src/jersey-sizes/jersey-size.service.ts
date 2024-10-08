import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JerseySize } from './entities/jersey-sizes.entity';
import { CreateJerseySizesDto } from './dto/create-JerseySizes.dto';
import { Maillots } from 'src/maillots/entities/maillots.entity';

@Injectable()
export class JerseySizeService {
  constructor(
    @InjectRepository(JerseySize)
    private jerseySizeRepository: Repository<JerseySize>,
    @InjectRepository(Maillots)
    private maillotRepository: Repository<Maillots>,
  ) {}

  async create(createJerseySizeDto: CreateJerseySizesDto): Promise<JerseySize> {
    // Charger le maillot associé à partir de l'ID
    const maillot = await this.maillotRepository.findOne({
      where: { id: createJerseySizeDto.maillotId }, // Correctement chercher par ID
    });

    if (!maillot) {
      throw new NotFoundException(
        `Maillot with ID ${createJerseySizeDto.maillotId} not found`,
      );
    }

    // Créer la nouvelle taille de maillot en associant le maillot chargé
    const newJerseySize = this.jerseySizeRepository.create({
      ...createJerseySizeDto,
      maillot: { id: createJerseySizeDto.maillotId },
    });

    return this.jerseySizeRepository.save(newJerseySize);
  }

  // Récupérer toutes les tailles de maillots
  async findAll(): Promise<JerseySize[]> {
    return this.jerseySizeRepository.find({ relations: ['maillot'] });
  }
  async getStockByMaillotId(maillotId: number): Promise<JerseySize[]> {
    return await this.jerseySizeRepository.find({
      where: { maillot: { id: maillotId } },
      relations: ['maillot'],
    });
  }
  async remove(id: string): Promise<void> {
    const result = await this.jerseySizeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`stock l'ID ${id} non trouvée`);
    }
  }
}
