import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CommandeProduitsService } from './commande-produits.service';
import { CreateCommandeProduitsDto } from './dto/create-commande-produits.dto';

@Controller('commande-produits')
export class CommandeProduitsController {
  constructor(
    private readonly commandeProduitsService: CommandeProduitsService,
  ) {}

  // Créer un produit de commande
  @Post()
  create(@Body() createCommandeProduitsDto: CreateCommandeProduitsDto) {
    return this.commandeProduitsService.create(createCommandeProduitsDto);
  }

  // Récupérer tous les produits de commande
  @Get()
  findAll() {
    return this.commandeProduitsService.findAll();
  }

  // Récupérer un produit de commande par son ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commandeProduitsService.findOne(+id);
  }

  // Supprimer un produit de commande
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commandeProduitsService.remove(+id);
  }
}
