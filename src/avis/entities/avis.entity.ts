import { Maillots } from 'src/maillots/entities/maillots.entity';
import { Users } from 'src/users/entities/users.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('avis')
export class Avis {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  commentaire: string;

  @Column()
  etoile: number;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, prettier/prettier
  @ManyToOne( type => Users, (users) => users.avis)
  users: Users;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, prettier/prettier
  @ManyToOne( type => Maillots, (maillots) => maillots.avis)
  maillots: Maillots;
}
