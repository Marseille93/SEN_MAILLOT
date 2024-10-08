// livraison.controller.ts
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { LivraisonService } from './livraison.service';
import { LivraisonDto } from './dto/create-livraison.dto';
import { Livraison } from './entities/livraison.entity';

@Controller('livraisons')
export class LivraisonController {
  constructor(private readonly livraisonService: LivraisonService) {}

  @Post(':commandeId')
  async create(
    @Param('commandeId') commandeId: number,
    @Body() livraisonDto: LivraisonDto,
  ): Promise<Livraison> {
    return this.livraisonService.createLivraison(livraisonDto, commandeId);
  }

  @Get()
  async findAll(): Promise<Livraison[]> {
    return this.livraisonService.findAll();
  }
}
