import { Module } from '@nestjs/common';
import { CommandeProduitsController } from './commande-produits.controller';
import { CommandeProduitsService } from './commande-produits.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandeProduits } from './entities/commande-produits.entity';
import { Maillots } from 'src/maillots/entities/maillots.entity';
import { Commandes } from 'src/commandes/entities/commandes.entity';

@Module({
  controllers: [CommandeProduitsController],
  providers: [CommandeProduitsService],
  imports: [TypeOrmModule.forFeature([CommandeProduits, Commandes, Maillots])],
})
export class CommandeProduitsModule {}
