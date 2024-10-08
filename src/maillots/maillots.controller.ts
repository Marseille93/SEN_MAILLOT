import { Body, Controller, Get, Param, Post, Delete } from '@nestjs/common';
import { MaillotsService } from './maillots.service';
import { Maillots } from './entities/maillots.entity';
import { CreateMaillotDto } from './dto/create-maillots.dto';

@Controller('maillots')
export class MaillotsController {
  constructor(private readonly maillotsService: MaillotsService) {}

  // Récupérer tous les maillots
  @Get()
  async findAll(): Promise<Maillots[]> {
    return this.maillotsService.findAll();
  }

  // Créer un nouveau maillot avec les données envoyées
  @Post()
  async create(
    @Body() createMaillotDto: CreateMaillotDto, // Utilisation du DTO
  ): Promise<Maillots> {
    return this.maillotsService.createMaillot(createMaillotDto);
  }

  // Récupérer des maillots par catégorie
  @Get('category/:categoryId')
  async findByCategory(
    @Param('categoryId') categoryId: number,
  ): Promise<Maillots[]> {
    return this.maillotsService.findByCategory(categoryId);
  }

  // Récupérer des maillots par équipe
  @Get('team/:teamId')
  async findByTeam(@Param('teamId') teamId: number): Promise<Maillots[]> {
    return this.maillotsService.findByTeam(teamId);
  }

  // Récupérer un maillot par ID
  @Get(':id')
  async findById(@Param('id') id: number): Promise<Maillots> {
    return this.maillotsService.findById(id);
  }

  // Supprimer un maillot par ID
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.maillotsService.remove(id);
  }
}
