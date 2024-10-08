import { Avis } from 'src/avis/entities/avis.entity';
import { Categories } from 'src/categories/entities/categories.entity';
import { CommandeProduits } from 'src/commande-produits/entities/commande-produits.entity';
import { Equipes } from 'src/equipes/entities/equipes.entity';
import { JerseySize } from 'src/jersey-sizes/entities/jersey-sizes.entity';
import { Pictures } from 'src/pictures/entities/pictures.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('maillot')
export class Maillots {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nom: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  // eslint-disable-next-line prettier/prettier, @typescript-eslint/no-unused-vars
  @ManyToOne((type) => Categories, (categories) => categories.maillots)
  categories: Categories;

  // eslint-disable-next-line prettier/prettier, @typescript-eslint/no-unused-vars
  @ManyToOne((type) => Equipes, (equipes) => equipes.maillots)
  equipes: Equipes;

  // eslint-disable-next-line prettier/prettier, @typescript-eslint/no-unused-vars
  @OneToMany((type) => Avis, (avis) => avis.maillots, {
    onDelete: 'CASCADE',
  })
  avis: Avis[];

  // eslint-disable-next-line prettier/prettier, @typescript-eslint/no-unused-vars
  @OneToMany((type) => Pictures, (pictures) => pictures.maillots, {
    onDelete: 'CASCADE',
  })
  pictures: Pictures[];

  // eslint-disable-next-line prettier/prettier, @typescript-eslint/no-unused-vars
  @ManyToOne((type) => JerseySize, (jerseySize) => jerseySize.maillot, {
    onDelete: 'CASCADE',
  })
  jerseySize: JerseySize[];

  @OneToMany(
    () => CommandeProduits,
    (CommandeProduits) => CommandeProduits.maillot,
  )
  commandeProduits: CommandeProduits[];
}
