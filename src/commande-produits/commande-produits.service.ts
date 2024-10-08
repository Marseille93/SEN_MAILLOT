import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommandeProduits } from './entities/commande-produits.entity';
import { CreateCommandeProduitsDto } from './dto/create-commande-produits.dto';
import { Maillots } from 'src/maillots/entities/maillots.entity';
import { Commandes } from 'src/commandes/entities/commandes.entity';

@Injectable()
export class CommandeProduitsService {
  constructor(
    @InjectRepository(CommandeProduits)
    private readonly commandeProduitsRepository: Repository<CommandeProduits>,
    @InjectRepository(Maillots) // Injectez le repository des maillots
    private readonly maillotsRepository: Repository<Maillots>,
    @InjectRepository(Commandes) // Injectez le repository des maillots
    private readonly commandesRepository: Repository<Maillots>,
  ) {}

  // Méthode pour créer un produit dans une commande
  async create(
    createCommandeProduitsDto: CreateCommandeProduitsDto,
  ): Promise<CommandeProduits> {
    // Vérification de l'existence de la commande et du maillot
    const commandeExists = await this.commandesRepository.findOne({
      where: { id: createCommandeProduitsDto.commandeId },
    });

    const maillotExists = await this.maillotsRepository.findOne({
      where: { id: createCommandeProduitsDto.maillotId },
    });

    if (!commandeExists) {
      throw new NotFoundException('Commande not found');
    }

    if (!maillotExists) {
      throw new NotFoundException('Maillot not found');
    }

    const commandeProduit = this.commandeProduitsRepository.create({
      taille: createCommandeProduitsDto.taille,
      quantite: createCommandeProduitsDto.quantite,
      playerName: createCommandeProduitsDto.playerName,
      playerNumber: createCommandeProduitsDto.playerNumber,
      commande: { id: createCommandeProduitsDto.commandeId }, // Référence par ID
      maillot: { id: createCommandeProduitsDto.maillotId }, // Référence par ID
    });

    return await this.commandeProduitsRepository.save(commandeProduit);
  }

  // Méthode pour récupérer tous les produits de commande
  async findAll(): Promise<CommandeProduits[]> {
    return await this.commandeProduitsRepository.find({
      relations: ['maillot', 'commande'], // Ajout de la relation commande
    });
  }

  // Méthode pour récupérer un produit de commande par son ID
  async findOne(id: number): Promise<CommandeProduits> {
    const commandeProduit = await this.commandeProduitsRepository.findOne({
      where: { id },
      relations: ['maillot', 'commande'], // Récupérer également le maillot et la commande associée
    });

    if (!commandeProduit) {
      throw new NotFoundException(
        `Produit de commande avec l'ID ${id} introuvable`,
      );
    }
    return commandeProduit;
  }

  // Méthode pour supprimer un produit de commande
  async remove(id: number): Promise<void> {
    const commandeProduit = await this.findOne(id);
    await this.commandeProduitsRepository.remove(commandeProduit);
  }
}
