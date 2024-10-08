import { Maillots } from 'src/maillots/entities/maillots.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class JerseySize {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  size: string; // Taille du maillot (S, M, L, etc.)

  @Column()
  stock: number; // Stock pour cette taille spécifique

  @ManyToOne(() => Maillots, (maillots) => maillots.jerseySize, {
    onDelete: 'CASCADE',
  })
  maillot: Maillots; // Relation avec le maillot
}
