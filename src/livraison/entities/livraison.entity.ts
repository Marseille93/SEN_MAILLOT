import { Commandes } from 'src/commandes/entities/commandes.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from 'typeorm';

@Entity('livraisons')
export class Livraison {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Commandes, (commande) => commande.livraison)
  @JoinColumn() // Cela permet de spécifier la colonne qui sera utilisée pour le lien
  commande: Commandes;

  @Column()
  dateLivraison: Date;

  @Column()
  etat: string; // Par exemple: 'En attente', 'Livrée', 'Annulée'
}
