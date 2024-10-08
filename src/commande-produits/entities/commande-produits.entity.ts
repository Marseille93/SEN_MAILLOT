import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Maillots } from 'src/maillots/entities/maillots.entity';
import { Commandes } from 'src/commandes/entities/commandes.entity';

@Entity('commande-produits')
export class CommandeProduits {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Maillots, (maillot) => maillot.commandeProduits)
  maillot: Maillots;

  @ManyToOne(() => Commandes, (commande) => commande.commandeProduits)
  commande: Commandes;

  @Column({ nullable: true })
  taille: string;

  @Column()
  quantite: number;

  @Column({ nullable: true })
  playerName: string;

  @Column({ nullable: true })
  playerNumber: string;
}
