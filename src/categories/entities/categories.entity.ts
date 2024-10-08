import { Maillots } from 'src/maillots/entities/maillots.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
export class Categories {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  nom: string;

  // eslint-disable-next-line prettier/prettier, @typescript-eslint/no-unused-vars
  @OneToMany((type) => Maillots, (maillots) => maillots.categories)
  maillots: Maillots[];
}
