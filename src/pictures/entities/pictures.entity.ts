import { Maillots } from 'src/maillots/entities/maillots.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('pictures')
export class Pictures {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  url: string;

  // eslint-disable-next-line prettier/prettier, @typescript-eslint/no-unused-vars
  @ManyToOne((type) => Maillots, (maillots) => maillots.pictures, {
    onDelete: 'CASCADE',
  })
  maillots: Maillots;
}
