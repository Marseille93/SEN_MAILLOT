import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Users } from 'src/users/entities/users.entity';
import { CommandeProduits } from 'src/commande-produits/entities/commande-produits.entity';
import { Livraison } from 'src/livraison/entities/livraison.entity';

@Entity('commandes')
export class Commandes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dateCom: Date;

  @Column()
  etat: string;

  @Column()
  price: number;

  @ManyToOne(() => Users, (user) => user.commandes, {
    onDelete: 'CASCADE',
  })
  user: Users;

  @OneToMany(
    () => CommandeProduits,
    (commandeProduits) => commandeProduits.commande,
  )
  commandeProduits: CommandeProduits;

  @OneToOne(() => Livraison, (livraison) => livraison.commande, {
    cascade: true,
  })
  livraison: Livraison; // Relation un-à-un
}
