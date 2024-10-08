// livraison.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Livraison } from './entities/livraison.entity';
import { LivraisonDto } from './dto/create-livraison.dto';

@Injectable()
export class LivraisonService {
  constructor(
    @InjectRepository(Livraison)
    private readonly livraisonRepository: Repository<Livraison>,
  ) {}

  async createLivraison(
    livraisonDto: LivraisonDto,
    commandeId: number,
  ): Promise<Livraison> {
    const livraison = this.livraisonRepository.create({
      ...livraisonDto,
      commande: { id: commandeId } as any, // Lié à l'entité commande
    });
    return this.livraisonRepository.save(livraison);
  }

  async findAll(): Promise<Livraison[]> {
    return this.livraisonRepository.find({ relations: ['commande'] });
  }
}
