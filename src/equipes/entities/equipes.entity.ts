/* eslint-disable prettier/prettier */
import { Maillots } from 'src/maillots/entities/maillots.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('equipes')
export class Equipes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nom: string;

  @Column({ nullable: true })
  logoUrl: string;

  @Column({ length: 50 })
  type: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany((type) => Maillots, (maillots) => maillots.equipes)
  maillots: Maillots[];
}
