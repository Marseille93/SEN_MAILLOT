import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Maillots } from 'src/maillots/entities/maillots.entity';
import { Users } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { Commandes } from './entities/commandes.entity';

@Injectable()
export class CommandesService {
  constructor(
    @InjectRepository(Commandes)
    private readonly commandesRepository: Repository<Commandes>,

    @InjectRepository(Maillots)
    private readonly maillotsRepository: Repository<Maillots>,

    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async findAll(): Promise<Commandes[]> {
    return await this.commandesRepository.find({
      relations: ['user', 'commandeProduits', 'commandeProduits.maillot'],
    });
  }

  async findOne(id: number): Promise<Commandes> {
    return await this.commandesRepository.findOne({
      where: { id },
      relations: ['user', 'maillot'], // Récupère la commande avec les relations.
    });
  }

  async updateEtat(id: number, etat: string): Promise<Commandes> {
    const commande = await this.findOne(id);
    if (!commande) {
      throw new Error('Commande not found'); // Ajoute une vérification pour la présence de la commande.
    }
    commande.etat = etat;
    return this.commandesRepository.save(commande); // Sauvegarde les modifications de l'état.
  }

  async remove(id: number): Promise<void> {
    await this.commandesRepository.delete(id); // Supprime la commande.
  }

  async create(createCommandeDto: CreateCommandeDto): Promise<Commandes> {
    const { dateCom, etat, price, userId } = createCommandeDto;

    // Vérifie si l'utilisateur existe
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }

    // Crée la commande
    const commande = this.commandesRepository.create({
      dateCom,
      etat,
      price,
      user: { id: userId },
    });

    return await this.commandesRepository.save(commande); // Sauvegarde la commande.
  }
}
