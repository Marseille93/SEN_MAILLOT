import {
  Controller,
  Get,
  Param,
  Patch,
  Delete,
  Body,
  Post,
} from '@nestjs/common';
import { CommandesService } from './commandes.service';
import { CreateCommandeDto } from './dto/create-commande.dto';

@Controller('commandes')
export class CommandesController {
  constructor(private readonly commandesService: CommandesService) {}

  // Endpoint pour lister toutes les commandes
  @Get()
  async findAll() {
    return this.commandesService.findAll();
  }

  // Endpoint pour récupérer les détails d'une commande
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.commandesService.findOne(id);
  }

  // Endpoint pour mettre à jour l'état d'une commande
  @Patch(':id/etat')
  async updateEtat(@Param('id') id: number, @Body('etat') etat: string) {
    return this.commandesService.updateEtat(id, etat);
  }

  // Endpoint pour supprimer une commande
  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.commandesService.remove(id);
  }

  // Endpoint pour créer une commande
  @Post()
  async create(@Body() createCommandeDto: CreateCommandeDto) {
    return await this.commandesService.create(createCommandeDto);
  }
}
